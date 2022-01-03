import { useEffect } from 'react/cjs/react.development';
import Card from './Card.js';
import { useGlobalContext } from './Context';

function BiddingTable() {
    const { bid, bidder, socket } = useGlobalContext();

    useEffect(() => {
        socket.emit('startGame', {});
    }, [])

    return (
        <div>
            <div className="row m-1">
                <div className="col-4 fs-5"> Current Bidder: {bidder} </div>
                <div className="col-4 fs-5"> Current Bid: {bid} </div>
                <div className="col-2 fs-5"> <Card num={0}></Card> </div>
                <div className="col-2 fs-5"> <Card num={0}></Card> </div>
            </div>
        </div>
    );
}

export default BiddingTable;