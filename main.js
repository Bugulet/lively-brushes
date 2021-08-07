
let layers = Array(5);
let currentLayer = 0;
let x = [], y = [], px = [], py = [];
let vx = [], vy = [];
let particleCount = 400
let canvas;
let currentBrush = "Default";
let colorpicker;
let strokeColor;
let saveButton;
let fuzinessSlider;

let mouseDeadzoneX=150,mouseDeadzoneY=160;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);

  for (let i = 0; i < layers.length; i++) {
    layers[i] = createGraphics(windowWidth, windowHeight);
    layers[i].clear();
  }

  colorPicker = createColorPicker('#ff00d4');
  colorPicker.position(0, 0);

  saveButton = createButton("save");
  saveButton.position(0, 40);
  saveButton.mousePressed(SaveImage);

  fuzinessSlider=createSlider(1,10,3,0.1);
  fuzinessSlider.position(0,70);

  for (let i = 0; i < particleCount; i++) {
    x.push(0);
    y.push(0);
    vx.push(0);
    vy.push(0);
    px.push(0);
    py.push(0);
  }
  background(0);
  //colorMode(HSB);


}
function draw() {
  background(0);

  textSize(15);



  layers[currentLayer].blendMode(ADD);

  strokeColor = colorPicker.color();
  strokeColor.levels[0] /= 10;
  strokeColor.levels[1] /= 10;
  strokeColor.levels[2] /= 10;
  if (strokeColor.levels[0] < 5) {
    strokeColor.levels[0] = 5;
  }
  if (strokeColor.levels[1] < 5) {
    strokeColor.levels[1] = 5;
  }
  if (strokeColor.levels[2] < 5) {
    strokeColor.levels[2] = 5;
  }
  layers[currentLayer].stroke(strokeColor);

  for (let i = 0; i < particleCount; i++) {


    //randomed brush
    //if(Math.abs(mouseX - x[i])>50 && Math.abs(mouseY - y[i])>50) <- cool star stuff
    if (currentBrush == "Default") {
      vx[i] += (mouseX - x[i]) / (10 + i / 15) + random(-fuzinessSlider.value(), fuzinessSlider.value());
      vy[i] += (mouseY - y[i]) / (10 + i / 15) + random(-fuzinessSlider.value(), fuzinessSlider.value());
    }
    else if (currentBrush == "Banded") {
      vx[i] += (mouseX - x[i]) / (10 + i / 15);
      vy[i] += (mouseY - y[i]) / (10 + i / 15);
    }


    px[i] = x[i];
    py[i] = y[i];
    x[i] += vx[i];
    y[i] += vy[i];

    if (mouseIsPressed && mouseButton === LEFT)// && ! (mouseX<mouseDeadzoneX && mouseY<mouseDeadzoneY && mouseX>0 && mouseY>0)) {
      layers[currentLayer].line(px[i], py[i], x[i], y[i]);
      layers[currentLayer].line(width - px[i], py[i], width - x[i], y[i]);
    }
    vx[i] *= 0.78;
    vy[i] *= 0.78;

  }

  for (let i = 0; i < currentLayer + 1; i++) {
    image(layers[i], 0, 0);
  }
}




function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function keyPressed() {
  if (key == 'z' && currentLayer > 1) {
    layers[currentLayer].clear();
    currentLayer--;

    print("juj" + currentLayer);
  }
  if (keyCode === 32) {
    currentLayer = 0;
    print("space pressed");
    background(0);
    layers.forEach((layer) => layer.clear());

  }
  if (keyCode === 81) {
    console.warn(currentBrush);
    currentBrush = currentBrush == "Default" ? currentBrush = "Banded" : currentBrush = "Default";
  }
}

function mousePressed() {
  if (mouseButton === LEFT)//  && ! (mouseX<mouseDeadzoneX && mouseY<mouseDeadzoneY && mouseX>0 && mouseY>0)) {
    print(currentLayer);
    if (currentLayer >= layers.length - 1) {

      //copy the first layer onto the second, and delete the first one
      layers[1].copy(layers[0], 0, 0, windowWidth, windowHeight, 0, 0, windowWidth, windowHeight);
      layers.shift();

      //since we shifted it, i'll just push a new element like this
      layers.push(createGraphics(windowWidth, windowHeight));
      layers[layers.length - 1].clear();
      currentLayer--;
    }
    else {
      layers[currentLayer + 1].copy(layers[currentLayer], 0, 0, windowWidth, windowHeight, 0, 0, windowWidth, windowHeight);
      currentLayer++;
    }
  }
}

function SaveImage() {
  // savedLayer=createGraphics(windowWidth, windowHeight);
  // layers.forEach((layer)=>{
  //   savedLayer.copy(layer,0,0,windowWidth,windowHeight,0,0,windowWidth,windowHeight); 
  // })
  // savedLayer.save("print","png");

  saveCanvas(canvas, 'saved drawing ', 'png');

}

