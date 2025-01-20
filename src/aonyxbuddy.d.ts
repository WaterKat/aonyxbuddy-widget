import { OnWidgetLoadData } from "./streamelements";

type AonyxBuddyOptions = OnWidgetLoadData;

declare global {
  interface Window {
    aonyxbuddy: AonyxBuddyOptions | undefined;
  }
}
