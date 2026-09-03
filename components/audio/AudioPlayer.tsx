"use client";

import { useEffect, useRef, useState } from "react";
import { tracks } from "@/lib/content";
import { ArrowRightIcon, AudioIcon, AudioOffIcon } from "@/components/icons";

/**
 * Player audio di sottofondo — playlist generata con AI.
 * Parte sempre muto (autoplay garantito); il primo click sblocca l'audio.
 */
export function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [index, setIndex] = useState(0);
  const [muted, setMuted] = useState(true);
  const [loading, setLoading] = useState(false);

  // Avvio muto: React imposta `muted` come proprietà dopo il mount, quindi lo
  // forziamo prima del play per non perdere l'autoplay.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = true;
    audio.play().catch(() => {});

    const onWaiting = () => setLoading(true);
    const onPlaying = () => setLoading(false);
    const onVolume = () => setMuted(audio.muted);
    const onEnded = () => setIndex((i) => (i + 1) % tracks.length);
    audio.addEventListener("waiting", onWaiting);
    audio.addEventListener("playing", onPlaying);
    audio.addEventListener("volumechange", onVolume);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.removeEventListener("waiting", onWaiting);
      audio.removeEventListener("playing", onPlaying);
      audio.removeEventListener("volumechange", onVolume);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  // Cambio traccia: ricarica la sorgente e riparte se l'audio è attivo.
  const firstRender = useRef(true);
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    audio.src = tracks[index].src;
    if (!audio.muted) audio.play().catch(() => {});
  }, [index]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.muted) {
      audio.muted = false;
      setMuted(false);
      audio.play().catch(() => {});
    } else {
      audio.muted = true;
      setMuted(true);
    }
  };

  // Selezione esplicita di una traccia: attiva sempre l'audio
  const select = (next: number) => {
    const audio = audioRef.current;
    if (audio && audio.muted) {
      audio.muted = false;
      setMuted(false);
    }
    setIndex(next);
  };

  return (
    <div className="audio-player" id="audio-player">
      <audio ref={audioRef} id="bg-audio" src={tracks[0].src} preload="metadata" autoPlay muted />

      <div className="audio-player__bar">
        <button
          type="button"
          className="audio-player__nav"
          aria-label="Traccia precedente"
          onClick={() => select((index - 1 + tracks.length) % tracks.length)}
        >
          <ArrowRightIcon className="icon audio-player__nav-icon" />
        </button>

        <p className={loading ? "audio-player__now is-loading" : "audio-player__now"} aria-live="polite">
          {tracks[index].title}
        </p>

        <button
          type="button"
          className={muted ? "audio-toggle is-muted" : "audio-toggle is-playing"}
          aria-label={muted ? "Attiva audio" : "Disattiva audio"}
          aria-pressed={!muted}
          onClick={toggle}
        >
          <AudioOffIcon className="audio-toggle__icon audio-toggle__icon--muted" />
          <AudioIcon className="audio-toggle__icon audio-toggle__icon--playing" />
        </button>

        <button
          type="button"
          className="audio-player__nav"
          aria-label="Traccia successiva"
          onClick={() => select((index + 1) % tracks.length)}
        >
          <ArrowRightIcon />
        </button>
      </div>
    </div>
  );
}
