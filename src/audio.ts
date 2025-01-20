type AudioPlayerOptions = {
  waitTime?: number;
  retryTime?: number;
};

export class AudioPlayer {
  private options: Required<AudioPlayerOptions>;

  private ctx: AudioContext;
  private analyser: AnalyserNode;

  private nodes: AudioNode[] = [];

  private maxAmplitude: number = 0;

  constructor(options?: AudioPlayerOptions) {
    this.options = {
      waitTime: options?.waitTime ?? 500,
      retryTime: options?.retryTime ?? 1000,
    };

    this.ctx = new AudioContext();
    this.analyser = this.ctx.createAnalyser();
    this.analyser.connect(this.ctx.destination);
    this.WaitForAudioContext();
  }

  private async WaitForAudioContext() {
    if (this.ctx.state === "running") {
      if (window.aonyxbuddy?.overlay.isEditorMode)
        console.info("Audio context running");
      return;
    }

    if (this.ctx.state === "closed") {
      if (window.aonyxbuddy?.overlay.isEditorMode)
        console.error("Audio context closed");
      throw new Error("Audio context closed");
    }

    //this.ctx.state === "suspended"
    if (window.aonyxbuddy?.overlay.isEditorMode)
      console.info("Audio context suspended");

    return new Promise<void>((resolve) => {
      let listener: ReturnType<typeof setInterval>;
      listener = setInterval(() => {
        this.ctx.resume();
        if (this.ctx.state === "running") {
          clearInterval(listener);
          resolve();
        }
      }, this.options.retryTime);
    });
  }

  queue(url: URL) {
    const node = new AudioNode(url, this.ctx, this.analyser);
    this.nodes.push(node);
  }

  play(single: boolean = false) {
    const playPromise = this.WaitForAudioContext().then(() =>
      this.nodes[0]?.play()
    );

    playPromise
      ?.then(() => {
        this.nodes.shift();
        if (single) return;
        setTimeout(() => this.play(), this.options.waitTime);
      })
      .catch(() => {
        setTimeout(() => this.play(), this.options.retryTime);
        console.error("Failed to play audio");
      });

    return playPromise ?? Promise.reject("No audio node");
  }

  stop() {
    this.nodes[0]?.stop();
  }

  amplitude() {
    const amp = this.nodes[0]?.amplitude() ?? 0;
    this.maxAmplitude = Math.max(this.maxAmplitude, amp);
    if (this.maxAmplitude == 0) return 0;
    return amp / this.maxAmplitude;
  }
}

class AudioNode {
  private url: URL;

  private ctx: AudioContext;
  private analyzer: AnalyserNode;

  private buffer: AudioBuffer | null = null;
  private node: AudioBufferSourceNode | null = null;

  private ready: boolean = false;

  constructor(url: URL, ctx?: AudioContext, analyzer?: AnalyserNode) {
    this.url = url;

    this.ctx = ctx ?? new AudioContext();
    if (analyzer) {
      this.analyzer = analyzer;
    } else {
      this.analyzer = this.ctx.createAnalyser();
      this.analyzer.connect(this.ctx.destination);
    }

    fetch(this.url)
      .then((res) => res.arrayBuffer())
      .then((buffer) => this.ctx.decodeAudioData(buffer))
      .then((buffer) => {
        this.buffer = buffer;
        this.node = this.ctx.createBufferSource();
        this.node.buffer = this.buffer;
        this.node.connect(this.analyzer);
        this.ready = true;
      });
  }

  async play() {
    if (!this.ready) {
      return Promise.reject("Audio not ready");
    }

    return new Promise<void>((resolve, reject) => {
      if (!this.node) {
        reject("No audio node");
        return;
      }
      this.node.start();
      this.node.addEventListener("ended", () => {
        this.node?.disconnect();
        resolve();
      });
    });
  }

  stop() {
    this.node?.stop();
    this.node?.disconnect();
  }

  amplitude() {
    const data = new Uint8Array(this.analyzer.frequencyBinCount);
    this.analyzer.getByteFrequencyData(data);
    return data.reduce((acc, val) => acc + val, 0) / data.length;
  }
}

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

export function GetSETTSURL(voiceID: StreamElementsVoiceID, text: string) {
  return `https://api.streamelements.com/kappa/v2/speech?voice=${voiceID}&text=${encodeURIComponent(
    text.trim()
  )}`;
}
