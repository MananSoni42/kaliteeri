import Card from "./Card";
import { useGlobalContext } from './Context';

function Self() {
    const { cards } = useGlobalContext();
    console.log(cards);

    return (
        <div className="row m-1 mt-2">
            <div className="col-2">
                <div className="row my-2">
                    <div className="col-4"></div>
                    <div className="col-4">
                        <button className="btn btn-warning"> Play </button>
                    </div>
                    <div className="col-4"></div>
                </div>
                <div className="row my-2">
                    <div className="col-4"></div>
                    <div className="col-4">
                        <div className="btn-group">
                        <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                            Bid
                        </button>
                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item" href="#">Action</a></li>
                            <li><a className="dropdown-item" href="#">Another action</a></li>
                            <li><a className="dropdown-item" href="#">Something else here</a></li>
                        </ul>
                        </div>                        
                    </div>
                    <div className="col-4"></div>
                </div>
                <div className="row my-2">
                    <div className="col-4"></div>
                    <div className="col-4">
                        <button className="btn btn-danger"> Fold </button>
                    </div>
                    <div className="col-4"></div>
                </div>
            </div>
            {cards.map((card,index) => {
                return <div className="col-1" key={index}> <Card num={card}></Card> </div>
            })}
        </div>
    );
}

export default Self;