const cardMap = require('./cards.json');

function Card({num}) {
    return (
        <div className="p-1 m-1">
            <img className="img-fluid" src={cardMap[num]['img']} alt={`Card-${num}`}/> 
        </div>
    );
}

export default Card;
