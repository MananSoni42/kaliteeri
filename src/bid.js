import Card from './Card.js';

function BiddingTable() {
    return (
        <div>
            <div className="row m-5">
                <div className="col-4 fs-5"> Current Bidder: Manan </div>
                <div className="col-4 fs-5"> Current Bid: 125 </div>
                <div className="col-2 fs-5"> <Card num={0}></Card> </div>
                <div className="col-2 fs-5"> <Card num={0}></Card> </div>
            </div>
        </div>
    );
}

export default BiddingTable;