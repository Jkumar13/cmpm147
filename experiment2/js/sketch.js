// sketch.js - purpose and description here
// Author: Your Name
// Date:

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file

let seed = 0;

const skyColor = "#000000";
const grassColor = "#35e54b";
const stoneColor = "#853290";
const treeColor = "#33330b";
const planetColor = "#35dae5";
const earthColor = "#0024ff";
const groundColor = "#ae5616"
const planetColor2 = "#16a1ae"
const mountainColor = "#473f3f"
const orange = "#e88110"

function resizeScreen() {
  centerHorz = canvasContainer.width() / 2; // Adjusted for drawing logic
  centerVert = canvasContainer.height() / 2; // Adjusted for drawing logic
  console.log("Resizing...");
  resizeCanvas(canvasContainer.width(), canvasContainer.height());
  // redrawCanvas(); // Redraw everything based on new size
}

// listener for reimagine button
$("#reimagine").click(function() {
  seed++;
});

function setup() {  
  canvasContainer = $("#canvas-container");
  let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
  canvas.parent("canvas-container");
  $(window).resize(function() {
    resizeScreen();
  });
  resizeScreen();
}


// draw() function is called repeatedly, it's the main animation loop
function draw() {
  randomSeed(seed);
  background(100);
  
  
  
  noStroke();
  
  fill(skyColor);
  rect(0, 0, width, height/1.3);
  
  fill(planetColor2);
  circle(width, height, width);
  
  fill(orange);
  arc(90, 50, 355, 80, 0.01, 1.3, 1.5);

  
  const planets = 70*random();
  const scrub = mouseX/width;
  
  for (let i = 0; i < planets; i++) {
    let z = random();
    let x = width * ((random() + (scrub/50 + millis() / 100000.0) / z) % 1)
    let s = width / 5 / z;
    if (Math.floor(random(5)) == 1) {
      fill(stoneColor);
    }
    else if (Math.floor(random(5)) == 2) {
      fill(treeColor);
    }
    else if (Math.floor(random(5)) == 3) {
      fill(grassColor);
    }
    else if (Math.floor(random(5)) == 4) {
      fill(planetColor);
    }
    else {
      fill(earthColor);
    }
    circle(x*2, s, x/4);
  }
  
  fill(groundColor);
  rect(0, height / 1.41, width, height / 2);
  
  fill(mountainColor);
  beginShape();
  vertex(0, height/1.4);
  const steps = 25;
  for (let i = 0; i < steps + 1; i++) {
    let x = (width * i) / steps;
    let y =
      height / 1.4 - (random() * random() * random() * height) / 4 - height / 50;
    vertex(x, y);
  }
  vertex(width, height / 1.4);
  endShape(CLOSE);
  
  fill(groundColor);
  beginShape();
  vertex(0, height / 0.9);
  for (let i = 0; i < steps + 1; i++) {
    let x = (width * i) / steps;
    let y =
      height / 0.9 - (random() * random() * random() * height) / 4 - height / 3;
    vertex(x, y);
  }
  vertex(width, height / 0.9);
  endShape(CLOSE);
  
}