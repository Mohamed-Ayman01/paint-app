let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");
ctx.lineCap = "round";

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

function enableDrawing() {
  let isMouseDown;

  ctx.lineCap = "round";

  function draw(e) {
    if (!isMouseDown) return;

    let [x, y] = [e.offsetX, e.offsetY]
    // just to draw
    ctx.lineTo(x, y);
    ctx.moveTo(x, y);
    ctx.stroke();

    // to make drawing line smooth
    ctx.beginPath();
    ctx.moveTo(x, y);
  }

  canvas.addEventListener("mousedown", (e) => {
    isMouseDown = true;
    draw(e);
  });

  canvas.addEventListener("mousemove", draw);

  canvas.addEventListener("mouseup", () => {
    isMouseDown = false;
    ctx.beginPath();
  });

  canvas.addEventListener("mouseout", () => {
    isMouseDown = false;
    ctx.beginPath();
  });

  //! touch events for mobile drawing 

  function drawOnMobile(e) {
    [...e.changedTouches].forEach(touch => {
    let [x, y] = [touch.pageX, touch.pageY - toolBar.clientHeight];
    // just to draw
    ctx.lineTo(x, y);
    ctx.moveTo(x, y);
    ctx.stroke();

    // to make drawing line smooth
    ctx.beginPath();
    ctx.moveTo(x, y);
    })
  }

  canvas.addEventListener("touchstart", (e) => {
    e.preventDefault();
    
    drawOnMobile(e);
  });

  canvas.addEventListener("touchmove", (e) => {
    drawOnMobile(e);
  });

  canvas.addEventListener("touchend", () => {
    ctx.beginPath();
  });
  
  canvas.addEventListener("touchcancel", () => {
    ctx.beginPath();
  });
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
});
