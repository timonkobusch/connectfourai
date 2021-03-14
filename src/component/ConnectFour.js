import '../style/connectFour.css';
import { useState } from 'react';

function evaluate() {

}
function max(a, b) {
  return a>b ? a : b;
}

function min(a,b) {
  return a<b ? a: b;
}

function addStone(g, i, p) {
  let row = 6;
  for( let j = 0; j < 6; j++) {
    if(g[i][j]) {
      row = j;
      break;
    }
  }
  g[i][row-1] = p ? 1 : -1;
  return g;
}

function minimax(g, depth, maxPlayer) {
  if (depth === 0) return evaluate();
  let res = gameOver(g);
  if (res !== 0) return res*10000;
  let value;
  let moves = [1,2,3,4,5];
  if (maxPlayer) {
    value = -99999;
    for (let elt of moves) {
      value = max(value, minimax(addStone(g, elt, true), depth -1, false));
    }
    return value;
  } 
  else {
    value = 99999;
    for(let elt of moves) {
      value = min(value, minimax(addStone(g, elt, false), depth -1, true));
    }
    return value;
  }


}

function aiMove(pgrid) {
  let g = [];

  for (let j = 0; j < pgrid.length; j++)
     g[j] = pgrid[j].slice();

  let move = minimax(g, 5, true);
  
  
  return 1;
}

function Cell(props) {
  let classname = 'cell ';
  if (props.value === 1) classname += 'p1';
  else if (props.value === -1) classname += 'p2';
  else classname += 'empty';

  return (
      <div className={classname}></div>
  )
}

function Board(props) {
  return (
      <div className={"board"}>
          {props.grid.map((col, i) => 
              <div key={i} className={"col"} onClick={() => props.onClick(i)}>
                  {col.map((value, j) => <Cell key={j} value={value}/>)}
              </div>
          )}
      </div>
  )
}


export default function ConnectFour(props) {
    const [grid, setGrid] = useState( createGrid() );
    const [pNext, setNext] = useState( true );
    const [gameState, setGame] = useState(0);


    function makeMove(i, g, p) {
      if (g[i][0] || gameOver(g)) {
        console.log("col full");
        
        return;
      }
      let gridCopy = [];
      for (let j = 0; j < g.length; j++)
        gridCopy[j] = g[j].slice();


      let row = 6;
      for( let j = 0; j < 6; j++) {
        if(gridCopy[i][j]) {
          row = j;
          break;
        }
      }
      gridCopy[i][row-1] = p ? 1 : -1;
      
      console.log("move at" + i + row);
      setGrid(gridCopy);
      setGame(gameOver(gridCopy));
      return gridCopy;
    }

    function handleClick(i) {
      if( gameState === 0 && pNext) {
        setNext(false);
        let nGrid = makeMove(i, grid, true);
        let move = aiMove(nGrid);
        makeMove(move, nGrid, false);
        setNext(true);

      }
    }
    
    function handleResetClick(e) {
      e.preventDefault();
      setGrid(createGrid());
      setGame(0);
      setNext(true);
    }

    return (
      <div className={"background"}>
      <div className={"connect-four"}>
        <div className={"header"}>
          <h1>Connect Four AI</h1>
          <h2>made by jannis becketepe and timon kobusch.</h2>
        </div>
        <div className={"menu"}>
          <p>{pNext ? 'Your turn. Click a column.' : 'Computers turn'}</p>
          <p>{gameState === 1 ? 'You won' : gameState === -1 ? 'The Computer won' : ''}</p>
          <button className="restart-button" onClick={handleResetClick}>restart</button>
        </div>
        <Board 
            grid={grid}
            onClick={i => handleClick(i)}
        />
      </div>
      </div>
    );
}

function createGrid() {
    let x = new Array(7);
    for(let i = 0; i < x.length; i++) {
      x[i] = new Array(6).fill(null);
    }
    return x;
}

function checkFields(a, b, c, d) {
  if (a && a === b && b === c && c === d) {
    return a;
  }
  return null;
}

function gameOver(grid) {
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
  return 0;
}
