import { SEBasicEvent, SEMessageEvent } from "./streamelements";

type AonyxBuddyEvent = {};

export function ProcessEvent(event: AonyxBuddyEvent): AonyxBuddyEvent {
  return event;
}

export function GetTextResponse(event: AonyxBuddyEvent): string {
  console.info("GTR", event);
  return "Hello, world!";
}

export function ProcessStreamElementsEvent(
  event: SEBasicEvent | SEMessageEvent
): AonyxBuddyEvent {
  return event;
}
