let [x,y] = [20,10];

const drawBezier = () => {
  let coordenates = inputs.map(
    (input) => document.getElementById(input.placeholder).value
  );
  //drawing
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.beginPath();
  // ctx.moveTo(0,28)
  // ctx.bezierCurveTo(0,28,28,7,70,8);
  // coordenates[0]=x;
  // coordenates[1]=canvas.width-y;
  // coordenates[2]=canvas.width-y;
  // coordenates[3]=canvas.width-y;
  console.log('x: ',x,', y: ',y);
  ctx.bezierCurveTo(...coordenates);
  console.log("coordenates: ", coordenates);
  // ctx.bezierCurveTo(109,9,313,99,425,90);
  // ctx.bezierCurveTo(516,82.5,536,55,536,55);
  ctx.stroke();
};

globalCoords = [[30,30],[70,20],[100,80]];
let prev = [0,300]

const drawLine = (coord) => {
  let coordenates = inputs.map(
    (input) => document.getElementById(input.placeholder).value
  );
  //drawing
  const ctx = canvas.getContext("2d");
  // ctx.clearRect(0,0,canvas.width,canvas.height);
  const [x,x2,_2,y,y2] = coordenates;
  console.log('x1: ',x,', y1: ',y);
  console.log("coordenates: ", coordenates);
  // for(const coord of globalCoords){
    ctx.beginPath();
    const calc = canvas.height-prev[1];
    prev[1]=calc===0?canvas.height:canvas.height-prev[1];
    ctx.moveTo(...prev);
    const y3=canvas.height-coord[1];
    console.log('prev: ',prev,', y3: ',y3);
    ctx.lineTo(coord[0],y3);
    ctx.stroke();
    prev=coord;
  // }
};

const clearCanvas = () => {
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0,0,canvas.width,canvas.height);
}

const root = document.getElementById("root");
const div = document.createElement("div");
div.setAttribute("class", "content");
const title = document.createElement("p");
title.innerText = "5-Year Forecasted Home";
div.append(title);
const canvas = document.createElement("canvas");
const width = "300";
const height = "300";
canvas.width = width;
canvas.height = height;

//create button/inputs
const inputs = [
  { placeholder: "x", value: x },
  { placeholder: "cp1x", value: canvas.width-y },
  { placeholder: "cp2x", value: 0 },
  { placeholder: "y", value: canvas.height },
  { placeholder: "cp1y", value: 0 },
  { placeholder: "cp2y", value: canvas.height },
];
inputs
  .map((item, index) => {
    const container = document.createElement('div');
    const span = document.createElement('span');
    const input = document.createElement("input");
    input.setAttribute("id", item.placeholder);
    input.setAttribute("placeholder", item.placeholder);
    input.setAttribute("value", item.value);
    input.addEventListener("input", drawLine);
    span.innerText=`${item.placeholder}: `;
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
const line = document.createElement('div');
line.setAttribute('class','line');
div.append(line)
const _timer = setInterval(()=>{
  if(!globalCoords.length)
    clearInterval(_timer);
  else{
    drawLine(globalCoords[0]);
    globalCoords.shift();
  }
//   if(x<300)
//     x++;
//   if(y<300)
//     y++;
//   const result = canvas.width+canvas.height;
//   const addition = (x+y);
//   console.log(`${addition} == ${result}`);
},500);
const elements = [div];
for (const element of elements) root.append(element);
