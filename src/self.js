import { useEffect, useState } from "react";
import Card from "./Card";
import { useGlobalContext } from './Context';

function Self() {
    const { name, cards, socket, mode } = useGlobalContext();

    const [bid, setBid] = useState(100);
    const [bidder, setBidder] = useState('None');
    const [bidders, setBidders] = useState([]);
    const [endBid, setEndBid] = useState(false);
    const [strump, setsTrump] = useState(['2']);
    const [trump, setTrump] = useState(0);
    const [suit, setSuit] = useState(['1-2']);
    const [val, setVal] = useState(['1-2']);
    const [numTeammates, setNumTeammates] = useState([1]);
    const [selectedCard, setSelectedCard] = useState(0);
    const [roundOffset, setRoundOffset] = useState(0);
    const [roundCards, setRoundCards] = useState([]);
    const [players, setPlayers] = useState([]);
    const [turn, setTurn] = useState(0);
    const [usedCards, setUsedCards] = useState([]);

    useEffect(() => {
        socket.emit('getPlayer', {})
        socket.emit('getBidder', {})
    }, [])

    useEffect(() => {
        console.log(cards);
        console.log(new Array(cards.length).fill(false));
        setUsedCards(new Array(cards.length).fill(false));
    }, [cards])

    useEffect(() => {
        console.log('p', selectedCard);
    }, [selectedCard])

    useEffect(() => {
        socket.emit('getRound', {})
    }, []);

    socket.on('changePlayer', (data) => {
        setBidders(data.players)
        const n = data.players.length;
        if (n > 5) {
            setSuit(['1-2', '2-2'])
            setVal(['1-2', '2-2'])
            setNumTeammates([1,2]);
        }
    })

    socket.on('setBidder', (data) => {
        setBidder(data.bidder);
    })

    socket.on('newBid', (data) => {
        setBid(data.bid);
        setBidder(data.bidder)
      }) 

    socket.on('endBid', (data) => {
        if (data.bidder == name) {
          setEndBid(true);
        }
    })

    socket.on('bidError', (data) => {
        console.log('errr')
        alert('You are the highest bidder, you can\'t Fold');
    })    

    socket.on('newRound', (data) => {
        setRoundOffset(data.round_offset);
        setTurn(data.turn);
        setPlayers(data.players)
        setRoundCards(data.round_cards);
        setTrump(data.trump)
    })

    socket.on('newTurn', (data) => {
        console.log('nt', data)
        setTurn(data.turn);
        setRoundCards(data.round_cards);
    })

    socket.on('newBidders', (data) => {
        console.log('nb', data)
        setBidders(data.bidders)
    })

    useEffect(() => {
        console.log('p')
        console.log(players)
    }, [players])

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
        setsTrump([...strump, e])
    }

    function logSuit(e) {
        setSuit([...suit, e])
    }

    function logVal(e) {
        setVal([...val, e])
    }

    function validate_suit(card) {
        console.log('vs')
        
        if (turn == 0) { return true; }
        
        var reqSuit = 1 + Math.floor((roundCards[roundOffset]-1)/13);
        var currSuit = 1 + Math.floor((card-1)/13);

        console.log(turn, trump, reqSuit, currSuit)

        if (reqSuit == currSuit) { return true; }
        else {
            for (var i=0;i<cards.length;i++) {
                if ( !usedCards[i] && (Math.floor(1 + (cards[i]-1)/13) == reqSuit)) {
                    return false;
                }
            }
        }
        return true;
    }

    if (endBid && mode === 2) {
        return (
            <div className="row m-1 mt-2">
                <div className="col-2">
                    <form>
                        { numTeammates.map((num) => {
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
                                    trump: strump,
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
                            <button className='btn btn-warning'
                                disabled={(((players.length+players.indexOf(name)-roundOffset)%players.length)!=turn) || (mode < 3) }
                                onClick={async () => {
                                console.log('play')
                                console.log(selectedCard)
                                console.log(validate_suit(selectedCard))
                                if (selectedCard !== 0 && validate_suit(selectedCard)) {
                                    console.log('play', name, mode, selectedCard)
                                    setUsedCards(usedCards.map((card,index) => {
                                        return card || (cards[index]==selectedCard)
                                    }))
                                    console.log(usedCards);
                                    console.log(usedCards.map((card,index) => {
                                        return (card || (cards[index]==selectedCard))
                                    }));
                                    
                                    socket.emit('play', {
                                        name: name,
                                        round: mode,
                                        card: selectedCard   
                                    })
                                    setSelectedCard(0)
                                }
                            }}> Play </button>
                        </div>
                        <div className="col-4"></div>
                    </div>
                    <div className="row my-2">
                        <div className="col-4"></div>
                        <div className="col-4">
                            <button className="btn btn-primary" 
                            onClick={() => { fbid() }}
                            disabled={mode !== 2}
                            > Bid </button>
                        </div>
                        <div className="col-4"></div>
                    </div>
                    <div className="row my-2">
                        <div className="col-4"></div>
                        <div className="col-4">
                            <button className="btn btn-danger" 
                            onClick={() => { fold() }}
                            disabled={(bidder===name) || (mode !== 2) || (bidders.indexOf(name) == -1)}
                            > Fold </button>
                        </div>
                        <div className="col-4"></div>
                    </div>
                </div>
                {cards.map((card,index) => {
                    return (
                    <div
                        className="col-1" key={index}
                    > 
                    <Card num={card} sc={setSelectedCard} csc={selectedCard} dis={usedCards[index]}></Card> 
                    </div>)
                })}
            </div>
        );
    }
}

export default Self;