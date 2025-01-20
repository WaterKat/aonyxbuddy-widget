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

type GenericFieldData<T extends Field, T_K extends keyof T> = {
  [K in T_K]: T[K] extends { value: infer P }
    ? P
    : T[K] extends FieldImage | FieldVideo | FieldSound
    ? string
    : never;
};

type AssertIsField<T extends Field> = T;
//#endregion

const rawConfiguration = {
  widgetName: {
    type: "hidden",
    value: "AonyxBuddy",
  },
  introductionMessage: {
    type: "text",
    label: "Message that plays on intialization",
    value: "Hello, this is AonyxBuddy",
  },
  TTSWaitTime: {
    type: "number",
    label: "Time between TTS messages",
    value: 0.5,
    min: 0,
    max: 10000,
    step: 0.1,
  },
  baseSprite: {
    type: "image-input",
    label: "Base Sprite",
  },
  talkingSprite: {
    type: "image-input",
    label: "Talking Sprite",
  },
} as const;

export const configuration: AssertIsField<typeof rawConfiguration> =
  rawConfiguration;

export type FieldData = GenericFieldData<
  typeof configuration,
  keyof typeof configuration
>;
