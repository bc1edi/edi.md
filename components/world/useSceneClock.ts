"use client";

import { createContext, useContext } from "react";

/** Tempo di scena in secondi dal mount, condiviso via context (intro, impulsi). */
export const SceneClock = createContext<{ current: number }>({ current: 0 });
export const useSceneClock = () => useContext(SceneClock);
