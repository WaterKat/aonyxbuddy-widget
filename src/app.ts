import { type OnWidgetLoadData } from "./streamelements.js";
import { SpriteRenderer } from "./renderer.js";
import { AudioPlayer } from "./audio.js";
import { GetStreamElementsTTSUrl } from "./streamelements.js";
import { GetTextResponse, ProcessStreamElementsEvent } from "./events.js";

function main(options: OnWidgetLoadData) {
  //! allow access to the options globally
  window.aonyxbuddy = options;
  if (window.aonyxbuddy?.overlay.isEditorMode) {
    console.log("AonyxBuddy Options", options);
  }

  const audio = new AudioPlayer({
    waitTime: options.fieldData.TTSWaitTime * 1000,
    retryTime: 100,
  });

  const welcomeMessage = GetStreamElementsTTSUrl(
    options.fieldData.TTSVoice,
    options.fieldData.introductionMessage
  );
  if (welcomeMessage) {
    audio.queue(new URL(welcomeMessage));
    audio.play();
  } else {
    if (window.aonyxbuddy?.overlay.isEditorMode) {
      console.error("No welcome message found");
    }
  }


  const b = new URL(options.fieldData.baseSprite);
  const renderer = new SpriteRenderer({
    parent: document.getElementById("app") ?? document.body,
    spriteURLs: {
      base: b,
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

  window.addEventListener("onEventReceived", (rawEvent: Event) => {
    if (
      !rawEvent ||
      !(rawEvent as any).detail ||
      !(rawEvent as any).detail.event
    ) {
      if (window.aonyxbuddy?.overlay.isEditorMode) {
        console.log("No event found", rawEvent);
      }
      return;
    }

    const event: any = (rawEvent as any).detail.event;

    if (window.aonyxbuddy?.overlay.isEditorMode) {
      console.log("Raw Event", event);
    }

    const processedEvent = ProcessStreamElementsEvent(event);
    const textResponse = GetTextResponse(processedEvent);

    const response = GetStreamElementsTTSUrl(
      options.fieldData.TTSVoice,
      textResponse
    );

    if (!response) {
      if (window.aonyxbuddy?.overlay.isEditorMode) {
        console.error("No response found");
      }
      return;
    }

    audio.queue(response);
    audio.play();
  });
}

window.addEventListener("onWidgetLoad", (raw: unknown) => {
  if (!raw || !(raw as any).detail) {
    console.error("No field data found");
    return;
  }
  const data = (raw as any).detail as OnWidgetLoadData;
  main(data);
});

console.log("AonyxBuddy Overlay Loaded");