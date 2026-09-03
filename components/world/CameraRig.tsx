"use client";

import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { PerspectiveCamera, Spherical, Vector3 } from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

type Props = {
  /** posizione del nodo selezionato, o null per tornare a casa */
  focus: Vector3 | null;
  /** pannello a destra (desktop) o sotto/schermo intero (mobile) */
  panelSide: "right" | "bottom";
  reduced: boolean;
};

// Desktop: hub centrato, la camera gli orbita piano attorno.
const HOME_POS = new Vector3(0, 1.9, 10);
const HOME_TARGET = new Vector3(0, -0.4, 0);
// Mobile (portrait): camera più indietro e target spostato in alto, così l'hub
// scivola sotto il centro invece di stare inchiodato lì; il movimento è una
// deriva a sinusoidi composte, non un'orbita rigida.
const HOME_POS_M = new Vector3(0.4, 2.9, 13.5);
const HOME_TARGET_M = new Vector3(0.4, 1.0, 0);
const SPH_M = new Spherical().setFromVector3(HOME_POS_M.clone().sub(HOME_TARGET_M));

const clamp01 = (x: number) => Math.min(1, Math.max(0, x));

/**
 * Rig di camera: OrbitControls (trascina per ruotare, pinch/scroll per lo zoom,
 * niente pan) + voli automatici verso il nodo selezionato. In idle: desktop
 * orbita lenta attorno all'hub; mobile deriva morbida attorno a un inquadratura
 * decentrata, che si auto-raddrizza qualche secondo dopo il tocco.
 */
export function CameraRig({ focus, panelSide, reduced }: Props) {
  const controls = useRef<OrbitControlsImpl>(null);
  const camera = useThree((s) => s.camera);
  const flight = useRef({ active: false, pos: new Vector3(), target: new Vector3() });
  const driftT = useRef(0);
  const interactAt = useRef(-10);

  const drift = panelSide === "bottom" && !reduced;
  const homePos = drift ? HOME_POS_M : HOME_POS;
  const homeTarget = drift ? HOME_TARGET_M : HOME_TARGET;
  const homeDist = homePos.distanceTo(homeTarget);

  // Intro: si arriva da lontano.
  useEffect(() => {
    camera.position.set(0, 3, 22);
    flight.current = { active: true, pos: homePos.clone(), target: homeTarget.clone() };
  }, [camera, homePos, homeTarget]);

  useEffect(() => {
    if (!focus) {
      // torna a casa mantenendo la direzione corrente
      const dir = camera.position.clone().sub(controls.current?.target ?? homeTarget).normalize();
      flight.current = {
        active: true,
        pos: homeTarget.clone().add(dir.multiplyScalar(homeDist)),
        target: homeTarget.clone(),
      };
      return;
    }
    const dist = panelSide === "right" ? 5.2 : 6.0;
    const dir = camera.position.clone().sub(focus).normalize();
    const pos = focus.clone().add(dir.multiplyScalar(dist));
    // Desktop: il pannello laterale copre ~46vw a destra → il nodo si sposta a
    // sinistra. Mobile: pannello a schermo intero, il nodo resta centrato.
    const cam = camera as PerspectiveCamera;
    const halfH = dist * Math.tan((cam.fov * Math.PI) / 360);
    const halfW = halfH * cam.aspect;
    const right = new Vector3().setFromMatrixColumn(camera.matrixWorld, 0).normalize();
    const target =
      panelSide === "right" ? focus.clone().add(right.multiplyScalar(halfW * 0.46)) : focus.clone();
    flight.current = { active: true, pos, target };
  }, [focus, panelSide, camera, homeTarget, homeDist]);

  useFrame((_, dt) => {
    const c = controls.current;
    if (!c) return;
    driftT.current += dt;
    const f = flight.current;
    if (f.active) {
      const k = reduced ? 1 : 1 - Math.exp(-dt * 2.4);
      camera.position.lerp(f.pos, k);
      c.target.lerp(f.target, k);
      if (camera.position.distanceTo(f.pos) < 0.02) f.active = false;
    } else if (drift && !focus) {
      const t = driftT.current;
      const settle = clamp01((t - interactAt.current - 0.8) / 2.5);
      const azOff = (Math.sin(t * 0.13) * 0.42 + Math.sin(t * 0.31 + 1.3) * 0.15) * settle;
      const polOff = Math.sin(t * 0.09 + 0.7) * 0.12 * settle;
      const follow = Math.min(1, dt * 1.6);
      c.setAzimuthalAngle(c.getAzimuthalAngle() + (SPH_M.theta + azOff - c.getAzimuthalAngle()) * follow);
      c.setPolarAngle(c.getPolarAngle() + (SPH_M.phi + polOff - c.getPolarAngle()) * follow);
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
      autoRotate={!reduced && !focus && !drift}
      autoRotateSpeed={0.3}
      onStart={() => {
        flight.current.active = false;
        interactAt.current = driftT.current;
      }}
      onEnd={() => {
        interactAt.current = driftT.current;
      }}
    />
  );
}
