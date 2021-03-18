

function max(a, b) {
    return a > b ? a: b;
}

let searches, prune;
export async function aiMove(grid) {
    return new Promise(function(resolve, reject) {
        if (isGameOver(grid) !== 0) {
            console.log("finished grid.");
            return null;
        }
        searches = 0;
        prune = 0;
        let moves = generateMoves(grid); // possible moves array
        let maxValue = -Infinity;
        let v;
        // maximum of 2000000 searches because moves m^depth = searches
        let maxdepth = Math.round(Math.log(2000000) / Math.log(moves.length));

        if (moves.length === 1) 
            resolve([moves[0].col, " | no moves need to be analysed"]); 
        else {
            let best = moves[0];
            // evaluate all moves and choose the best
            for(let m of moves) {
                addMove(grid, m, -1);
                v = -negaMax(grid, maxdepth, -Infinity, Infinity, 1);
                console.log("move: " + m.col + "value: " + v);
                if (v > maxValue) {
                    best = m;
                    maxValue = v;
                }
                subMove(grid, m, -1);
            }

            let text = " | searchdepth: " + maxdepth + " | analysed moves: " 
                        + searches + " | 'skipped' moves: " + prune;
            
            // win or loss is a mutliple of 1000. The higher the lesser moves to win/lose
            let left = (maxdepth - Math.abs(maxValue /1000))/2
            if (maxValue >= 1000) text += " | win in " + left + (left === 1 ? " move" : " moves");
            else if (maxValue <= -1000) text += " | loss in " + left + (left === 1 ? " move" : " moves");

            resolve([best.col, text]);
        }
    });
}

// alpha-beta-pruning with negaMax
function negaMax(grid ,depth, alpha, beta, color) {
    if (depth === 0 || isGameOver(grid)) {
        return evaluate(grid, color, depth);
    }

    let moves = generateMoves(grid);
    let value = -Infinity;
    for (let move of moves) {
        addMove(grid, move, color);
        value = max(value, -negaMax(grid, depth-1, -beta, -alpha, -color))
        alpha = max(alpha, value);
        subMove(grid, move, color);

        if (alpha >= beta) {
            prune += (7-moves.length) * Math.pow(7, depth-1 >= 0 ? depth-1 : 0);
            break; 
        }
    }
    return value;
}



function evaluate(grid, color, depth) {
    searches += 1;
    let result = isGameOver(grid);
    if (isGameOver(grid) === color) {
        return 1000*depth;
    }
    if (isGameOver(grid) === -color) {
        return -1000*depth;
    }

    if (result === 2) {
        return 0;
    }    
    return countThree(grid, color);
}

// returns occurrences of three cells and an empty cell in a row owned by player
function countThree(grid, player) {
    function checkFields(a, b, c, d) {
         return ((player === a && a === b && b === c && d === null) ||
            (player === a && a === b && c === null && b === d) ||
            (player === a && b === null && a === c && c === d) ||
            (null === a && a === b && b === c && d === player));
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
     3,4, 5, 7, 5,4,3];
function generateMoves(grid) {

    // generates a sorted array of all possible moves
    let moves = [];
    for (let col = 0; col < 7; col++) {
        for (let row = 6 - 1; row >= 0; row--) {
            if (!grid[col][row]) {
                moves.push({ col, row });
                break;
            }
        }
    }
    // sort moves by value of move_table
    return moves.sort((a, b) => move_table[b.row*7 + b.col] - move_table[a.row * 7 + a.col]);
}

function addMove(grid, move, player) {
    grid[move.col][move.row] = player;
}

function subMove(grid, move, player) {
    grid[move.col][move.row] = null;
}

export function isGameOver(grid) {

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

    for (let i = 0; i < 7; i++)
        if(!grid[i][0]) return 0;
    
    return 2;
}