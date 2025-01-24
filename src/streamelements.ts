//#region TTS
/**
 * A string type that is a tested valid voice id for use with stream elements
 * text to speech
 */
export type StreamElementsVoiceID =
  | "Filiz"
  | "Astrid"
  | "Tatyana"
  | "Maxim"
  | "Carmen"
  | "Ines"
  | "Cristiano"
  | "Vitoria"
  | "Ricardo"
  | "Maja"
  | "Jan"
  | "Jacek"
  | "Ewa"
  | "Ruben"
  | "Lotte"
  | "Liv"
  | "Seoyeon"
  | "Takumi"
  | "Mizuki"
  | "Giorgio"
  | "Carla"
  | "Bianca"
  | "Karl"
  | "Dora"
  | "Mathieu"
  | "Celine"
  | "Chantal"
  | "Penelope"
  | "Miguel"
  | "Mia"
  | "Enrique"
  | "Conchita"
  | "Geraint"
  | "Salli"
  | "Matthew"
  | "Kimberly"
  | "Kendra"
  | "Justin"
  | "Joey"
  | "Joanna"
  | "Ivy"
  | "Raveena"
  | "Aditi"
  | "Emma"
  | "Brian"
  | "Amy"
  | "Russell"
  | "Nicole"
  | "Vicki"
  | "Marlene"
  | "Hans"
  | "Naja"
  | "Mads"
  | "Gwyneth"
  | "Zhiyu"
  | "es-ES-Standard-A"
  | "it-IT-Standard-A"
  | "it-IT-Wavenet-A"
  | "ja-JP-Standard-A"
  | "ja-JP-Wavenet-A"
  | "ko-KR-Standard-A"
  | "ko-KR-Wavenet-A"
  | "pt-BR-Standard-A"
  | "tr-TR-Standard-A"
  | "sv-SE-Standard-A"
  | "nl-NL-Standard-A"
  | "nl-NL-Wavenet-A"
  | "en-US-Wavenet-A"
  | "en-US-Wavenet-B"
  | "en-US-Wavenet-C"
  | "en-US-Wavenet-D"
  | "en-US-Wavenet-E"
  | "en-US-Wavenet-F"
  | "en-GB-Standard-A"
  | "en-GB-Standard-B"
  | "en-GB-Standard-C"
  | "en-GB-Standard-D"
  | "en-GB-Wavenet-A"
  | "en-GB-Wavenet-B"
  | "en-GB-Wavenet-C"
  | "en-GB-Wavenet-D"
  | "en-US-Standard-B"
  | "en-US-Standard-C"
  | "en-US-Standard-D"
  | "en-US-Standard-E"
  | "de-DE-Standard-A"
  | "de-DE-Standard-B"
  | "de-DE-Wavenet-A"
  | "de-DE-Wavenet-B"
  | "de-DE-Wavenet-C"
  | "de-DE-Wavenet-D"
  | "en-AU-Standard-A"
  | "en-AU-Standard-B"
  | "en-AU-Wavenet-A"
  | "en-AU-Wavenet-B"
  | "en-AU-Wavenet-C"
  | "en-AU-Wavenet-D"
  | "en-AU-Standard-C"
  | "en-AU-Standard-D"
  | "fr-CA-Standard-A"
  | "fr-CA-Standard-B"
  | "fr-CA-Standard-C"
  | "fr-CA-Standard-D"
  | "fr-FR-Standard-C"
  | "fr-FR-Standard-D"
  | "fr-FR-Wavenet-A"
  | "fr-FR-Wavenet-B"
  | "fr-FR-Wavenet-C"
  | "fr-FR-Wavenet-D"
  | "da-DK-Wavenet-A"
  | "pl-PL-Wavenet-A"
  | "pl-PL-Wavenet-B"
  | "pl-PL-Wavenet-C"
  | "pl-PL-Wavenet-D"
  | "pt-PT-Wavenet-A"
  | "pt-PT-Wavenet-B"
  | "pt-PT-Wavenet-C"
  | "pt-PT-Wavenet-D"
  | "ru-RU-Wavenet-A"
  | "ru-RU-Wavenet-B"
  | "ru-RU-Wavenet-C"
  | "ru-RU-Wavenet-D"
  | "sk-SK-Wavenet-A"
  | "tr-TR-Wavenet-A"
  | "tr-TR-Wavenet-B"
  | "tr-TR-Wavenet-C"
  | "tr-TR-Wavenet-D"
  | "tr-TR-Wavenet-E"
  | "uk-UA-Wavenet-A"
  | "ar-XA-Wavenet-A"
  | "ar-XA-Wavenet-B"
  | "ar-XA-Wavenet-C"
  | "cs-CZ-Wavenet-A"
  | "nl-NL-Wavenet-B"
  | "nl-NL-Wavenet-C"
  | "nl-NL-Wavenet-D"
  | "nl-NL-Wavenet-E"
  | "en-IN-Wavenet-A"
  | "en-IN-Wavenet-B"
  | "en-IN-Wavenet-C"
  | "fil-PH-Wavenet-A"
  | "fi-FI-Wavenet-A"
  | "el-GR-Wavenet-A"
  | "hi-IN-Wavenet-A"
  | "hi-IN-Wavenet-B"
  | "hi-IN-Wavenet-C"
  | "hu-HU-Wavenet-A"
  | "id-ID-Wavenet-A"
  | "id-ID-Wavenet-B"
  | "id-ID-Wavenet-C"
  | "it-IT-Wavenet-B"
  | "it-IT-Wavenet-C"
  | "it-IT-Wavenet-D"
  | "ja-JP-Wavenet-B"
  | "ja-JP-Wavenet-C"
  | "ja-JP-Wavenet-D"
  | "cmn-CN-Wavenet-A"
  | "cmn-CN-Wavenet-B"
  | "cmn-CN-Wavenet-C"
  | "cmn-CN-Wavenet-D"
  | "nb-no-Wavenet-E"
  | "nb-no-Wavenet-A"
  | "nb-no-Wavenet-B"
  | "nb-no-Wavenet-C"
  | "nb-no-Wavenet-D"
  | "vi-VN-Wavenet-A"
  | "vi-VN-Wavenet-B"
  | "vi-VN-Wavenet-C"
  | "vi-VN-Wavenet-D"
  | "sr-rs-Standard-A"
  | "lv-lv-Standard-A"
  | "is-is-Standard-A"
  | "bg-bg-Standard-A"
  | "af-ZA-Standard-A"
  | "Tracy"
  | "Danny"
  | "Huihui"
  | "Yaoyao"
  | "Kangkang"
  | "HanHan"
  | "Zhiwei"
  | "Asaf"
  | "An"
  | "Stefanos"
  | "Filip"
  | "Ivan"
  | "Heidi"
  | "Herena"
  | "Kalpana"
  | "Hemant"
  | "Matej"
  | "Andika"
  | "Rizwan"
  | "Lado"
  | "Valluvar"
  | "Linda"
  | "Heather"
  | "Sean"
  | "Michael"
  | "Karsten"
  | "Guillaume"
  | "Pattara"
  | "Jakub"
  | "Szabolcs"
  | "Hoda"
  | "Naayf";

export const StreamElementsVoiceIDs: StreamElementsVoiceID[] = [
  "Filiz",
  "Astrid",
  "Tatyana",
  "Maxim",
  "Carmen",
  "Ines",
  "Cristiano",
  "Vitoria",
  "Ricardo",
  "Maja",
  "Jan",
  "Jacek",
  "Ewa",
  "Ruben",
  "Lotte",
  "Liv",
  "Seoyeon",
  "Takumi",
  "Mizuki",
  "Giorgio",
  "Carla",
  "Bianca",
  "Karl",
  "Dora",
  "Mathieu",
  "Celine",
  "Chantal",
  "Penelope",
  "Miguel",
  "Mia",
  "Enrique",
  "Conchita",
  "Geraint",
  "Salli",
  "Matthew",
  "Kimberly",
  "Kendra",
  "Justin",
  "Joey",
  "Joanna",
  "Ivy",
  "Raveena",
  "Aditi",
  "Emma",
  "Brian",
  "Amy",
  "Russell",
  "Nicole",
  "Vicki",
  "Marlene",
  "Hans",
  "Naja",
  "Mads",
  "Gwyneth",
  "Zhiyu",
  "es-ES-Standard-A",
  "it-IT-Standard-A",
  "it-IT-Wavenet-A",
  "ja-JP-Standard-A",
  "ja-JP-Wavenet-A",
  "ko-KR-Standard-A",
  "ko-KR-Wavenet-A",
  "pt-BR-Standard-A",
  "tr-TR-Standard-A",
  "sv-SE-Standard-A",
  "nl-NL-Standard-A",
  "nl-NL-Wavenet-A",
  "en-US-Wavenet-A",
  "en-US-Wavenet-B",
  "en-US-Wavenet-C",
  "en-US-Wavenet-D",
  "en-US-Wavenet-E",
  "en-US-Wavenet-F",
  "en-GB-Standard-A",
  "en-GB-Standard-B",
  "en-GB-Standard-C",
  "en-GB-Standard-D",
  "en-GB-Wavenet-A",
  "en-GB-Wavenet-B",
  "en-GB-Wavenet-C",
  "en-GB-Wavenet-D",
  "en-US-Standard-B",
  "en-US-Standard-C",
  "en-US-Standard-D",
  "en-US-Standard-E",
  "de-DE-Standard-A",
  "de-DE-Standard-B",
  "de-DE-Wavenet-A",
  "de-DE-Wavenet-B",
  "de-DE-Wavenet-C",
  "de-DE-Wavenet-D",
  "en-AU-Standard-A",
  "en-AU-Standard-B",
  "en-AU-Wavenet-A",
  "en-AU-Wavenet-B",
  "en-AU-Wavenet-C",
  "en-AU-Wavenet-D",
  "en-AU-Standard-C",
  "en-AU-Standard-D",
  "fr-CA-Standard-A",
  "fr-CA-Standard-B",
  "fr-CA-Standard-C",
  "fr-CA-Standard-D",
  "fr-FR-Standard-C",
  "fr-FR-Standard-D",
  "fr-FR-Wavenet-A",
  "fr-FR-Wavenet-B",
  "fr-FR-Wavenet-C",
  "fr-FR-Wavenet-D",
  "da-DK-Wavenet-A",
  "pl-PL-Wavenet-A",
  "pl-PL-Wavenet-B",
  "pl-PL-Wavenet-C",
  "pl-PL-Wavenet-D",
  "pt-PT-Wavenet-A",
  "pt-PT-Wavenet-B",
  "pt-PT-Wavenet-C",
  "pt-PT-Wavenet-D",
  "ru-RU-Wavenet-A",
  "ru-RU-Wavenet-B",
  "ru-RU-Wavenet-C",
  "ru-RU-Wavenet-D",
  "sk-SK-Wavenet-A",
  "tr-TR-Wavenet-A",
  "tr-TR-Wavenet-B",
  "tr-TR-Wavenet-C",
  "tr-TR-Wavenet-D",
  "tr-TR-Wavenet-E",
  "uk-UA-Wavenet-A",
  "ar-XA-Wavenet-A",
  "ar-XA-Wavenet-B",
  "ar-XA-Wavenet-C",
  "cs-CZ-Wavenet-A",
  "nl-NL-Wavenet-B",
  "nl-NL-Wavenet-C",
  "nl-NL-Wavenet-D",
  "nl-NL-Wavenet-E",
  "en-IN-Wavenet-A",
  "en-IN-Wavenet-B",
  "en-IN-Wavenet-C",
  "fil-PH-Wavenet-A",
  "fi-FI-Wavenet-A",
  "el-GR-Wavenet-A",
  "hi-IN-Wavenet-A",
  "hi-IN-Wavenet-B",
  "hi-IN-Wavenet-C",
  "hu-HU-Wavenet-A",
  "id-ID-Wavenet-A",
  "id-ID-Wavenet-B",
  "id-ID-Wavenet-C",
  "it-IT-Wavenet-B",
  "it-IT-Wavenet-C",
  "it-IT-Wavenet-D",
  "ja-JP-Wavenet-B",
  "ja-JP-Wavenet-C",
  "ja-JP-Wavenet-D",
  "cmn-CN-Wavenet-A",
  "cmn-CN-Wavenet-B",
  "cmn-CN-Wavenet-C",
  "cmn-CN-Wavenet-D",
  "nb-no-Wavenet-E",
  "nb-no-Wavenet-A",
  "nb-no-Wavenet-B",
  "nb-no-Wavenet-C",
  "nb-no-Wavenet-D",
  "vi-VN-Wavenet-A",
  "vi-VN-Wavenet-B",
  "vi-VN-Wavenet-C",
  "vi-VN-Wavenet-D",
  "sr-rs-Standard-A",
  "lv-lv-Standard-A",
  "is-is-Standard-A",
  "bg-bg-Standard-A",
  "af-ZA-Standard-A",
  "Tracy",
  "Danny",
  "Huihui",
  "Yaoyao",
  "Kangkang",
  "HanHan",
  "Zhiwei",
  "Asaf",
  "An",
  "Stefanos",
  "Filip",
  "Ivan",
  "Heidi",
  "Herena",
  "Kalpana",
  "Hemant",
  "Matej",
  "Andika",
  "Rizwan",
  "Lado",
  "Valluvar",
  "Linda",
  "Heather",
  "Sean",
  "Michael",
  "Karsten",
  "Guillaume",
  "Pattara",
  "Jakub",
  "Szabolcs",
  "Hoda",
  "Naayf",
] as const;

export function GetStreamElementsTTSUrl(
  voiceID: StreamElementsVoiceID,
  text: string
): URL | undefined {
  if (!voiceID || !text) {
    return undefined;
  }

  return new URL(
    `https://api.streamelements.com/kappa/v2/speech?voice=${voiceID}&text=${encodeURIComponent(
      text
    )}`
  );
}
//#endregion

//#region fields
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

const rawConfiguration = {
  widgetName: {
    type: "hidden",
    value: "AonyxBuddy",
  },
  nickname: {
    type: "text",
    label: "AonyxBuddy's Nickname",
    value: "AonyxBuddy",
  },
  introductionMessage: {
    type: "text",
    label: "Message that plays on intialization",
    value: "Hello World!",
  },
  TTSVoice: {
    type: "dropdown",
    label: "TTS Voice",
    value: "Brian",
    options: StreamElementsVoiceIDs.reduce((acc, cur) => {
      acc[cur] = cur;
      return acc;
    }, {} as Record<string, string>),
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

//#endregion

//#region events
export interface SEBasicEvent {
  type: string;
  name: string;
  amount: number;
  message: string;
  gifted: boolean;
  sender: string;
  bulkGifted: boolean;
  isCommunityGift: boolean;
  playedAsCommunityGift: boolean;
}

export interface SEMessageEvent {
  data: {
    time: number;
    tags: SETag;
    nick: string;
    userId: string;
    displayName: string;
    displayColor: string;
    channel: string;
    text: string;
    emotes: SEEmote[];
    msgId: string;
  };
}

export interface SEEmote {
  type: string;
  name: string;
}

export interface SETag {
  mod: string;
  subscriber: string;
  vip: string;
}
//#endregion

export type OnWidgetLoadData = {
  channel: {
    username: string;
  };
  fieldData: FieldData;
  overlay: {
    isEditorMode: boolean;
  };
};
