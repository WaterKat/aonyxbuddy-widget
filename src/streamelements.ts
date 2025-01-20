import { FieldData } from "./fields";

export type OnWidgetLoadData = {
  channel: {
    username: string;
  };
  fieldData: FieldData;
  overlay: {
    isEditorMode: boolean;
  }
};
