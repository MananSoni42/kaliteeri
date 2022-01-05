import './App.css';
import Table from './Table.js'
import BiddingTable from './bid';
import Self from './self';
import React, { useState, useEffect } from 'react';
import Start from './start';
import Card from './Card';
import { useGlobalContext } from './Context';

function App() {
  const { socket, mode, round } = useGlobalContext();
  console.log(mode, round);

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
  else {
    return (
      <div className="App">
        <div className="container-fluid">
          <div className="row bg-dark text-light text-center">
            <div className="col-1">
              <Card num={16}></Card>
            </div>
            <div className="col-10 my-auto">
              <div className="fs-1"> {mode===2?'Bidding':`Round-${round}`} </div>
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
  }
}

export default App;
