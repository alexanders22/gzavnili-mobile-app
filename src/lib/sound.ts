import { createAudioPlayer, type AudioPlayer } from "expo-audio";
import { useSettings } from "./settings";

const SOURCES = { send: require("../../assets/send.wav"), receive: require("../../assets/receive.wav") } as const;
const players: Partial<Record<keyof typeof SOURCES, AudioPlayer>> = {};

/** Short chat sounds; respects the "sounds" setting. */
export function playSound(name: keyof typeof SOURCES) {
  if (!useSettings.getState().sounds) return;
  try {
    const p = (players[name] ??= createAudioPlayer(SOURCES[name]));
    p.volume = 0.6;
    p.seekTo(0);
    p.play();
  } catch {}
}
