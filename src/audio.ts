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
