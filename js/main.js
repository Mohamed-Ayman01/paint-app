let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");
let toolBar = document.querySelector(".tool-bar");

//! adjust canvas size

function adjustCanvasSize() {
  canvas.height = window.innerHeight - toolBar.clientHeight;
  canvas.width = window.innerWidth;
}
adjustCanvasSize();

window.addEventListener("resize", adjustCanvasSize);

//! canvas clear feature

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

let clearBtn = document.querySelector(".tools button.clear");
clearBtn.addEventListener("click", clearCanvas);

//! drawing feature

function enableDrawing(mode) {
  let isMouseDown;

  ctx.lineCap = "round";

  function draw(e) {
    if (!isMouseDown) return;

    // just to draw
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.moveTo(e.offsetX, e.offsetY);
    ctx.stroke();

    // to make drawing line smooth
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
  }

  canvas.addEventListener("mousedown", (e) => {
    isMouseDown = true;
    draw(e);
  });

  canvas.addEventListener("mouseup", () => {
    isMouseDown = false;
    ctx.beginPath();
  });

  canvas.addEventListener("mouseout", () => {
    isMouseDown = false;
  });

  canvas.addEventListener("mousemove", draw);
}
enableDrawing();

//! Set pen size and color
let colorInput = document.querySelector(`.setting input[type="color"]`);
let sizeInput = document.querySelector(`.setting input[type="number"]`);

colorInput.addEventListener("change", () => {
  ctx.strokeStyle = colorInput.value;
});

sizeInput.addEventListener("change", () => {
  ctx.lineWidth = sizeInput.value;
});

//! Download img

let saveBtn = document.querySelector(".tools a.save");

saveBtn.addEventListener("click", () => {
  // get image URI from canvas object
  let imageURI = canvas.toDataURL("image/jpg");
  saveBtn.href = imageURI;
})