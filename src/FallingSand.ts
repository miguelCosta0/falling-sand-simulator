import Grid from "./Grid.js";
import randomNumber from "./randomNumber.js";
import SandColorPalette, { SandColorPaletteSize } from "./SandColorPalette.js";

export default class FallingSand {
  private readonly canvas: HTMLCanvasElement;
  private readonly ctx: CanvasRenderingContext2D;
  private readonly grid: Grid;
  private readonly particleWidth: number;
  private readonly mouse: {
    row: number;
    col: number;
    isPressed: boolean;
    overCanvas: boolean;
  };

  constructor(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    particleWidth: number
  ) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.particleWidth = particleWidth;
    this.grid = new Grid(
      Math.floor(this.canvas.height / particleWidth),
      Math.floor(this.canvas.width / particleWidth)
    );
    this.mouse = {
      row: 0,
      col: 0,
      isPressed: false,
      overCanvas: false,
    };
  }

  public init() {
    this.canvas.addEventListener("mousemove", (e) => {
      this.mouse.overCanvas = true;
      this.mouse.row = Math.floor(e.offsetY / this.particleWidth);
      this.mouse.col = Math.floor(e.offsetX / this.particleWidth);
    });
    this.canvas.addEventListener("mouseleave", (e) => {
      this.mouse.overCanvas = false;
    });
    document.addEventListener("mousedown", (e) => {
      this.mouse.isPressed = e.button === 0;
    });
    document.addEventListener("mouseup", (e) => {
      this.mouse.isPressed = false;
    });

    setInterval(() => {
      if (this.mouse.overCanvas && this.mouse.isPressed) {
        this.setGroupOfParticles(5);
      }

      this.drawGrid();
      this.grid.next();
    }, 18);
  }

  private setGroupOfParticles(n: number) {
    if (n % 2 === 0) n++;
    const rowStart = this.mouse.row - Math.floor(n / 2);
    const colStart = this.mouse.col - Math.floor(n / 2);

    for (let row = rowStart; row < rowStart + n; row++) {
      for (let col = colStart; col < colStart + n; col++) {
        if (Math.random() < 0.35)
          this.grid.set(row, col, randomNumber(1, SandColorPaletteSize));
      }
    }
  }

  private drawGrid() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    let particleColor: number;

    for (let i = 0; i < this.grid.rows; i++) {
      for (let j = 0; j < this.grid.cols; j++) {
        if (!(particleColor = this.grid.get(i, j))) continue;

        this.ctx.fillStyle = SandColorPalette[particleColor];
        this.ctx.fillRect(
          j * this.particleWidth,
          i * this.particleWidth,
          this.particleWidth,
          this.particleWidth
        );
      }
    }
  }
}
