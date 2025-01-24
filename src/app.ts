import { type OnWidgetLoadData } from "./streamelements.js";
import { SpriteRenderer } from "./renderer.js";
import { AudioPlayer } from "./audio.js";
import { GetStreamElementsTTSUrl } from "./streamelements.js";
import { GetTextResponse, ProcessStreamElementsEvent } from "./events.js";

function main(options: OnWidgetLoadData) {
  //! allow access to the options globally
  window.aonyxbuddy = options;

  const audio = new AudioPlayer({
    waitTime: options.fieldData.TTSWaitTime * 1000,
    retryTime: 100,
  });

  audio.queue(new URL(GetSETTSURL("Brian", "Hello world!")));
  audio.queue(new URL(GetSETTSURL("Brian", "Hello world! One")));
  audio.queue(new URL(GetSETTSURL("Brian", "Hello world! Two")));
  audio.queue(new URL(GetSETTSURL("Brian", "Hello world! Three")));
  audio.play();

  const renderer = new SpriteRenderer({
    parent: document.getElementById("app") ?? document.body,
    spriteURLs: {
      base: new URL(options.fieldData.baseSprite),
      talking: new URL(options.fieldData.talkingSprite),
    },
  });

  const params = renderer.getParamRef();
  setInterval(() => {
    renderer.update();
    params.base += 1 / 24;
    params.base %= 1;
    params.talking = audio.amplitude();
  }, 1000 / 24);
}

window.addEventListener("onEventReceived", (rawEvent) => {
  console.info("onEventReceived", rawEvent);
});

window.addEventListener("onWidgetLoad", (raw: unknown) => {
  if (!raw || !(raw as any).detail) {
    console.error("No field data found");
    return;
  }
  const data = (raw as any).detail as OnWidgetLoadData;
  main(data);
});
