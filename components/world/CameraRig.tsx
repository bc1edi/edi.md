"use client";

import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { PerspectiveCamera, Vector3 } from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

type Props = {
  /** posizione del nodo selezionato, o null per tornare all'hub */
  focus: Vector3 | null;
  /** il pannello sta a destra (desktop) o sotto (mobile): sposta il nodo nel lato libero */
  panelSide: "right" | "bottom";
  reduced: boolean;
};

// La headline ora sta in alto: si abbassa il contenuto della scena a schermo
// portando camera e target leggermente più in alto/indietro.
const HOME_POS = new Vector3(0, 1.9, 10);
const HOME_TARGET = new Vector3(0, -0.4, 0);
const HOME_DIST = HOME_POS.distanceTo(HOME_TARGET);

/**
 * Rig di camera: OrbitControls (trascina per ruotare, scroll per avvicinare,
 * niente pan) + voli automatici verso il nodo selezionato. In idle ruota da sola.
 */
export function CameraRig({ focus, panelSide, reduced }: Props) {
  const controls = useRef<OrbitControlsImpl>(null);
  const camera = useThree((s) => s.camera);
  const flight = useRef({ active: false, pos: new Vector3(), target: new Vector3() });

  // Intro: si arriva da lontano.
  useEffect(() => {
    camera.position.set(0, 3, 22);
    flight.current = { active: true, pos: HOME_POS.clone(), target: HOME_TARGET.clone() };
  }, [camera]);

  useEffect(() => {
    if (!focus) {
      // torna a casa mantenendo la direzione corrente
      const dir = camera.position.clone().sub(controls.current?.target ?? HOME_TARGET).normalize();
      flight.current = { active: true, pos: HOME_TARGET.clone().add(dir.multiplyScalar(HOME_DIST)), target: HOME_TARGET.clone() };
      return;
    }
    const dist = panelSide === "right" ? 5.2 : 6.5;
    const dir = camera.position.clone().sub(focus).normalize();
    const pos = focus.clone().add(dir.multiplyScalar(dist));
    // Spazio libero per il pannello: il nodo va nel centro della parte visibile
    // (a sinistra del pannello laterale, sopra il bottom-sheet). Le misure
    // vengono da fov e aspect, così valgono per ogni viewport.
    const cam = camera as PerspectiveCamera;
    const halfH = dist * Math.tan((cam.fov * Math.PI) / 360);
    const halfW = halfH * cam.aspect;
    const right = new Vector3().setFromMatrixColumn(camera.matrixWorld, 0).normalize();
    const up = new Vector3().setFromMatrixColumn(camera.matrixWorld, 1).normalize();
    // pannello: 46vw a destra → centro visibile a 27% della larghezza; 70dvh sotto → centro visibile a 15% dell'altezza
    const target = focus.clone().add(panelSide === "right" ? right.multiplyScalar(halfW * 0.46) : up.multiplyScalar(-halfH * 0.7));
    flight.current = { active: true, pos, target };
  }, [focus, panelSide, camera]);

  useFrame((_, dt) => {
    const c = controls.current;
    if (!c) return;
    const f = flight.current;
    if (f.active) {
      const k = reduced ? 1 : 1 - Math.exp(-dt * 2.4);
      camera.position.lerp(f.pos, k);
      c.target.lerp(f.target, k);
      if (camera.position.distanceTo(f.pos) < 0.02) f.active = false;
    }
    c.update();
  });

  return (
    <OrbitControls
      ref={controls}
      enablePan={false}
      minDistance={2.6}
      maxDistance={17}
      enableDamping
      dampingFactor={0.06}
      rotateSpeed={0.55}
      zoomSpeed={0.6}
      autoRotate={!reduced && !focus}
      autoRotateSpeed={0.3}
      onStart={() => {
        flight.current.active = false;
      }}
    />
  );
}
