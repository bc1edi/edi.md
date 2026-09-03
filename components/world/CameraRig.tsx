"use client";

import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { PerspectiveCamera, Vector3 } from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

type Props = {
  /** posizione del nodo selezionato, o null per tornare a casa */
  focus: Vector3 | null;
  /** layer Progetti aperto: arretra per far entrare l'anellino dei satelliti */
  wide?: boolean;
  /** pannello a destra (desktop) o schermo intero (mobile) */
  panelSide: "right" | "bottom";
  reduced: boolean;
};

// Desktop: anello largo, hub al centro, headline in alto a sinistra.
const HOME_POS = new Vector3(0, 1.9, 10);
const HOME_TARGET = new Vector3(0, -0.4, 0);
// Mobile (portrait): anello alto. Camera più indietro e target un po' sopra
// il centro dell'anello, così l'hub scende sotto il centro dello schermo e i
// 5 nodi entrano nella fascia libera tra headline e hint.
const HOME_POS_M = new Vector3(0, 3.2, 12.3);
const HOME_TARGET_M = new Vector3(0, 1.0, 0);

/**
 * Rig di camera: OrbitControls (trascina per ruotare, pinch/scroll per lo zoom,
 * niente pan) + voli automatici verso il nodo selezionato. In idle la camera è
 * ferma: la vita della scena viene dagli agenti, dall'hub e dalle gabbie —
 * uno strumento, non un acquario.
 */
export function CameraRig({ focus, wide = false, panelSide, reduced }: Props) {
  const controls = useRef<OrbitControlsImpl>(null);
  const camera = useThree((s) => s.camera);
  const flight = useRef({ active: false, pos: new Vector3(), target: new Vector3() });

  const mobile = panelSide === "bottom";
  const homePos = mobile ? HOME_POS_M : HOME_POS;
  const homeTarget = mobile ? HOME_TARGET_M : HOME_TARGET;
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
    const dist = wide ? (mobile ? 8.2 : 7.6) : mobile ? 6.0 : 5.4;
    const dir = camera.position.clone().sub(focus).normalize();
    const pos = focus.clone().add(dir.multiplyScalar(dist));
    // Desktop: la card copre ~38vw a destra → il nodo si sposta a sinistra,
    // resta visibile a fianco. Mobile: card quasi a schermo intero, nodo centrato.
    const cam = camera as PerspectiveCamera;
    const halfH = dist * Math.tan((cam.fov * Math.PI) / 360);
    const halfW = halfH * cam.aspect;
    const right = new Vector3().setFromMatrixColumn(camera.matrixWorld, 0).normalize();
    const target = mobile ? focus.clone() : focus.clone().add(right.multiplyScalar(halfW * 0.33));
    flight.current = { active: true, pos, target };
  }, [focus, wide, mobile, camera, homeTarget, homeDist]);

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
      onStart={() => {
        flight.current.active = false;
      }}
    />
  );
}
