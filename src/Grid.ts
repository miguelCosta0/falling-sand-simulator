import type { Particle } from "./types/Particle";

export default class Grid {
  private grid: (Particle | null)[][];
  readonly rows: number;
  readonly cols: number;

  constructor(rows: number, cols: number) {
    this.rows = rows;
    this.cols = cols;
    this.grid = Grid.newGrid(this.rows, this.cols);
  }

  public getParticle(row: number, col: number): Particle | null | undefined {
    if (row < 0 || row >= this.rows || col < 0 || col >= this.cols)
      return undefined;
    return this.grid[row][col];
  }

  public setParticle(
    row: number,
    col: number,
    particle: Particle | null
  ): void {
    if (row < 0 || row >= this.rows || col < 0 || col >= this.cols) return;

    if (particle === null) {
      this.grid[row][col] = particle;
    } else {
      this.grid[row][col] = { ...particle };
    }
  }

  nextGrid(): (Particle | null)[][] {
    const nextGrid = Grid.newGrid(this.rows, this.cols);
    let state: Particle | null;
    let direction: -1 | 1 = -1;

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        if ((state = this.grid[i][j]) === null) continue;

        state.velocity += 1 / 6;
        direction = Math.random() < 0.5 ? -1 : 1;

        if (this.getParticle(i + 1, j) === null) {
          let k: number;

          for (k = 1; k <= Math.floor(state.velocity); k++) {
            if (this.getParticle(i + k, j) === null) continue;
            break;
          }

          nextGrid[i + --k][j] = state;
        } else if (this.getParticle(i + 1, j + direction) === null) {
          nextGrid[i + 1][j + direction] = state;
        } else if (this.getParticle(i + 1, j - direction) === null) {
          nextGrid[i + 1][j - direction] = state;
        } else {
          nextGrid[i][j] = state;
        }
      }
    }

    this.grid = nextGrid;
    return nextGrid;
  }

  private static newGrid(rows: number, cols: number): (Particle | null)[][] {
    const newGrid: (Particle | null)[][] = [];
    for (let i = 0; i < rows; i++) {
      newGrid.push([]);
      for (let j = 0; j < cols; j++) {
        newGrid[i].push(null);
      }
    }
    return newGrid;
  }
}
