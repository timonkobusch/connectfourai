import '../style/connectFour.css';
import { useState } from 'react';
import { aiMove , isGameOver} from './logic';
import MetaTags from 'react-meta-tags';

// npm run deploy
// npm start

function Cell(props) {
  let classname;
  if (props.value === 1) classname = 'p1';
  else if (props.value === -1) classname = 'p2';

  return (
      <div>
        <div className={'cell'}><div className={classname}></div></div>
      </div>
        
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

function State(props) {
  let text ='';
  const s = props.state
  
  if (s ===  1) text = 'you have won! this must be a bug...';
  if (s === -1) text = 'the computer has won.';
  if (s ===  2) text = 'the game is a draw.';
  if (s ===  0)  text = props.pnext ? 'your turn. click a column.' : 'the computer is thinking.';

  return <p>{text}</p>
}

function Menu(props) {
  const active = props.active;
  const state = props.state;
  const pnext = props.pNext;
  const click = props.click;

  let load = null;
  if (active && state === 0 && !pnext)
    load = <div className="load"></div>;

  return (<div className={"menu"}>
              <button className="game-button" onClick={click}>{active ? 'reset' : 'start game'}</button>
              {load}
              <State state={state} pnext ={pnext}/>
          </div>)
}

function Log(props) {
  if (props.show) {
    return (<div className={"log"}>
              <p>{props.log}</p>
            </div>)
  }
  else return null;
}

export default function ConnectFour(props) {
    const [grid, setGrid] = useState( createGrid() );
    const [pNext, setNext] = useState( true ); // is player Next
    const [gameState, setGame] = useState(0); // 0 == not decided, 1 / -1 win for Player/Computer, 2 == draw
    const [gameActive, setActive] = useState(false); // game "activated" by button?
    const [showLog, setShowLog] = useState(false);
    const [log, setLog] = useState('>');
    const [movecount, setCount] = useState(1);

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
        let newGrid = makeMove(i, grid, true);
        if (!newGrid) {
          setNext(true);
          return;
        }
        await new Promise(r => setTimeout(r, 550));
        aiMove(newGrid).then(
            result => {
              //result[0] == the calculated move column, [1] == log text
              makeMove(result[0], newGrid, false);
              setLog("> move: " + movecount + result[1]);
              setCount(movecount + 1);
              setNext(true);
            }
        )

      }
    }
    
    function handleLogClick() {
      if (showLog) console.log("log deactivated");
      else console.log("log activated");
      setShowLog(!showLog);
    }

    function handleResetClick() {
      
      if (gameActive) {   
        setGrid(createGrid());
        setGame(0);
        setActive(false);
        setCount(0);
        setLog('');
      }
      else {
        setActive(true);
        if (Math.random() < 0.5) {
          setNext(true);
        }
        else {
          setNext(false);
          makeMove(3, createGrid(), false);
          setLog("> move: 1 | no moves to analyze");
          setCount(2);
          setNext(true);
        }
      }
    }


    return (
        <div className={"connect-four"}>
          <MetaTags>
            <title>Connect 4 AI</title>
            <meta name="description" content="Try to beat the computer in Connect Four!" />
          </MetaTags>
          <div className={"header"}>
            <h1>CONNECT FOUR AI</h1>
            <h2>made by jannis becktepe and timon kobusch.</h2>
          </div>
         
          <Menu
            active ={gameActive}
            state = {gameState}
            pNext = {pNext}
            click = {() => handleResetClick()}
          />
            
          <Board 
              grid={grid}
              onClick={i => handleClick(i)}
          />
          <div className={"log-switch"} >
            <label className={"switch"}>
              <input type="checkbox" onClick={() => handleLogClick()}/>
              <span className={"slider round"}></span>
            </label>
            <p>show stats</p>
          </div>
          <Log show={showLog} log={log}/>
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