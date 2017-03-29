import World from './world';

window.addEventListener("load", () => {
  let canvas = document.getElementById("canvas");
  let world = new World(canvas);
});
