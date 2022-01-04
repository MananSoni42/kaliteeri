import { useState } from "react";
import Card from "./Card";
import { useGlobalContext } from './Context';

function Self() {
    const { cards, bid, name, socket, players } = useGlobalContext();
    const n = players.length;
    const num_teammates = n<=5?[1]:[1,2]
    console.log(n)

    const [endBid, setEndBid] = useState(false);
    const [trump, setTrump] = useState(['2']);
    const [suit, setSuit] = useState(n<=5?['1-2']:['1-2', '2-2']);
    const [val, setVal] = useState(n<=5?['1-2']:['1-2', '2-2']);

    socket.on('endBid', (data) => {
        if (data.bidder == name) {
          setEndBid(true);
        }
    })

    socket.on('bidError', (data) => {
        console.log('errr')
        alert('You are the highest bidder, you can\'t Fold');
    })    

    function fbid() {
        socket.emit('bid', {
            name: name,
            bid: bid+5
        })
    }

    function fold() {
        socket.emit('fold', {
            name: name
        })
    }

    function logTrump(e) {
        setTrump([...trump, e])
    }

    function logSuit(e) {
        setSuit([...suit, e])
    }

    function logVal(e) {
        setVal([...val, e])
    }

    if (endBid) {
        return (
            <div className="row m-1 mt-2">
                <div className="col-2">
                    <form>
                        { num_teammates.map((num) => {
                            return (
                            <div>
                                <div className="row">
                                    <div className="mb-3 col-6">
                                        <label className="form-label"> {`Suit - ${num}`}  </label>
                                        <select class="form-select" aria-label="Default select example"
                                        onChange={(e) => { logSuit(e.target.value) }}>
                                            <option value={`${num}-1`}>Hearts</option>
                                            <option value={`${num}-2`} selected>Spades</option>
                                            <option value={`${num}-3`}>Diamonds</option>
                                            <option value={`${num}-4`}>Clubs</option>
                                        </select>                                
                                    </div>
                                    <div className="mb-3 col-6">
                                        <label className="form-label"> {`Value - ${num}`}  </label>
                                        <select class="form-select" aria-label="Default select example"
                                        onChange={(e) => { logVal(e.target.value) }}>
                                            <option value={`${num}-2`} selected>2</option>
                                            <option value={`${num}-3`}>3</option>
                                            <option value={`${num}-4`}>4</option>
                                            <option value={`${num}-5`}>5</option>
                                            <option value={`${num}-6`}>6</option>
                                            <option value={`${num}-7`}>7</option>
                                            <option value={`${num}-8`}>8</option>
                                            <option value={`${num}-9`}>9</option>
                                            <option value={`${num}-10`}>10</option>
                                            <option value={`${num}-11`}>J</option>
                                            <option value={`${num}-12`}>Q</option>
                                            <option value={`${num}-13`}>K</option>
                                            <option value={`${num}-1`}>A</option>
                                        </select>                                
                                    </div>
                                </div>
                            </div>
                            );
                        })}
                        <div className="row">
                            <div className="mb-3 col-6">
                                <label className="form-label"> Trump  </label>
                                <select class="form-select" aria-label="Default select example"
                                onChange={(e) => { logTrump(e.target.value) }}>
                                    <option value="1">Hearts</option>
                                    <option value="2" selected>Spades</option>
                                    <option value="3">Diamonds</option>
                                    <option value="4">Clubs</option>
                                </select>                                
                            </div>
                        </div>

                        <button className="btn btn-primary"
                            onClick = {async (e) => {
                                e.preventDefault(); 
                                socket.emit('bidComplete', {
                                    name: name,
                                    trump: trump,
                                    suit: suit,
                                    val: val
                                })
                        }}> 
                        Submit </button>
                    </form>                    
                </div>
                {cards.map((card,index) => {
                    return <div className="col-1" key={index}> <Card num={card}></Card> </div>
                })}
            </div>
        );        
    } else {
        return (
            <div className="row m-1 mt-2">
                <div className="col-2">
                    <div className="row my-2">
                        <div className="col-4"></div>
                        <div className="col-4">
                            <button className="btn btn-warning"> Play </button>
                        </div>
                        <div className="col-4"></div>
                    </div>
                    <div className="row my-2">
                        <div className="col-4"></div>
                        <div className="col-4">
                            <button className="btn btn-primary" onClick={() => { fbid() }}> Bid </button>
                        </div>
                        <div className="col-4"></div>
                    </div>
                    <div className="row my-2">
                        <div className="col-4"></div>
                        <div className="col-4">
                            <button className="btn btn-danger" onClick={() => { fold() }}> Fold </button>
                        </div>
                        <div className="col-4"></div>
                    </div>
                </div>
                {cards.slice(0,10).map((card,index) => {
                    return <div className="col-1" key={index}> <Card num={card}></Card> </div>
                })}
            </div>
        );
    }
}

export default Self;