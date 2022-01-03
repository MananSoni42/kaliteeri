import Card from './Card.js';

function Player({name,info}) {
    if (info) {
        return (
            <div>
                <div className="row">
                    <div className="col-12">
                        <img src="/user.png" alt="name" className="img-fluid"/>
                        <div className="fs-5"> {name}] </div>
                        <div className="fs-7"> Haath:  0</div>
                        <div className="fs-7"> Points: 0 </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 border border-dark">
                        <Card num={0}></Card>
                    </div>
                </div>
            </div>
            );        
    } else {
        return (
            <div>
                <div className="row">
                    <div className="col-12">
                        <img src="/user.png" alt="name" className="img-fluid"/>
                        <div className="fs-5"> {name} </div>
                    </div>
                </div>
            </div>
            );        
    }
}
export default Player;