import World from './world';

window.addEventListener("load", () => {
  let canvasContainer = document.getElementById("canvas-container");
  let canvas = document.getElementById("canvas");
  canvas.width = Math.floor(canvasContainer.offsetWidth);
  canvas.height = Math.floor(canvasContainer.offsetHeight);
  let world = new World(canvas);
});
