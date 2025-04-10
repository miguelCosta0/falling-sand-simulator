import FallingSand from "./FallingSand.js";

const canvas = document.querySelector("canvas") as HTMLCanvasElement;

const particleWidth = 4;
const fallingSandSimulator = new FallingSand(canvas, particleWidth);
fallingSandSimulator.init();
