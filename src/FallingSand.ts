import Grid from './Grid';
import type { Particle } from './types/Particle';
import pickSandColorPalette from './utils/sandColorPalette';

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

  constructor(canvas: HTMLCanvasElement, particleWidth: number) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
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
    this.setupMouseEvents();
    this.setupResetEvent();
    // requestAnimationFrame(this.nextFrame.bind(this));

    setInterval(() => {
      this.nextFrame();
    }, 17);
  }

  private nextFrame() {
    if (this.mouse.overCanvas && this.mouse.isPressed) {
      this.setGroupOfParticles(5);
    }

    this.drawGrid();
    this.grid.nextGrid();

    // requestAnimationFrame(this.nextFrame.bind(this));
  }

  private setupResetEvent() {
    const resetBtn = document.querySelector('.reset-btn') as HTMLButtonElement;

    resetBtn.addEventListener('click', (e) => {
      for (let i = 0; i < this.grid.rows; i++) {
        for (let j = 0; j < this.grid.cols; j++) {
          this.grid.setParticle(i, j, null);
        }
      }
    });
  }

  private setupMouseEvents() {
    this.canvas.addEventListener('mousemove', (e) => {
      this.mouse.overCanvas = true;
      this.mouse.row = Math.floor(e.offsetY / this.particleWidth);
      this.mouse.col = Math.floor(e.offsetX / this.particleWidth);
    });
    this.canvas.addEventListener('mouseleave', (e) => {
      this.mouse.overCanvas = false;
    });
    document.addEventListener('mousedown', (e) => {
      this.mouse.isPressed = e.button === 0;
    });
    document.addEventListener('mouseup', (e) => {
      this.mouse.isPressed = false;
    });
  }

  private setGroupOfParticles(n: number) {
    if (n % 2 === 0) n++;
    const rowStart = this.mouse.row - Math.floor(n / 2);
    const colStart = this.mouse.col - Math.floor(n / 2);

    for (let row = rowStart; row < rowStart + n; row++) {
      for (let col = colStart; col < colStart + n; col++) {
        if (Math.random() > 0.35) continue;

        const newParticle: Particle = {
          color: pickSandColorPalette(),
          velocity: 1,
        };
        this.grid.setParticle(row, col, newParticle);
      }
    }
  }

  private drawGrid() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    let particle = this.grid.getParticle(0, 0);

    for (let i = 0; i < this.grid.rows; i++) {
      for (let j = 0; j < this.grid.cols; j++) {
        particle = this.grid.getParticle(i, j);

        if (!particle) continue;

        this.ctx.fillStyle = particle.color;
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
