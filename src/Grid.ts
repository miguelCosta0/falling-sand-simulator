export default class Grid {
  private grid: number[][];
  readonly rows: number;
  readonly cols: number;

  constructor(rows: number, cols: number) {
    this.rows = rows;
    this.cols = cols;
    this.grid = Grid.newGrid(this.rows, this.cols);
  }

  get(row: number, col: number): number {
    if (row < 0 || row >= this.rows) return -1;
    if (col < 0 || col >= this.cols) return -1;
    return this.grid[row][col];
  }

  set(row: number, col: number, num: number): void {
    if (row < 0 || row >= this.rows) return;
    if (col < 0 || col >= this.cols) return;
    this.grid[row][col] = num;
  }

  next(): number[][] {
    const nextGrid = Grid.newGrid(this.rows, this.cols);
    let state: number;
    const below = {
      middle: -1,
      sideA: -1,
      sideB: -1,
    };
    let hasBelow: boolean;
    let direction: -1 | 1 = -1;

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        if ((state = this.grid[i][j]) === 0) continue;

        direction = Math.random() < 0.5 ? -1 : 1;
        hasBelow = i < this.rows - 1;

        below.middle = hasBelow ? this.grid[i + 1][j] : -1;
        below.sideA = hasBelow ? this.grid[i + 1][j + direction] ?? -1 : -1;
        below.sideB = hasBelow ? this.grid[i + 1][j - direction] ?? -1 : -1;

        if (below.middle === 0) {
          nextGrid[i + 1][j] = state;
        } else if (below.sideA === 0) {
          nextGrid[i + 1][j + direction] = state;
        } else if (below.sideB === 0) {
          nextGrid[i + 1][j - direction] = state;
        } else {
          nextGrid[i][j] = state;
        }
      }
    }

    this.grid = nextGrid;
    return nextGrid;
  }

  private static newGrid(rows: number, cols: number): number[][] {
    const newGrid: number[][] = [];
    for (let i = 0; i < rows; i++) {
      newGrid.push(new Array(cols).fill(0));
    }
    return newGrid;
  }
}
