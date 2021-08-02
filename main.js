let x = [], y = [], px = [], py = [], lineColor = [];
let vx = [], vy = [];

let particleCount = 100

let canvas;

let currentBrush = "Default";

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);

  canvas.mouseClicked(refreshColors);

  for (let i = 0; i < particleCount; i++) {
    x.push(0);
    y.push(0);
    vx.push(0);
    vy.push(0);
    px.push(0);
    py.push(0);
    lineColor.push(random(270, 360));
  }
  background(0);
  colorMode(HSB);
  blendMode(ADD);
}

function draw() {

  fill(0, 0, 255, 255);
  strokeWeight(0);
  textSize(30);
  text("press space to clear", 0, 30);
  text("press Q to switch brush", 0, 60);
  textSize(20)
  text(`w:${width} h:${height}`, 0, 90);
  strokeWeight(1);
  for (let i = 0; i < particleCount; i++) {

    //randomed brush
    if (currentBrush == "Default") {
      vx[i] += (mouseX - x[i]) / (10 + i / 15) + random(-3, 3);
      vy[i] += (mouseY - y[i]) / (10 + i / 15) + random(-3, 3);
    }
    else if (currentBrush == "Banded") {
      vx[i] += (mouseX - x[i]) / (10 + i / 15);
      vy[i] += (mouseY - y[i]) / (10 + i / 15);
    }


    px[i] = x[i];
    py[i] = y[i];
    x[i] += vx[i];
    y[i] += vy[i];
    stroke(lineColor[i], 70, 5)
    if (mouseIsPressed) {
      line(px[i], py[i], x[i], y[i]);
      line(width - px[i], py[i], width - x[i], y[i]);
    }
    vx[i] *= 0.78;
    vy[i] *= 0.78;

  }


}


function refreshColors() {
  let baseNum = random(0, 300);
  for (let i = 0; i < particleCount; i++) {
    lineColor[i] = random(baseNum, baseNum + 60);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function keyPressed() {
  if (keyCode === 32) {
    blendMode(BLEND);
    background(0);
    blendMode(ADD);
  }
  if (keyCode === 81) {
    console.warn(currentBrush);
    currentBrush = currentBrush == "Default" ? currentBrush = "Banded" : currentBrush = "Default";
  }
}
