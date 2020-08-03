const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE; // canvas에 픽셀값을 정해주지 않으면 작동이 될 수 없다. css에서 주었어도..
ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE); // canvas의 기본값을 지정해주는 작업
ctx.strokeStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;
ctx.fillStyle = INITIAL_COLOR;


let painting = false;
let fill = false;
let filling = false;

function startPainting() {
    painting = true;
}

function onMouseMove(event) {
    const X = event.offsetX; // 윈도우 화면의 전체 좌표가 아닌 캔버스안의 좌표를 나타내주는 작업
    const Y = event.offsetY;
    if(!painting) {
        ctx.beginPath();
        ctx.moveTo(X, Y);
    } else {
        ctx.lineTo(X, Y);
        ctx.stroke();
    }
}

function handleRangeChange(event) {
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleColorClick(event) {
    const color = event.target.style.backgroundColor
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function stopPainting() {
    painting = false;
}

function onMouseDown(event) {
    painting = true;
}

function handeleModeClick() {
    if(filling === true) {
        filling = false;
        mode.innerText = "FILL";
    } else {
        filling = true;
        mode.innerText = "PAINT";
    }
}

function handleCanvasClick() {
    if(filling === true) {
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}

function handleRMClick(event) {
    event.preventDefault(); // 오른쪽 마우스 클릭 방지
}

function handleSaveClick() {
    const image = canvas.toDataURL("image/png")
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS✒";
    link.click();
}

if(canvas) {
    canvas.addEventListener("mousemove", onMouseMove)
    canvas.addEventListener("mousedown", startPainting)
    canvas.addEventListener("mouseup", stopPainting)
    canvas.addEventListener("mouseleave", stopPainting)
    canvas.addEventListener("click", handleCanvasClick)
    canvas.addEventListener("contextmenu", handleRMClick)
}

Array.from(colors).forEach(color => (color.addEventListener("click", handleColorClick)));

if(range) {
    range.addEventListener("input", handleRangeChange);
}

if(mode) {
    mode.addEventListener("click", handeleModeClick);
}

if(saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick);
}

