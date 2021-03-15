import '../style/connectFour.css';
import { useState } from 'react';
import { aiMove , isGameOver} from './logic';

// npm run deploy
// npm start

function Cell(props) {
  let classname;
  if (props.value === 1) classname = 'p1';
  else if (props.value === -1) classname = 'p2';

  return (
      <div>
        <div className={'cell'}><div className={classname}></div>
      </div></div>
        
  )
}

function Board(props) {
  return (
      <div className={"board"}>
          {props.grid.map((col, i) => 
              <div className={"column-box"} key ={"col" + i}>
                <div key={i} id={`col-${i}`} className={"col"} >
                    {col.map((value, j) => <Cell key={j} value={value}/>)}
                </div>
                <div key={i+"rand"} className={"col-border"} 
                  onClick={() => props.onClick(i)}
                >
                  {col.map((value, j) => <div key={j} className={"cell-border"}/>)}

                </div>
              </div>
          )}
      </div>
  )
}


export default function ConnectFour(props) {
    const [grid, setGrid] = useState( createGrid() );
    const [pNext, setNext] = useState( true );
    const [gameState, setGame] = useState(0);
    const [gameActive, setActive] = useState(false);

    function makeMove(i, g, p) {
      if (g[i][0] || isGameOver(g)) {
        console.log("col full");
        
        return null;
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
      
      setGame(isGameOver(gridCopy));
      setGrid(gridCopy)
      return gridCopy;
    }

    async function handleClick(i) {
      if( gameActive && gameState === 0 && pNext) {
        setNext(false);
        let nGrid = makeMove(i, grid, true);
        if (!nGrid) {
          setNext(true);
          return;
        }
        //let gridCopy = [];
        //for (let j = 0; j < nGrid.length; j++)
        //  gridCopy[j] = nGrid[j].slice();
        await new Promise(r => setTimeout(r, 550));
        aiMove(nGrid).then(
            result => {
              makeMove(result, nGrid, false);
              setNext(true);
            }
        )

      }
    }
    
    function handleResetClick(e) {
      
      e.preventDefault();
      if (gameActive) {   
        setGrid(createGrid());
        setGame(0);
        setActive(false);
      }
      else {
        setActive(true);
        if (Math.random() < 0.5) {
          setNext(true);
        }
        else {
          setNext(false);
          makeMove(3, createGrid(), false);
          setNext(true);
        }
      }
    }

    return (
      <div className={"background"}>
        <div className={"connect-four"}>
          <div className={"header"}>
            <h1>CONNECT FOUR AI</h1>
            <h2>made by jannis becketepe and timon kobusch.</h2>
          </div>
          <div className={"menu"}>
            <button className="game-button" onClick={handleResetClick}>{gameActive ? 'reset' : 'start game'}</button>
            {gameActive && gameState===0 && !pNext && <div className="load"></div>}
            <p>{gameActive && gameState === 0 ? pNext ? 'your turn. click a column.' : 'the computer is thinking.' : ''}</p>
            <p>{gameState === 1 ? 'you won!' : gameState === -1 ? 'the computer won.' : ''}</p>
          </div>
          <Board 
              grid={grid}
              onClick={i => handleClick(i)}
          />
          <div className={"log-switch"}>
            <label className={"switch"}>
              <input type="checkbox"/>
              <span className={"slider round"}></span>
            </label>
          </div>
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
