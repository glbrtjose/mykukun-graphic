let [x, y] = [20, 10];

let aux = true;
const speed = 7;

const drawLine = (coord) => {
  aux = false;
  const ctx = canvas.getContext("2d");
  ctx.beginPath();
  const calc = canvas.height - prev[1];
  prev[1] = calc === 0 ? canvas.height : canvas.height - prev[1];
  ctx.moveTo(prev[0] + skipx, prev[1]);
  const y3 = canvas.height - coord[1];
  let [a, b] = [prev[0], prev[1]];
  drawBottom(a + skipx);
  let [calca, calcb] = [Math.abs(prev[0] - coord[0]), Math.abs(b - y3)];
  const _timer2 = setInterval(() => {
    if (a === prev[0] && b === y3) {
      dotx = a;
      doty= b;
      aux = true;
      if(!globalCoords.length){
        drawXY(a,b);
      }
      clearInterval(_timer2);
    }
    ctx.lineTo(a + skipx, b - skipy);
    if (b !== y3) b < y3 ? b++ : b--;
    if (a < prev[0]) a++;
    if (calca > 0) calca--;
    if (calcb > 0) calcb--;
    ctx.strokeStyle = "#854AF2";
    ctx.stroke();
  }, speed);
  prev = coord;
};

const drawDots = () => {
  const ctx = canvas.getContext("2d");
  ctx.beginPath();
  let prev = 0;
  const distance = 30;
  const startAt = 3;
  const skip = 7;
  [...new Array(10)].forEach((_, i) => {
    if (i < startAt || i > skip) return;
    [...new Array(canvas.width)].forEach((_$, j) => {
      const [x1, x2] = [3 * j, 3 * (j + 1)];
      if (x1 === prev) return;
      prev = x2;
      ctx.moveTo(x1, (i + 1) * distance);
      ctx.lineTo(x2, (i + 1) * distance);
      ctx.strokeStyle = "#b7bece";
      ctx.stroke();
    });
  });
};

const drawBottom = (x = 30) => {
  const ctx = canvas.getContext("2d");
  ctx.beginPath();
  const y = canvas.height - 40;
  ctx.moveTo(0, y);
  ctx.lineTo(canvas.width, y);
  ctx.strokeStyle = "#b7bece";
  ctx.stroke();

  const y3 = canvas.height-32;
  const y4 = canvas.height-49;
  
  ctx.beginPath();
  // if(globalCoords.length){
    ctx.moveTo(x, y3);
    ctx.lineTo(x, y4);
  // }
  console.log('y3: ',y3,', y4: ',y4);
  ctx.strokeStyle = "#b7bece";
  ctx.stroke();
  ctx.font = '12px serif';
  ctx.fillText(dates[dateCount], x-15, y4+35);
  dateCount++;
};

const dates = ['NOW','2023','2024','2025','2026','2027'];
let dateCount = 0;

const drawXY = (x, y) => {
  const ctx = canvas.getContext("2d");
  for (let i = 5; i >= 0; i--) {
    ctx.strokeStyle = i > 2 ? "#854AF2" : "#fff";
    ctx.beginPath();
    ctx.arc(x + skipx, y - skipy, i, 0, 2 * Math.PI);
    ctx.stroke();
  }
  console.log(dateCount);
};

const clearCanvas = () => {
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};

const root = document.getElementById("root");
const div = document.createElement("div");
div.setAttribute("class", "content");
const textContent = document.createElement("div");
textContent.setAttribute("class", "text-content");
const title = document.createElement("p");
title.setAttribute("class", "title");
title.innerText = "5-Year Forecasted Home";
const subtitle = document.createElement("div");
subtitle.setAttribute("class", "subtitle-content");
const left = document.createElement("span");
left.innerText = "25.8%";
left.setAttribute("class", "left");
const right = document.createElement("span");
right.innerText = "5 Year growth";
right.setAttribute("class", "right");
subtitle.append(left);
subtitle.append(right);
textContent.append(title);
textContent.append(subtitle);
div.append(textContent);
const canvas = document.createElement("canvas");
const width = "450";
const height = "310";
canvas.width = width;
canvas.height = height;


div.append(canvas);
const line = document.createElement("div");
line.setAttribute("class", "background");
div.append(line);
const _timer = setInterval(() => {
  if (!globalCoords.length) {
    clearInterval(_timer);
  } else {
    if (aux) {
      drawLine(globalCoords[0]);
      drawXY(dotx, doty);
      globalCoords.shift();
    }
  }
}, speed);
const elements = [div];
for (const element of elements) root.append(element);
drawDots();
const [skipx, skipy] = [50, 70];
let prev = [0, canvas.height];
let [dotx, doty] = [0, prev[1]];
console.log('globalCoords: ',globalCoords);