import Card from './Card.js';
import Player from './Player.js';

function Table() {
    return (
        <div>
            <div className="row px-3">
                <div className="col-2"></div>
                <div className="col-1 mx-3 p-2">
                    <Player name={'Manan'} info={'true'}></Player>
                </div>
                <div className="col-1 mx-3 p-2">
                    <Player name={'Akshay'} info={'true'}></Player>
                </div>
                <div className="col-1 mx-3 p-2">
                    <Player name={'Harsh'} info={'true'}></Player>
                </div>
                <div className="col-1 mx-3 p-2">
                    <Player name={'Ridd'} info={'true'}></Player>
                </div>
                <div className="col-1 mx-3 p-2">
                    <Player name={'Golu'} info={'true'}></Player>
                </div>
                <div className="col-1 mx-3 p-2">
                    <Player name={'Peti'} info={'true'}></Player>
                </div>
                <div className="col-1 mx-3 p-2">
                    <Player name={'Sidd'} info={'true'}></Player>
                </div>
                <div className="col-2"></div>
            </div>
        </div>
    );
}

export default Table;