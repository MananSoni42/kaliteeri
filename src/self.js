import Card from "./Card";

function Self() {
    return (
        <div className="row m-1 mt-5">
            <div className="col-2">
                <div className="row my-2">
                    <div className="col-4"></div>
                    <div className="col-4">
                        <button className="btn btn-primary"> Play </button>
                    </div>
                    <div className="col-4"></div>
                </div>
                <div className="row my-2">
                    <div className="col-4"></div>
                    <div className="col-4">
                        <button className="btn btn-primary"> Bid </button>
                    </div>
                    <div className="col-4"></div>
                </div>
                <div className="row my-2">
                    <div className="col-4"></div>
                    <div className="col-4">
                        <button className="btn btn-primary"> Fold </button>
                    </div>
                    <div className="col-4"></div>
                </div>
            </div>
            <div className="col-1"> <Card></Card> </div>
            <div className="col-1"> <Card></Card> </div>
            <div className="col-1"> <Card></Card> </div>
            <div className="col-1"> <Card></Card> </div>
            <div className="col-1"> <Card></Card> </div>
            <div className="col-1"> <Card></Card> </div>
            <div className="col-1"> <Card></Card> </div>
            <div className="col-1"> <Card></Card> </div>
            <div className="col-1"> <Card></Card> </div>
            <div className="col-1"> <Card></Card> </div>
        </div>
    );
}

export default Self;