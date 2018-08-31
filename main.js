//Variables
const offset = 30; //Margins
let algDisplayWidth = window.innerWidth / 2; //Get the width of each algorithm "display"
let algDisplayHeight = window.innerHeight / 2; //Get the height of each algorithm "display"
let numberLines = algDisplayWidth - 2 * offset; //Get the number of lines that fit in the displays

let lines = [[], [], [], []]; //Array to hold each algorithm's array

//These get picked at the start/reset and dont change at each iteration, unlike the red color value
var g; //Green color value
var b; //Blue color value

//Setup
function setup()
{
  let canvas = createCanvas(window.innerWidth, window.innerHeight);
  background(0);
  stroke(255);

  reset();
}

//Restart with the appropriate dimensions when window is resized
function windowResized()
{
  canvas = createCanvas(window.innerWidth, window.innerHeight);
  algDisplayWidth = window.innerWidth / 2;
  algDisplayHeight = window.innerHeight / 2;
  reset();
}

//Reset variables and the background
function reset()
{
  g = random(0, 255);
  b = random(0, 255);
  numberLines = algDisplayWidth - 2 * offset;

    for(var i = 0; i < numberLines; i++)
    {
      let rand = random(offset, algDisplayHeight - 2 * offset);
      rand = floor(map(rand, 1, algDisplayHeight - 2 * offset, algDisplayHeight - 2 * offset, 1));

      for(var j = 0; j < 4; j++)
      {
        lines[j][i] = rand;
      }
    }

  resetHelpers();
  drawBackground();
  drawLines();
}

//Draw the background (rectangles and text)
function drawBackground()
{
  background(0);
  stroke(0);
  fill(50, 50, 50);
  for(var j = 0; j < 2; j++)
  {
    for(var i = 0; i < 2; i++)
    {
      rect(i * algDisplayWidth, j * algDisplayHeight, algDisplayWidth, algDisplayHeight);
    }
  }
  noStroke();
  fill(255);
  textSize(20);
  textAlign(CENTER);
  text("Iterative Quick Sort", 0.5 * algDisplayWidth, offset);
  text("Bubble Sort", 1.5 * algDisplayWidth, offset);
  text("Iterative Merge Sort", 0.5 * algDisplayWidth, algDisplayHeight + offset);
  text("Selection Sort", 1.5 * algDisplayWidth, algDisplayHeight + offset);
}

//Draw each algorithm's lines
function drawLines()
{
  let index = 0;
  for(var j = 1; j < 3; j++)
  {
    for(var i = 0; i < 2; i++)
    {
      for(var k = 0; k < numberLines; k++)
      {
        stroke(lines[index][k] / 3, g, b, 100);
        line(k + i * algDisplayWidth + offset, j * algDisplayHeight - offset, k + i * algDisplayWidth + offset, j * algDisplayHeight - offset - lines[index][k]);
      }
      index++;
    }
  }
}

//Sort the lines' arrays using each algorithm
function sortLines()
{
  //Quicksort builds a sorted array from the initial one
  //The sorted array is displayed alongside the remaining part of the initial one
  let aux = iterativeQuickSort(lines[0]);

  for(let i = 0; i < aux.length; i++)
  {
    lines[0][i] = aux[i];
  }

  bubbleSort(lines[1]); //Each swap in an iteration is displayed
  iterativeMergeSort(lines[2]); //Each separation is displayed (to/from)
  selectionSort(lines[3]); //Each swap is displayed
}

//Draws the background, sorts lines and draws them
function draw()
{
  drawBackground();

  sortLines();

  drawLines();
}
