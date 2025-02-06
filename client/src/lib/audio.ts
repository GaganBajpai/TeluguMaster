import { Howl } from "howler";

const audioCache = new Map<string, Howl>();

export function playAudio(url: string) {
  let sound = audioCache.get(url);

  if (!sound) {
    sound = new Howl({
      src: [url],
      html5: true
    });
    audioCache.set(url, sound);
  }

  sound.play();
}

// Stop any currently playing audio
export function stopAllAudio() {
  audioCache.forEach(sound => sound.stop());
}