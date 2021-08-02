function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
  fill(255);
  text(int(getFrameRate()),windowWidth/2,windowHeight/2);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
