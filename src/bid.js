import { useEffect, useState } from 'react/cjs/react.development';
import Card from './Card.js';
import { useGlobalContext } from './Context';

function BiddingTable() {
    const { name, bid, bidder, socket } = useGlobalContext();
    const [cards, setCards] = useState([]);
    const [trump, setTrump] = useState(0);
    const tc = ['Not decided', 'Hearts', 'Spades', 'Diamonds', 'Clubs'];

    useEffect(() => {
        socket.emit('startGame', {name: name});
    }, [])

    socket.on('round', (data) => {
        console.log(data)
        setCards(data.cards);
        setTrump(data.trump)
    })

    return (
        <div>
            <div className="row m-1">
                <div className="col-6">
                    <div className="row">
                        <div className="col-12 fs-3">
                            Current Bidder: {bidder}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 fs-3">
                            Current Bid: {bid}
                        </div>
                    </div>
                </div>
                <div className="col-2 fs-3 text-light"> Trump: {tc[trump]} </div>
                { cards.map((card) => {
                    return <div className="col-2 fs-5" key={card}> <Card num={card}></Card> </div>
                }) }
            </div>
        </div>
    );
}

export default BiddingTable;