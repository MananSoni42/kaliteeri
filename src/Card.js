import testCard from './assets/cards/row-1-column-1.png';

function Card() {
    return (
        <div className="p-1 m-1">
            <img className="img-fluid" src={testCard} alt="Card"/> 
        </div>
    );
}

export default Card;
