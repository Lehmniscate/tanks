import World from './world';

let newGame = () => {
  let canvasContainer = document.getElementById("canvas-container");
  let canvas = document.getElementById("canvas");
  canvas.width = Math.floor(canvasContainer.offsetWidth);
  canvas.height = Math.floor(canvasContainer.offsetHeight);
  let world = new World(canvas);
}

window.addEventListener("load", () => {
  newGame();
  let modal = document.getElementsByClassName('modal')[0];
  let btn = document.getElementById("controls");
  let span = document.getElementsByClassName("close")[0];

  btn.addEventListener("click",() => {
    modal.style.display = "flex";
  });

  span.onclick = function() {
    modal.style.display = "none";
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  let newBtn = document.getElementById('new-game');
  newBtn.addEventListener("click", () => {
    newGame();
    modal.style.display = "none";
  });

  let contBtn = document.getElementById('continue');
  contBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });
});


