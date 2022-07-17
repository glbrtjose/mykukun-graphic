let [x, y] = [20, 10];

let aux = true;
const speed = 10;
globalCoords = [
  [30, 30],
  [60, 30],
  [90, 60],
  [120, 60],
  [150, 90],
];

const drawLine = (coord) => {
  aux = false;
  let coordenates = inputs.map(
    (input) => document.getElementById(input.placeholder).value
  );
  //drawing
  const ctx = canvas.getContext("2d");
  ctx.beginPath();
  const calc = canvas.height - prev[1];
  prev[1] = calc === 0 ? canvas.height : canvas.height - prev[1];
  ctx.moveTo(prev[0]+skipx,prev[1]);
  const y3 = canvas.height - coord[1];
  // console.log('prev: ',prev,', y3: ',y3);
  let [a, b] = [prev[0], prev[1]];
  let [calca, calcb] = [Math.abs(prev[0] - coord[0]), Math.abs(b - y3)];
  const _timer2 = setInterval(() => {
    // console.log(`${a}-${prev[0]}, ${calca} | ${b}-${y3}, ${calcb}`);
    // console.log(`finish: ${a}===${prev[0]}&&${b}===${y3} | ${calca}, ${calcb}`);
    if (a === prev[0] && b === y3) {
      clearInterval(_timer2);
      [dotx,doty]=[a,b];
      aux = true;
    }
    ctx.lineTo(a+skipx, b);
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
  console.log('canvas.width: ',canvas.width);
  [...new Array(10)].forEach((_, i) => {
    if (i < startAt) return;
    [...new Array(canvas.width)].forEach((_$, j) => {
      const [x1, x2] = [3 * j, 3 * (j + 1)];
      if (x1 === prev) return;
      console.log(`x1: ${x1}, x2: ${x2}`);
      prev = x2;
      ctx.moveTo(x1, (i + 1) * distance);
      ctx.lineTo(x2, (i + 1) * distance);
      ctx.strokeStyle = "#b7bece";
      ctx.stroke();
    });
  });
};

const drawXY = (x,y) => {
  const ctx = canvas.getContext("2d");
  for(let i=5;i>=0;i--){
    ctx.strokeStyle = i>2?"#854AF2":"#fff";
    ctx.beginPath();
    ctx.arc(x, y, i, 0, 2 * Math.PI);
    ctx.stroke();
  }
}

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
const height = "280";
canvas.width = width;
canvas.height = height;

//create button/inputs
const inputs = [
  { placeholder: "x", value: x },
  { placeholder: "cp1x", value: canvas.width - y },
  { placeholder: "cp2x", value: 0 },
  { placeholder: "y", value: canvas.height },
  { placeholder: "cp1y", value: 0 },
  { placeholder: "cp2y", value: canvas.height },
];
inputs
  .map((item, index) => {
    const container = document.createElement("div");
    const span = document.createElement("span");
    const input = document.createElement("input");
    input.setAttribute("id", item.placeholder);
    input.setAttribute("placeholder", item.placeholder);
    input.setAttribute("value", item.value);
    input.addEventListener("input", drawLine);
    span.innerText = `${item.placeholder}: `;
    container.append(span);
    container.append(input);
    return container;
  })
  .forEach((input) => root.append(input));
const button = document.createElement("button");
button.innerText = "submit";
button.addEventListener("click", drawLine);
const clear = document.createElement("button");
clear.innerText = "clear";
clear.addEventListener("click", clearCanvas);
root.append(button);
root.append(clear);

div.append(canvas);
const line = document.createElement("div");
line.setAttribute("class", "background");
div.append(line);
const _timer = setInterval(() => {
  if (!globalCoords.length){
    clearInterval(_timer);
  }
  else {
    // while(globalCoords.length){
    // const flag =
    if (aux) {
      drawLine(globalCoords[0]);
      drawXY(dotx,doty);
      console.log(`runing! dotx: ${dotx}, doty: ${doty}`);
      // if(flag)
      // globalCoords.shift();
      // else
      //   continue;
      // }
      globalCoords.shift();
    }
  }
  //   if(x<300)
  //     x++;
  //   if(y<300)
  //     y++;
  //   const result = canvas.width+canvas.height;
  //   const addition = (x+y);
  //   console.log(`${addition} == ${result}`);
}, speed);
const elements = [div];
for (const element of elements) root.append(element);
drawDots();
const [skipx,skipy] = [0,canvas.height-10];
let prev = [0,canvas.height];
let [dotx,doty] = [0,prev[1]];
