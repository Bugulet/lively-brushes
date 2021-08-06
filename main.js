let x = [], y = [], px = [], py = [], lineColor = [];
let vx = [], vy = [];

let particleCount = 400

let canvas;

let currentBrush = "Default";

let colorpicker;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);

  canvas.mouseClicked(refreshColors);

  colorPicker = createColorPicker('#ff00d4');
  colorPicker.position(0, 0);

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
  //colorMode(HSB);
  blendMode(ADD);
  
}
let lineAmount=0;
function draw() {

  fill(255, 255, 255, 255);
  strokeWeight(0);
  textSize(15);
  text("press space to clear", 0, 40);
  text("press Q to switch brush", 0, 60);
  // textSize(20)
  // text(`w:${width} h:${height}`, 0, 90);
   
  // stroke(lineColor[0], 70, 5)

  //beginShape(LINES);


  strokeWeight(1);

  let strokeColor=colorPicker.color();
    strokeColor.setAlpha(15);
    stroke(strokeColor);

  for (let i = 0; i < particleCount; i++) {

    
    //randomed brush
    //if(Math.abs(mouseX - x[i])>50 && Math.abs(mouseY - y[i])>50) <- cool star stuff
    if (currentBrush == "Default" ) {
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
    
    if (mouseIsPressed) {
      //vertex(px[i], py[i]);
      //vertex(x[i], y[i]);
       line(px[i], py[i], x[i], y[i]);
       lineAmount++;
       line(width - px[i], py[i], width - x[i], y[i]);
    }
    vx[i] *= 0.78;
    vy[i] *= 0.78;

  }
  //endShape();
  print(lineAmount+"lines");
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

// function mouseReleased() {
//   ellipse(mouseX, mouseY, 5, 5);
//   // prevent default
//   return false;
// }
