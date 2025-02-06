import { Howl } from "howler";

export function playAudio(url: string) {
  const sound = new Howl({
    src: [url],
    html5: true
  });
  
  sound.play();
}
