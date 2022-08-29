function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const grid = createGrid();

function createGrid(){

    let grid = [

        [0, 0, 0, 0, 0, 0, 0, 0 ,0],
        [0, 0, 0, 0, 0, 0 ,0, 0, 0],
        [0, 0, 0, 0, 0, 0 ,0, 0, 0],
    
        [0, 0, 0, 0, 0, 0 ,0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
    
        [0, 0, 0, 0, 0 ,0, 0, 0, 0],
        [0, 0 ,0, 0, 0, 0, 0, 0, 0],
        [0, 0 ,0, 0, 0, 0, 0, 0, 0]
        
    ];

    for(let y = 0; y < 9; y++){
        for(let x = 0; x < 9; x++){

            if(Math.floor(Math.random()*100) >= 80){

                for(let n = 1; n < 10; n++){
                    if(isPossible(x,y,n,grid)){
                        grid[y][x] = n;
                        break;
                    }
                }
            }
        }
    }

    return grid;
}

//Deep copy of grid for visualization
const baseGrid = JSON.parse(JSON.stringify(grid));

//Recorded steps, used for visualization
const steps = [];
updateTable(grid);

//Returns true or false based on if n fits in the grid at the x,y coordinate of the grid
function isPossible(x, y, n, grid){

    const row = [];
    const box = [];
    const boxX = Math.floor(x / 3) * 3;
    const boxY = Math.floor(y / 3) * 3;
    
    for(let i = 0; i < 3; i++){
        for(let j = 0; j < 3; j++){
            box.push(grid[boxY+i][boxX+j]);
        }
    }

    for(let i = 0; i < 9; i++){row.push(grid[i][x]);}

    return !(grid[y].includes(n) || row.includes(n) || box.flat(Infinity).includes(n));
}

//Uses backtracking and recursion to find a possible to the sudoku
function solve(y, x, grid){

    if(!grid.flat(Infinity).includes(0)){
        return true;
    }

    let nextX = (1+x)%9;
    let nextY = nextX < x ? y+1 : y;

    if(grid[y][x] != 0){
        return solve(nextY, nextX, grid);
    }
    for(let n = 1; n < 10; n++){

        if(isPossible(x, y, n, grid)){
            grid[y][x] = n;
            steps.push({x,y,n});

            if(solve(nextY,nextX, grid)){
                return true;
            }
        }
        grid[y][x] = 0;
    }

    steps.push({x,y,n:0});
    return false;
}
solve(0,0,grid);

//DOM manipulation
function updateTable(grid){

    for(let tr = 0; tr < 9; tr++){
        for(let td = 0; td < 9; td++){
            document.querySelector(`tbody:nth-of-type(${Math.ceil((tr+1)/3)}) > tr:nth-child(${tr%3+1}) > td:nth-child(${td+1})`).textContent = grid[tr][td]==0?"":grid[tr][td];
        }
    }
}



//To help visualize
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

//Using the baseGrid and steps, we can now slowly add steps to the baseGrid and show what was happening
async function visualize(){

    const speed = (_ =>{
    
        let temp = -1;
        do{
            temp = prompt("Speed of visualization? (in ms)");
        }while(temp <= 0 || isNaN(temp) || temp> 2000);
        return temp;
    })();
    while(steps[0]){
        const step = steps.shift();
        baseGrid[step.y][step.x] = step.n;
        updateTable(baseGrid);
        await sleep(speed);
    }
}

