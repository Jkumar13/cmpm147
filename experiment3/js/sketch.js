// sketch.js - purpose and description here - Experiment 3: Alternate Worlds
// Using procedural generation to create an overworld map and a dungeon map
// Author: Jay Kumar
// Date: 4/23/24


var s = function( sketch ) {
  
  
  let seed = 0;
  let tilesetImage;
  let currentGrid = [];
  let numRows, numCols;


     
  sketch.preload = function() {
    tilesetImage = sketch.loadImage(
      "https://cdn.glitch.com/25101045-29e2-407a-894c-e0243cd8c7c6%2FtilesetP8.png?v=1611654020438"
    );
  }

  function reseed() {
    seed = (seed | 0) + 1109;
    sketch.randomSeed(seed);
    sketch.noiseSeed(seed);
    sketch.select("#seedReport").html("seed " + seed);
    regenerateGrid();
  }

  function regenerateGrid() {
    sketch.select("#asciiBox").value(gridToString(generateGridO(numCols, numRows)));
    reparseGrid();
  }

  function reparseGrid() {
    currentGrid = stringToGrid(sketch.select("#asciiBox").value());
  }

  function gridToString(grid) {
    let rows = [];
    for (let i = 0; i < grid.length; i++) {
      rows.push(grid[i].join(""));
    }
    return rows.join("\n");
  }

  function stringToGrid(str) {
    let grid = [];
    let lines = str.split("\n");
    for (let i = 0; i < lines.length; i++) {
      let row = [];
      let chars = lines[i].split("");
      for (let j = 0; j < chars.length; j++) {
        row.push(chars[j]);
      }
      grid.push(row);
    }
    return grid;
  }
    
  sketch.setup = function() { 
    numCols = sketch.select("#asciiBox").attribute("rows") | 0;
    numRows = sketch.select("#asciiBox").attribute("cols") | 0;

    sketch.createCanvas(16 * numCols, 16 * numRows).parent("#canvasContainer");
    sketch.select("#defaultCanvas0").elt.getContext("2d").imageSmoothingEnabled = false;

    sketch.select("#reseedButton").mousePressed(reseed);
    sketch.select("#asciiBox").input(reparseGrid);

    reseed();
  };

    sketch.draw = function() {
      sketch.randomSeed(seed);
      drawGridO(currentGrid);
    };
  
    sketch.placeTile = function(i,j,ti,tj) {
      sketch.image(tilesetImage, 16 * j, 16 * i, 16, 16, 8 * ti, 8 * tj, 8, 8);
    }
  
  
  };
  
  var myp5_1 = new p5(s, 'p5sketch');
  
  var s2 = function( sketch ) {
  
  
    let seed = 0;
    let tilesetImage;
    let currentGrid = [];
    let numRows, numCols;
  
        
    sketch.preload = function() {
      tilesetImage = sketch.loadImage(
        "https://cdn.glitch.com/25101045-29e2-407a-894c-e0243cd8c7c6%2FtilesetP8.png?v=1611654020438"
      );
    }
  
    function reseed() {
      seed = (seed | 0) + 1109;
      sketch.randomSeed(seed);
      sketch.noiseSeed(seed);
      sketch.select("#seedReport2").html("seed " + seed);
      regenerateGrid();
    }
  
    function regenerateGrid() {
      sketch.select("#asciiBox2").value(gridToString(generateGrid(numCols, numRows)));
      reparseGrid();
    }

    function reparseGrid() {
      currentGrid = stringToGrid(sketch.select("#asciiBox2").value());
    }
  
    function gridToString(grid) {
      let rows = [];
      for (let i = 0; i < grid.length; i++) {
        rows.push(grid[i].join(""));
      }
      return rows.join("\n");
    }
  
    function stringToGrid(str) {
      let grid = [];
      let lines = str.split("\n");
      for (let i = 0; i < lines.length; i++) {
        let row = [];
        let chars = lines[i].split("");
        for (let j = 0; j < chars.length; j++) {
          row.push(chars[j]);
        }
        grid.push(row);
      }
      return grid;
    }
  
      
    sketch.setup = function() { 
      numCols = sketch.select("#asciiBox2").attribute("rows") | 0;
      numRows = sketch.select("#asciiBox2").attribute("cols") | 0;
  
      sketch.createCanvas(16 * numCols, 16 * numRows).parent("#canvasContainer2");
      sketch.select("#defaultCanvas0").elt.getContext("2d").imageSmoothingEnabled = false;
  
      sketch.select("#reseedButton2").mousePressed(reseed);
      sketch.select("#asciiBox2").input(reparseGrid);
  
      reseed();
    };

    sketch.draw = function() {
      sketch.randomSeed(seed);
      drawGrid(currentGrid);
    };

    sketch.placeTile2 = function(i,j,ti,tj) {
      sketch.image(tilesetImage, 16 * j, 16 * i, 16, 16, 8 * ti, 8 * tj, 8, 8);
    }


  };

  var myp5_2 = new p5(s2, 'p5sketch');




/* exported generateGrid, drawGrid */
/* global placeTile */

function generateGridO(numCols, numRows) {
  let grid = [];
  for (let i = 0; i < numRows; i++) {
    let row = [];
    for (let j = 0; j < numCols; j++) {
      row.push("_");
    }
    grid.push(row);
  }
  

  
  for(let i = 0; i < grid.length; i++) {
    for(let j = 0; j < grid[i].length; j++) {
      if (myp5_1.noise(i/10,j/10) > 0.5) {
        grid[i][j] = ".";  
      }
    }
  }

  return grid;
}


function drawGridO(grid) {
  myp5_1.background(128);

  for(let i = 0; i < grid.length; i++) {
    for(let j = 0; j < grid[i].length; j++) {
    
      if (gridCheck(grid, i, j, ".")) {
        placeTile(i, j, random(4) | 0, 0);
      }
     
      else {
        drawContextO(grid, i, j, "", 3, 13);
        drawContextO(grid, i, j, ".", 3, 13);
      }


    }
  }
  
  const scrub = mouseY / height; 
  
  noStroke();
  
  fill("#0068ff"); 
  for (let i = 0; i < 20; i++) {
    let r = 7 * random(); 
    let z = random(); 
    let y = height * (((scrub / 50 + millis() / 6500) / z) % 1);
    let x = width * random();
    rect(x, y, r, r); 
  }
}

function gridCheck(grid, i, j, target) {
  if (i > -1 && i < grid.length && j > -1 && j < grid[i].length) {
    return grid[i][j] === target;
  }
  else {
    return false;
  }
}

function gridCode(grid, i, j, target) {
  const northBit = gridCheck(grid, i - 1, j, target) ? true : false;
  const southBit = gridCheck(grid, i + 1, j, target) ? true : false;
  const eastBit  = gridCheck(grid, i, j + 1, target) ? true : false;
  const westBit  = gridCheck(grid, i, j - 1, target) ? true : false;

  return (northBit << 0) + (southBit << 1) + (eastBit << 2) + (westBit << 3);
}

function drawContextO(grid, i, j, target, ti, tj) {
  const code = gridCode(grid, i, j, target);

  if (code < lookup.length) {
    const [tiOffset, tjOffset] = lookup[code];
    placeTile(i, j, ti + tiOffset, tj + tjOffset);
  }
}

const lookup = [
  [0, 0],
  [2,-13],
  [2,-11],
  [2,-11],
  [3,-12],
  [3,-12],
  [3,-12],
  [3,-12],
  [1,-12],
  [1,-13],
  [1,-11],
  [1,-13],
];


/* exported generateGrid, drawGrid */
/* global placeTile */

function generateGrid(numCols, numRows) {
  let grid = [];
  for (let i = 0; i < numRows; i++) {
    let row = [];
    for (let j = 0; j < numCols; j++) {
      row.push("_");
    }
    grid.push(row);
  }
  

  for(let i = 0; i < grid.length; i++) {
    for(let j = 0; j < grid[i].length; j++) {
      grid[i][j] = ".";
    }
  }
  

  for(let i = 1; i < grid.length-1; i++) {
    for(let j = 1; j < grid[i].length-1; j++) {
      grid[i][j] = ":";
    }
  }
  
  // let rectX = Math.floor(Math.random() * (numCols - 1)) + 1;
  let rectY = Math.floor(Math.random() * (numRows - 1)) + 1;
  // let rectX2 = rectX + Math.floor(Math.random() * (numCols - rectX)) - 1;
  let rectY2 = rectY + Math.floor(Math.random() * (numRows - rectY)) - 1;

  for (let i = rectY; i <= rectY2; i++) {
    grid[i][grid.length-2] = "-";
  }


  for (let i = 9; i <= 10; i++) {
    for (let j = 0; j <= 19; j++) {
      grid[i][j] = "-";
    }
  }
  for (let i = 0; i <= 18; i++) {
    for (let j = 9; j <= 10; j++) {
      grid[i][j] = "-";
    }
  }
  
  
  return grid;
}


function drawGrid(grid) {
  myp5_1.background(128);

  for(let i = 0; i < grid.length; i++) {
    for(let j = 0; j < grid[i].length; j++) {
    
      if (gridCheck(grid, i, j, ".")) {
        placeTile(i, j, random(4) | 3, 24 - random(1));
      }
      else if (gridCheck(grid, i, j, "-")) {
        if (myp5_1.noise(i/5,j/5) > 0.65) {
          placeTile(i, j, random(4) | 3, 30 - random(1));
        }
        else if (myp5_1.noise(i/10,j/10) > 0.65) {
          placeTile(i, j, 30, 3);

        }
        else {
          placeTile(i, j, random(4) | 3, 9 + random(1));          
        }
      }
     
      else {
        drawContext(grid, i, j, "", 0, 16);
        drawContext(grid, i, j, ".", 3, 16);
        drawContext(grid, i, j, "-", 3, 16);
      }


    }
  }
  
  const scrub = mouseY / height; 
  
  noStroke();
  
  fill("#ffffff"); 
  for (let i = 0; i < 10; i++) {
    let r = 10 * random(); 
    let z = random(); 
    let y = height * (((scrub / 10 + millis() / 10000) / z) % 1);
    let x = width * random();
    rect(x, y, r, r); 
  }
  
}

function gridCheck(grid, i, j, target) {
  if (i > -1 && i < grid.length && j > -1 && j < grid[i].length) {
    return grid[i][j] === target;
  }
  else {
    return false;
  }
}

function gridCode(grid, i, j, target) {
  const northBit = gridCheck(grid, i - 1, j, target) ? true : false;
  const southBit = gridCheck(grid, i + 1, j, target) ? true : false;
  const eastBit  = gridCheck(grid, i, j + 1, target) ? true : false;
  const westBit  = gridCheck(grid, i, j - 1, target) ? true : false;

  return (northBit << 0) + (southBit << 1) + (eastBit << 2) + (westBit << 3);
}

function drawContext(grid, i, j, target, ti, tj) {
  const code = gridCode(grid, i, j, target);

  if (code < lookup.length) {
    const [tiOffset, tjOffset] = lookup[code];
    placeTile(i, j, ti + tiOffset, tj + tjOffset);
  }
}

const lookupD = [
  [0,0],
  [2,-13],
  [2,-11],
  [2,-11],
  [3,-12],
  [3,-12],
  [3,-12],
  [3,-12],
  [1,-12],
  [1,-13],
  [1,-11],
  [1,-11]
];







  
  

