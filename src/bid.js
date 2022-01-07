import { useEffect, useState } from 'react/cjs/react.development';
import Card from './Card.js';
import { useGlobalContext } from './Context';

function BiddingTable() {
    const { name, socket, mode, setMode } = useGlobalContext();
    const [bid, setBid] = useState(100);
    const [bidder, setBidder] = useState('None');
    const [bidders, setBidders] = useState([]);
    const [tcards, settCards] = useState([]);
    const [trump, setTrump] = useState(0);
    const tc = ['Not decided', 'Hearts', 'Spades', 'Diamonds', 'Clubs'];

    useEffect(() => {
        socket.emit('getBidder', {})
        socket.emit('getPlayers', {})
    }, [])

    socket.on('setBidder', (data) => {
        setBidder(data.bidder);
    })

    socket.on('newBid', (data) => {
        setBid(data.bid);
        setBidder(data.bidder);
    })

    useEffect(() => {
        socket.emit('startGame', {name: name});
    }, [])

    socket.on('changePlayer', (data) => {
        setBidders(data.players)
    });

    socket.on('round', async (data) => {
        console.log(data)
        settCards(data.cards);
        setTrump(data.trump)
        await new Promise(r => setTimeout(r, 5000));
        setMode(3)
    })

    socket.on('newBidders', (data) => {
        console.log('nb', data)
        setBidders(data.bidders)
    })

    return (
        <div>
            <div className="row m-1">
                <div className="col-6">
                    <div className="row">
                        <div className="col-12 fs-4">
                            Current Bidder: {bidder}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 fs-4">
                            Current Bid: {bid}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 fs-6 text-wrap">
                            Bidders: {bidders.map((bidder) => { return bidder + ', ' })}
                        </div>
                    </div>
                </div>
                <div className="col-2 fs-3 text-light"> Trump: {tc[trump]} </div>
                { tcards.map((card) => {
                    return <div className="col-2 fs-5" key={card}> <Card num={card}></Card> </div>
                }) }
            </div>
        </div>
    );
}

export default BiddingTable;