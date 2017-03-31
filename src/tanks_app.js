import World from './world';

window.addEventListener("load", () => {
  let canvas = document.getElementById("canvas");
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  let world = new World(canvas);
});
