import FallingSand from './FallingSand';

const canvas = document.querySelector('canvas') as HTMLCanvasElement;

const particleWidth = 4;
const fallingSandSimulator = new FallingSand(canvas, particleWidth);
fallingSandSimulator.init();
