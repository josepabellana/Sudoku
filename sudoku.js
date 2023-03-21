'use strict';
let array = [
  [4, 0, 0, 0, 0, 0, 0, 0, 8],
  [0, 3, 8, 2, 0, 0, 1, 0, 0],
  [6, 0, 0, 0, 0, 3, 0, 0, 0],
  [0, 1, 3, 0, 0, 9, 0, 0, 5],
  [0, 6, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 4, 0, 0, 0, 9, 0],
  [0, 0, 0, 0, 7, 0, 2, 0, 0],
  [8, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 9, 5, 0, 0, 4, 0, 0, 1],
];

function generateSolution(array) {
    let out = []
  for (let y = 0; y <= 9; y++) {
    for (let x = 0; x < 9; x++) {
      // if we reached depth = 9, we know we have got a good solution
      if (y === 9) {
        return(array);
      }
      if (array[y][x] === 0) {
        for (let i = 1; i <= 10; i++) {
          if (i === 10) {
            // if we reach 10, it means we reached a bad solution and needs to backtrack(return)
            return 'No Viable Solutions';
          }
          if (CheckPossible(array, y, x, i)) {
            //if we find a possible square, lets clone it and if we need to backtrack we can access
            //pre-modified board
            let copyArr = JSON.parse(JSON.stringify(array));
            copyArr[y][x] = i;
            let result = generateSolution(copyArr);
            //As we backtrack (going up the inception stack) we need to make sure it is 
            //an actual valid result 
            if (result !== 'No Viable Solutions') return result;
          }
        } 
      }
    }
  }
}

function CheckPossible(array, y, x, n) {
  for (let i = 0; i < array.length; i++) {
    if (array[y][i] === n) return false;
  }

  for (let i = 0; i < array.length; i++) {
    if (array[i][x] === n) return false;
  }

  let quadrantX = x / 3;
  let quadrantY = y / 3;

  if (quadrantX < 1) {
    quadrantX = 0;
  } else if (quadrantX < 2) {
    quadrantX = 3;
  } else {
    quadrantX = 6;
  }

  if (quadrantY < 1) {
    quadrantY = 0;
  } else if (quadrantY < 2) {
    quadrantY = 3;
  } else {
    quadrantY = 6;
  }

  for (let row = quadrantY; row < quadrantY + 3; row++) {
    for (let col = quadrantX; col < quadrantX + 3; col++) {
      if (array[row][col] === n) return false;
    }
  }
  return true;
}

console.table(generateSolution(array));