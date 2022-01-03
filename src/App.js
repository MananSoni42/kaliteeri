import './App.css';
import Chat from './Chat.js'
import Table from './Table.js'
import BiddingTable from './bid';
import Self from './self';
import React, { useState } from 'react';
import Start from './start';

function App() {
  const [start,setStart] = useState(false);
  const [bid,setBid] = useState(true);

  if (start) {
    return (
      <div className="App">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <Start start={setStart} bid={setBid}></Start>
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
        <div className="row">
            <div className="col-12">
              {bid?<BiddingTable></BiddingTable>:<Table></Table>}
            </div>
        </div>
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
