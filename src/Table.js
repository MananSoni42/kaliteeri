import Card from './Card.js';
import Player from './Player.js';
import photo from './assets/user.png';

function Table() {
    return (
        <div>
            <div className="row px-3">
                <div className="col-2"></div>
                <div className="col-1 mx-3 p-2">
                    <Player name="Manan"></Player>
                </div>
                <div className="col-1 mx-3 p-2">
                    <Player name="Akshay"></Player>
                </div>
                <div className="col-1 mx-3 p-2">
                    <Player name="Harsh"></Player>
                </div>
                <div className="col-1 mx-3 p-2">
                    <Player name="Ridd"></Player>
                </div>
                <div className="col-1 mx-3 p-2">
                    <Player name="Peti"></Player>
                </div>
                <div className="col-2"></div>
            </div>
        </div>
    );
}

export default Table;