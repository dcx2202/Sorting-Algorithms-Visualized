//Helper variables (used to run the sorting algorithms one iteration per draw cycle)
let selectionSortAux = 0;
let i = 1;
var increment = lines.length / 2;

var stack = [lines[0]];
var sorted = [];

let count = 0; //Used to slow down Iterative Merge Sort


//Iterative Quick Sort algorithm (one iteration per draw cycle)
function iterativeQuickSort(arr)
{
  while (stack.length)
  {
    var temp = stack.pop(), tl = temp.length;

    if (tl == 1) {
        sorted.push(temp[0]);
        continue;
    }
    var pivot = temp[0];
    for(let j = 0; j < arr.length; j++)
    {
      if(arr[j] == pivot)
      {
        stroke(255);
        line(j + offset, algDisplayHeight - offset, j + offset, algDisplayHeight - offset - arr[j]);
        break;
      }
    }
    var left = [], right = [];

    for (var i = 1; i < tl; i++) {
        if (temp[i] < pivot) {
            left.push(temp[i]);
        } else {
            right.push(temp[i]);
        }
    }

    left.push(pivot);

    if (right.length)
        stack.push(right);
    if (left.length)
        stack.push(left);
        break;
  }
  return sorted;
}

//Bubble Sort (one iteration per draw cycle)
function bubbleSort(lines)
{
  for(var i = 0; i < lines.length; i++)
  {
    if(lines[i] > lines[i + 1])
    {
      swap(lines, i, i + 1);
      stroke(255);
      line(i + 1 + algDisplayWidth + offset, algDisplayHeight - offset, i + 1 + algDisplayWidth + offset, algDisplayHeight - offset - lines[i + 1]);
    }
  }
}

//Iterative Merge Sort (one iteration per draw cycle)
function iterativeMergeSort(lines)
{
  let low = 0;
  let high = lines.length - 1;

  let temp = lines.slice(0);

  if(i <= high - low && count == 10)
  {
    for(var j = low; j < high; j += 2 * i)
    {
      let from = j;
      let mid = j + i - 1;
      let to = min(j + 2 * i - 1, high);

      stroke(255);
      line(to + offset, 2 * algDisplayHeight - offset, to + offset, 2 * algDisplayHeight - offset - lines[to]);

      merge(lines, temp, from, mid, to);
    }
    i = 2 * i;
    count = 0;
  }
  count++;
}

//Merge Sort Helper
function merge(lines, temp, from, mid, to)
{
  let k = from;
  let i = from;
  let j = mid + 1;

  while(i <= mid && j <= to)
  {
    if(lines[i] < lines[j])
    {
      temp[k] = lines[i];
      k++;
      i++;
    }
    else
    {
      temp[k] = lines[j];
      k++;
      j++;
    }
  }

  while(i <= mid)
  {
    temp[k] = lines[i];
    k++;
    i++;
  }

  for(var l = from; l <= to; l++)
  {
    lines[l] = temp[l];
  }
}

//Selection Sort (one iteration per draw cycle)
function selectionSort(lines)
{
  let minIndex;
  if(selectionSortAux < lines.length)
  {
    minIndex = selectionSortAux;
    for(var j = selectionSortAux + 1; j < lines.length; j++)
    {
      if(lines[j] < lines[minIndex])
        minIndex = j;
    }
    stroke(255);
    line(selectionSortAux + algDisplayWidth + offset, 2 * algDisplayHeight - offset, selectionSortAux + algDisplayWidth + offset, 2 * algDisplayHeight - offset - lines[selectionSortAux]);
    line(minIndex + algDisplayWidth + offset, 2 * algDisplayHeight - offset, minIndex + algDisplayWidth + offset, 2 * algDisplayHeight - offset - lines[minIndex]);

    swap(lines, selectionSortAux, minIndex);
  }
  selectionSortAux++;
}

//Swap helper function - swaps the values of two given indexes of the given array
function swap(lines, a, b)
{
  temp = lines[a];
  lines[a] = lines[b];
  lines[b] = temp;
}

//Reset helper variables - called when window is resized
function resetHelpers()
{
  selectionSortAux = 0;
  i = 1;
  increment = lines.length / 2;

  stack = [lines[0]];
  sorted = [];

  count = 0;
}
