import './App.css';
import Table from './Table.js'
import BiddingTable from './bid';
import Self from './self';
import React, { useState } from 'react';
import Start from './start';
import Card from './Card';
function App() {
  const [start,setStart] = useState(false);
  const [bid,setBid] = useState(false);

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
          <div className="row bg-dark text-light text-center">
            <div className="col-1">
              <Card num={15}></Card>
            </div>
            <div className="col-10 my-auto">
              <div className="fs-1"> {`Kaali Teeri: ${bid?'Bidding':'Round - 3'}`} </div>
            </div>
          </div>
          <div className="row">
              <div className="col-12">
                {bid?<BiddingTable></BiddingTable>:<Table></Table>}
              </div>
          </div>
          <hr class="my-4"></hr>        
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
