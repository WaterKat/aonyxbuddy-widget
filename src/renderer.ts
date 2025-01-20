import { parseGIF, decompressFrames } from "gifuct-js";

type SpriteRendererParams = {
  base: number;
  talking: number;
};

type SpriteMap = {
  base: ImageBitmap[];
  talking: ImageBitmap[];
};

export type SpriteRendererOptions = {
  parent: HTMLElement;
  spriteURLs: {
    base: URL;
    talking: URL;
  };
};

export class SpriteRenderer {
  private options: Required<SpriteRendererOptions>;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D | null = null;
  private params: SpriteRendererParams = {
    base: 0,
    talking: 0,
  };
  private sprites: SpriteMap = {
    base: [],
    talking: [],
  };
  private ready: boolean = false;

  constructor(options: SpriteRendererOptions) {
    this.options = {
      ...options,
    };
    this.canvas = document.createElement("canvas");
    this.canvas.id = "sprite-canvas";
    this.options.parent.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");
    this.loadSprites(options.spriteURLs);
  }

  private async loadSprites(spriteURLs: SpriteRendererOptions["spriteURLs"]) {
    const baseResource = spriteURLs.base.toString().endsWith("gif")
      ? this.loadGif(spriteURLs.base)
      : fetch(spriteURLs.base)
          .then((res) => res.blob())
          .then((blob) => createImageBitmap(blob));
    const talkingResource = spriteURLs.base.toString().endsWith("gif")
      ? this.loadGif(spriteURLs.talking)
      : fetch(spriteURLs.talking)
          .then((res) => res.blob())
          .then((blob) => createImageBitmap(blob));
    this.sprites.base = [await baseResource].flat();
    this.sprites.talking = [await talkingResource].flat();
    this.ready = true;
  }

  private async loadGif(url: URL): Promise<ImageBitmap[]> {
    // Load the gif
    const promisedGif = fetch(url)
      .then((res) => res.arrayBuffer())
      .then(parseGIF)
      .then((gif) => decompressFrames(gif, true));
    const frames = await promisedGif;

    // Find the dimensions of the gif
    const dimensions = frames.reduce(
      (acc, frame) => {
        acc.width = Math.max(frame.dims.width + frame.dims.left, acc.width);
        acc.height = Math.max(frame.dims.height + frame.dims.top, acc.height);
        return acc;
      },
      { width: 0, height: 0 }
    );

    // Create a canvas to draw the gif onto
    const canvas = document.createElement("canvas");
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    const ctx = canvas.getContext("2d");
    if (!ctx) return [];
    ctx.canvas.width = dimensions.width;
    ctx.canvas.height = dimensions.height;

    // Draw each frame onto the canvas
    const imgData = ctx.createImageData(dimensions.width, dimensions.height);
    const framePromises = frames.map((frame) => {
      imgData.data.set(frame.patch);
      ctx.putImageData(imgData, frame.dims.left, frame.dims.top);
      return createImageBitmap(
        ctx.getImageData(0, 0, dimensions.width, dimensions.height)
      );
    });

    const returnFrames = await Promise.all(framePromises);
    canvas.remove();

    return returnFrames;
  }

  private getFromDeltaClamped<T>(delta: number, arr: Array<T>) {
    const index = Math.floor(delta * arr.length);
    if (index < 0) return arr[0];
    if (index >= arr.length) return arr[arr.length - 1];
    return arr[index];
  }

  update(): boolean {
    if (!this.ready) return false;
    if (this.ctx == null) return false;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    const baseSprite = this.getFromDeltaClamped(
      this.params.base,
      this.sprites.base
    );
    if (!baseSprite) return false;
    this.ctx.drawImage(baseSprite, 0, 0, this.canvas.width, this.canvas.height);

    const talkingSprite = this.getFromDeltaClamped(
      this.params.talking,
      this.sprites.talking
    );
    if (!talkingSprite) return false;
    this.ctx.drawImage(
      talkingSprite,
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );

    return true;
  }

  getParamRef(): SpriteRendererParams {
    return this.params;
  }
}
