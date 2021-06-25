export class Line {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color?: string;

  constructor({ x1, y1, x2, y2, color = 'black' }) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.color = color;
  }
}
