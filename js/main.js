let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");
let toolBar = document.querySelector(".tool-bar");

// adjust canvas size
canvas.height = window.innerHeight - toolBar.clientHeight;
canvas.width = window.innerWidth;

window.addEventListener("resize", () => {
  canvas.height = window.innerHeight - toolBar.clientHeight;
  canvas.width = window.innerWidth;
});