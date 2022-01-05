import Card from './Card.js';
import Player from './Player.js';

const players = ['manan', 'akshay', 'ridd', 'harsh', 'golu', 'kshitiz', 'inze']

function Table() {
    return (
        <div>
            <div className="row px-3">
                <div className="col-2"></div>
                { players.map((player, index) => {
                    return (
                        <div className="col-1 mx-3 p-2" key={index}>
                            <Player name={player} color={'black'}info={'true'}></Player>
                        </div>
                )})}
                <div className="col-2"></div>
            </div>
        </div>
    );
}

export default Table;