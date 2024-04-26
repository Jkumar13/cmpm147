// sketch.js - purpose and description here - Experiment 3: Alternate Worlds
// Using procedural generation to create an overworld map and a dungeon map
// Author: Jay Kumar
// Date: 4/23/24

const sketch1 = (p) => {
  let seed = 0;
  let tilesetImage;
  let currentGrid = [];
  let numRows, numCols;

  p.preload = function() {
    tilesetImage = p.loadImage("https://cdn.glitch.com/25101045-29e2-407a-894c-e0243cd8c7c6%2FtilesetP8.png?v=1611654020438");
  };

  p.setup = function() {
    const canvasContainer = p.select('#canvasContainer');
    numRows = parseInt(p.select('#asciiBox').attribute('rows'));
    numCols = parseInt(p.select('#asciiBox').attribute('cols'));
    p.createCanvas(16 * numCols, 16 * numRows).parent(canvasContainer);
    p.select('#reseedButton').mousePressed(reseed);
    p.select('#asciiBox').input(reparseGrid);
    reseed();
  };
  

  p.draw = function() {
    p.randomSeed(seed);
    p.background(128); 
    drawGrid(currentGrid);
  };

  function reseed() {
    seed = (seed | 0) + 1109;
    p.randomSeed(seed);
    p.noiseSeed(seed);
    p.select("#seedReport").html("seed " + seed);
    regenerateGrid();
  }

  function regenerateGrid() {
    p.select("#asciiBox").value(gridToString(generateGrid(numCols, numRows)));
    reparseGrid();
  }

  function reparseGrid() {
    currentGrid = stringToGrid(p.select("#asciiBox").value());
  }

  function gridToString(grid) {
    let rows = [];
    for (let i = 0; i < grid.length; i++) {
      rows.push(grid[i].join(""));
    }
    return rows.join("\n");
  }

  function getTileIndices(tile) {
    if (tile === '.') return [3, 13];
    else if (tile === '-') return [p.floor(p.random(3)), 13];
    else return [p.floor(p.random(4)), 0]; // '_'
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
        if (p.noise(i/10,j/10) > 0.5) {
          grid[i][j] = ".";  
        }
      }
    }
  
    return grid;
  }
  
  

 
  function drawGrid(grid) {
    p.background(128);
    for(let i = 0; i < grid.length; i++) {
      for(let j = 0; j < grid[i].length; j++) {
      
        if (gridCheck(grid, i, j, ".")) {
          placeTile(i, j, p.random(4) | 0, 0);
        }
       
        else {
          drawContext(grid, i, j, "", 3, 13);
          drawContext(grid, i, j, ".", 3, 13);
        }
      }
    }
    const scrub = p.mouseY / p.height; 
    p.noStroke();
    p.fill("#0068ff"); 
    for (let i = 0; i < 20; i++) {
      let r = 7 * p.random(); 
      let z = p.random(); 
      let y = p.height * (((scrub / 50 + p.millis() / 6500) / z) % 1);
      let x = p.width * p.random();
      p.rect(x, y, r, r); 
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
  
  
  
  function getTileIndices(tile) {
    if (tile === '.') return [3, 13];
    else if (tile === '-') return [p.floor(p.random(3)), 13];
    else return [p.floor(p.random(4)), 0]; // '_'
  }

  function placeTile(i, j, ti, tj) {
    p.image(tilesetImage, 16 * j, 16 * i, 16, 16, 8 * ti, 8 * tj, 8, 8);
  }
}

new p5(sketch1);


const sketch2 = (p) => {
  let seed = 0;
  let tilesetImage;
  let currentGrid = [];
  let numRows, numCols;

  p.preload = function() {
    tilesetImage = p.loadImage("https://cdn.glitch.com/25101045-29e2-407a-894c-e0243cd8c7c6%2FtilesetP8.png?v=1611654020438");
  };

  p.setup = function() {
    const canvasContainer = p.select('#canvasContainer2');
    numRows = parseInt(p.select('#asciiBox2').attribute('rows'));
    numCols = parseInt(p.select('#asciiBox2').attribute('cols'));
    p.createCanvas(16 * numCols, 16 * numRows).parent(canvasContainer);
    p.select('#reseedButton2').mousePressed(reseed);
    p.select('#asciiBox2').input(reparseGrid);
    reseed();
  };

  p.draw = function() {
    p.randomSeed(seed);
    p.background(128);
    drawGrid(currentGrid);
  };

  function reseed() {
    seed = (seed | 0) + 1109;
    p.randomSeed(seed);
    p.noiseSeed(seed);
    p.select("#seedReport2").html("seed " + seed);
    regenerateGrid();
  }

  function regenerateGrid() {
    p.select("#asciiBox2").value(gridToString(generateGrid(numCols, numRows)));
    reparseGrid();
  }

  function reparseGrid() {
    currentGrid = stringToGrid(p.select("#asciiBox2").value());
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
    p.background(128);
  
    for(let i = 0; i < grid.length; i++) {
      for(let j = 0; j < grid[i].length; j++) {
      
        if (gridCheck(grid, i, j, ".")) {
          placeTile(i, j, p.random(4) | 3, 24 - p.random(1));
        }
        else if (gridCheck(grid, i, j, "-")) {
          if (p.noise(i/5,j/5) > 0.65) {
            placeTile(i, j, p.random(4) | 3, 30 - p.random(1));
          }
          else if (p.noise(i/10,j/10) > 0.65) {
            placeTile(i, j, 30, 3);
  
          }
          else {
            placeTile(i, j, p.random(4) | 3, 9 + p.random(1));          
          }
        }
       
        else {
          drawContext(grid, i, j, "", 0, 16);
          drawContext(grid, i, j, ".", 3, 16);
          drawContext(grid, i, j, "-", 3, 16);
        }
  
  
      }
    }
    
    const scrub = p.mouseY / p.height; 
    
    p.noStroke();
    
    p.fill("#ffffff"); 
    for (let i = 0; i < 10; i++) {
      let r = 10 * p.random(); 
      let z = p.random(); 
      let y = p.height * (((scrub / 10 + p.millis() / 10000) / z) % 1);
      let x = p.width * p.random();
      p.rect(x, y, r, r); 
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
  
  
  
  


  function placeTile(i, j, ti, tj) {
    p.image(tilesetImage, 16 * j, 16 * i, 16, 16, 8 * ti, 8 * tj, 8, 8);
  }
};

new p5(sketch2);