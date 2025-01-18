//#region types
type FieldText = {
  type: "text";
  label: string;
  value: string;
};

type FieldCheckbox = {
  type: "checkbox";
  label: string;
};

type FieldColorPicker = {
  type: "colorpicker";
  label: string;
  value: `#${string}`;
};

type FieldNumber = {
  type: "number";
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
};

type FieldSlider = {
  type: "slider";
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
};

type FieldDropdown = {
  type: "dropdown";
  label: string;
  value: string;
  options: Record<string, string>;
};

type FieldImage = {
  type: "image-input";
  label: string;
};

type FieldVideo = {
  type: "video-input";
  label: string;
};

type FieldSound = {
  type: "sound-input";
  label: string;
};

type FieldFont = {
  type: "googleFont";
  label: string;
  value: string;
};

type FieldButton = {
  type: "button";
  label: string;
  value: string;
};

type FieldWidgetName = {
  type: "hidden";
  value: string;
};

type FieldWidgetDuration = {
  type: "hidden";
  value: number;
};

export type Field = {
  widgetName?: FieldWidgetName;
  widgetDuration?: FieldWidgetDuration;
} & {
  [key: string]:
    | FieldText
    | FieldCheckbox
    | FieldColorPicker
    | FieldNumber
    | FieldSlider
    | FieldDropdown
    | FieldImage
    | FieldVideo
    | FieldSound
    | FieldFont
    | FieldButton
    | FieldWidgetName
    | FieldWidgetDuration;
};
//#endregion

export const configuration: Field = {
  widgetName: {
    type: "hidden",
    value: "AonyxBuddy",
  },
};
