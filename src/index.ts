import FallingSand from "./FallingSand.js";

const canvas = document.querySelector("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

const particleWidth = 4;
const fallingSandSimulator = new FallingSand(canvas, ctx, particleWidth);
fallingSandSimulator.init();
