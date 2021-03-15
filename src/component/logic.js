

function max(a, b) {
    return a > b ? a: b;
}

export async function aiMove(grid) {
    return new Promise(function(resolve, reject) {
        if (isGameOver(grid) !== 0) return 0;
        let moves = generateMoves(grid);
        let maxValue = -Infinity;
        let best, v;
        
        // maximum of 1000000 searches becaus moves m^depth = searches
        let maxdepth = Math.round(Math.log(1000000) / Math.log(moves.length));

        console.log("maxdepth = "+ maxdepth + "moves: " + moves.length);
        for(let m of moves) {
            addMove(grid, m, -1);
            v = -negaMax(grid, maxdepth, -Infinity, Infinity, 1);
            if (v > maxValue) {
                best = m;
                maxValue = v;
            }
            subMove(grid, m, -1);
        }
        resolve(best.col);
    });
}

// alpha-beta-pruning with negaMax
function negaMax(grid ,depth, alpha, beta, color) {
    if (depth === 0 || isGameOver(grid))
        return evaluate(grid, color, depth);

    let moves = generateMoves(grid);
    let value = -Infinity;
    for (let move of moves) {
        addMove(grid, move, color);
        value = max(value, -negaMax(grid, depth-1, -beta, -alpha, -color))
        alpha = max(alpha, value);
        subMove(grid, move, color);

        if (alpha >= beta) break;
    }
    return value;
}



function evaluate(grid, color, depth) {
    if (isGameOver(grid) === color) return depth*1000;
    else if (isGameOver(grid) === -color) return -1000*depth;
    
    return countThree(grid, color);
}

// returns occurrences of three cells and an empty cell in a row owned by player
function countThree(grid, player) {
    function checkFields(a, b, c, d) {
        if ((player === a && a === b && b === c && d === null) ||
            (player === a && a === b && c === null && b === d) ||
            (player === a && b === null && a === c && c === d) ||
            (null === a && a === b && b === c && d === player)) return true
        else return false;
    }

    let count = 0;

    // 0 = game running, 1 = p1 won, -1 = p2 won
    // check rows
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < grid.length; j++) {
            if (checkFields(grid[i][j], grid[i + 1][j], grid[i + 2][j], grid[i + 3][j])) count++;
        }
    }

    // check columns
    for (let i = 0; i < grid[0].length; i++) {
        for (let j = 0; j < 3; j++) {
            if (checkFields(grid[i][j], grid[i][j + 1], grid[i][j + 2], grid[i][j + 3])) count++;
        }
    }

    // left top -> left bottom
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 3; j++) {
            if (checkFields(grid[i][j], grid[i + 1][j + 1], grid[i + 2][j + 2], grid[i + 3][j + 3])) count++;
        }
    }

    // left top -> left bottom
    for (let i = 3; i < 6; i++) {
        for (let j = 0; j < 3; j++) {
            if (checkFields(grid[i][j], grid[i - 1][j + 1], grid[i - 2][j + 2], grid[i - 3][j + 3])) count++;
        }
    }

    return count;
}

const move_table = 
    [3,4, 5, 7, 5,4,3,
     4,6, 8,10, 8,6,4,
     5,8,11,13,11,8,5,
     5,8,11,13,11,8,5,
     4,6, 8,10, 8,6,4,
     3,4, 5, 7, 5,4,3,];
function generateMoves(grid) {
    let moves = [];
    for (let col = 0; col < 7; col++) {
        for (let row = 6 - 1; row >= 0; row--) {
            if (!grid[col][row]) {
                moves.push({ col, row });
                break;
            }
        }
    }
    // sort moves by distance to the middle column
    return moves.sort((a, b) => move_table[b.row*7 + b.col] - move_table[a.row * 7 + a.col]);
}

function addMove(grid, move, player) {
    if (grid[move.col][move.row]) console.error("Invalid move: " + move.col + " " + move.row);
    grid[move.col][move.row] = player;
}

function subMove(grid, move, player) {
    if (grid[move.col][move.row] !== player) console.error("Invalid revert: " + move.col + " " + move.row);
    grid[move.col][move.row] = null;
}

export function isGameOver(grid) {
    let draw = true;
    for (let i = 0; i < 7; i++)
        if(!grid[i][0]) draw = false;

    function checkFields(a, b, c, d) {
        if (a && a === b && b === c && c === d) return a;
        else return null;
    }

    // check rows
    for (let j = 0; j < 6; j++) {
        for (let i = 0; i < 4; i++) {
        let winner = checkFields(grid[i][j], grid[i+1][j], grid[i+2][j], grid[i+3][j]);
        if(winner) return winner;
        }
    }

    //check columns
    for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 3; j++) {
        let winner = checkFields(grid[i][j], grid[i][j+1], grid[i][j+2], grid[i][j+3]);
        if (winner) return winner;
        }
    }

    //diagonals top left to bottom right
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 3; j++) {
        let winner = checkFields(grid[i][j], grid[i+1][j+1], grid[i+2][j+2], grid[i+3][j+3]);
        if (winner) return winner;
        }
    }

    //diagonals top right to bottom
    for (let i = 3; i < 7; i++) {
        for (let j = 0; j < 3; j++) {
        let winner = checkFields(grid[i][j], grid[i-1][j+1], grid[i-2][j+2], grid[i-3][j+3]);
        if (winner) return winner; 
        }
    }
    return draw ? 2 : 0;
}