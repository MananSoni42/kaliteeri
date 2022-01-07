import './App.css';
import Table from './Table.js'
import BiddingTable from './bid';
import Self from './self';
import React, { useState, useEffect } from 'react';
import Start from './start';
import Card from './Card';
import { useGlobalContext } from './Context';
import Win from './win'

function App() {
  const { socket, mode, name, resetGame } = useGlobalContext();
  const tc = ['Not decided', 'Hearts', 'Spades', 'Diamonds', 'Clubs'];
  const [trump, setTrump] = useState(0);

  socket.on('newRound', (data) => {
    setTrump(data.trump)
  })


  if (mode === 1) {
    return (
      <div className="App">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <Start></Start>
            </div>
          </div>
        </div>
      </div>
    );
  }
  else if (mode < 100) {
    return (
      <div className="App">
        <div className="container-fluid">
          <div className="row bg-dark text-light text-center">
            <div className="col-1">
              <Card num={16}></Card>
            </div>
            <div className="col-6 my-auto">
              <div className="fs-1"> {mode===2?'Bidding':mode===100?'Results':`Round ${mode-2}`} </div>
              <div className="fs-5"> {mode>=3?`Trump: ${tc[trump]}`:''} </div>
            </div>
            <div className="col-2">
              <div className="fs-1"> {name} </div>
            </div>
            <div className="col-2 m-3">
              <button className="btn btn-danger" onClick={() => { 
                resetGame()
              }}> Reset </button>
            </div>
          </div>
          <div className="row">
              <div className="col-12">
                {mode===2?<BiddingTable></BiddingTable>:<Table></Table>}
              </div>
          </div>
          <hr className="my-4"></hr>        
          <div className="row">
              <div className="col-12">
                <Self></Self>
              </div>
          </div>
        </div>
      </div>
    );  
  } else {
    return (
      <div>
        <Win></Win>
      </div>
    );
  }
}

export default App;
