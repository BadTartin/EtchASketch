// create container for sketch grid
const gridcontainer = document.querySelector(".gridcontainer");

// define initial resolution of grid
var gridSize = 16;
var mode = "black"

const black = document.querySelector(".black");
black.addEventListener("click", () => {mode = "black"})

const erase = document.querySelector(".erase");
erase.addEventListener("click", () => {mode = "white"})

const random = document.querySelector(".random");
random.addEventListener("click", () => {mode = "random"})

const shading = document.querySelector(".shading");
shading.addEventListener("click", () => {mode = "shading"})

const pickcolor = document.querySelector(".picker");
pickcolor.addEventListener("click", () => {mode = "picker"})

function random_rgba() {
    var o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
}

let userColor = '';

const colorInput = document.querySelector('#input-color');
colorInput.addEventListener('input', () => {
    userColor = colorInput.value;
});


function tileColor () {
    if (isDown) {
        switch (mode) {
            case 'black': this.style.backgroundColor="black";
              break;
            case 'white': this.style.backgroundColor="white";
              break;
            case 'random': this.style.backgroundColor=random_rgba();
              break;
            case 'picker': this.style.backgroundColor=userColor;
              break;
            case 'shading': 
                var col = window.getComputedStyle(this);
                var rgbVal = col.backgroundColor.split(/[()]+/)[1].split(',');
            
                if (rgbVal[0].trim() == '0' && rgbVal[1].trim() == '0' &&
                  rgbVal[2].trim() == '0') {

                var rgbStr = 'rgba(' + rgbVal[0] + ',' + rgbVal[1] + ',' +
                  rgbVal[2] + ', ' + String(Number(rgbVal[3])+.1) + ')';
             
                this.style.backgroundColor = rgbStr;
                  }
                else { this.style.backgroundColor = 'rgba(0, 0, 0, 0)'; }
                break;
            }
        }
    }

// track whether mouse button is clicked down or not
var isDown = false;

// create grid tiles
function createGrid () {
    for (let i = 0; i < gridSize**2; i++) {
        var div = document.createElement("div");
        div.classList.add("tile");
        gridcontainer.appendChild(div);
    };
    // arrange in grid
    gridcontainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    const tiles = document.querySelectorAll(".tile")

    // add event listeners for drawing with mouse
    tiles.forEach(tile => { tile.addEventListener('mousedown', 
        () => isDown = true);
        tile.addEventListener('mouseup', () => isDown = false);
        tile.addEventListener('mouseover', tileColor);
    });
}

createGrid();

// remove tiles when creating new grid
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

// remove old grid and create new one when button is pressed
function updateValue () {
    if (document.querySelector("#gridsize").value > 100) {
        alert("Value must 100 or less");
    }
    else {
    gridSize = document.querySelector("#gridsize").value;
    removeAllChildNodes(gridcontainer);
    createGrid();
    }
}