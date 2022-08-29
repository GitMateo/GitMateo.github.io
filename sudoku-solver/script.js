let initialGrid = [
[5, 1, 7, 6, 0, 0, 0, 3, 4],
[2, 8, 9, 0, 0, 4, 0, 0, 0],
[3, 4, 6, 2, 0, 5, 0, 9, 0],
[6, 0, 2, 0, 0, 0, 0, 1, 0],
[0, 3, 8, 0, 0, 6, 0, 4, 7],
[0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 9, 0, 0, 0, 0, 0, 7, 8],
[7, 0, 3, 4, 0, 0, 5, 6, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0]];


let sudokuCells = [...document.querySelectorAll('.cell')];

function initGrid() {
  sudokuCells.forEach((cell, index) => {
    let i = Math.floor(index / 9);
    let j = index % 9;

    if (initialGrid[i][j] !== 0) {
      cell.value = initialGrid[i][j];
      cell.setAttribute('disabled', true);
    } else {
      cell.value = '';
    }
  });
}

async function waitFor(ms) {
  return new Promise(resolve => {
    setTimeout(() => resolve(), ms);
  });
}

function range(start = 0, end = 0) {
  let length = end - start + 1;
  return Array.from({ length }, (x, i) => start + i);
}

function findEmptyCell(grid) {
  for (let i of range(0, 8))
  for (let j of range(0, 8))
  if (grid[i][j] === 0)
  return { i, j };

  return { i: -1, j: -1 };
}

function isValid(grid, i, j, e) {
  let isRowValid = range(0, 8).every(columnIndex => grid[i][columnIndex] !== e);

  if (isRowValid) {
    let isColumnValid = range(0, 8).every(rowIndex => grid[rowIndex][j] !== e);

    if (isColumnValid) {
      let sectorTopX = 3 * Math.floor(i / 3),
      sectorTopY = 3 * Math.floor(j / 3);

      for (let x of range(sectorTopX, sectorTopX + 2))
      for (let y of range(sectorTopY, sectorTopY + 2))
      if (grid[x][y] === e)
      return false;

      return true;
    }
  }
  return false;
}

async function solveSudoku(grid) {
  let { i, j } = findEmptyCell(grid);

  if (i === -1)
  return true;

  for (let e of range(1, 9)) {
    if (isValid(grid, i, j, e)) {

      let miliseconds = document.querySelector('.range').value;
      if (miliseconds > 0) {
        await waitFor(miliseconds);
      }

      grid[i][j] = e;
      sudokuCells[i * 9 + j].value = e;

      if (await solveSudoku(grid)) {
        return true;
      } else {
        grid[i][j] = 0;
        sudokuCells[i * 9 + j].value = '';
      }
    }
  }

  return false;
}

initGrid();

document.querySelector('.solve').addEventListener('click', () => {
  initGrid();
  solveSudoku(_.cloneDeep(initialGrid));
});
document.querySelector('.reset').addEventListener('click', () => {
  initGrid();
});


let rangeElement = document.querySelector('.range');
new Powerange(rangeElement, { max: 50, start: 5 });
rangeElement.onchange = () => {
  document.querySelector('.range-info').innerHTML = `Slow down slider: ${rangeElement.value}ms`;
};