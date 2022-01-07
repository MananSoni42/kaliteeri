import { useEffect, useState } from "react";
import { useGlobalContext } from './Context';

function Win() {
    const { socket, resetGame } = useGlobalContext();
    const [st, setSt] = useState({winners: ['a', 'b'], losers: ['c', 'd'], bid: 0, pts: 0})

    useEffect(() => {
        console.log('sent-end')
        socket.emit('getResults', {})
    }, [])

    socket.on('setResults', (data) => {
        console.log('d')
        console.log(data);
        setSt(data)
    })

    return (
        <div className="text-center mb-5 p-5">
            <div className="row fs-1">
                <div className="col-10">
                    Bid: {st.bid}
                </div>
                <div className="col-2">
                    <button className="btn btn-danger" onClick={() => { 
                                    resetGame()
                                }}> Reset </button>
                </div>
            </div>
            <div className="row mt-5 text-center">
                <div className="col-6">
                    <div className="row fs-1 text-primary">
                        <div className="col-12">
                            Winners
                        </div>
                    </div>
                    { st.winners.map((player,index) => {
                        return (
                            <div className="row text-left">
                                <div className="col-12 fs-5">
                                    {player}
                                </div>
                            </div>
                        );
                    })}
                    <div className="row fs-3">
                        <div className="col-12">
                            Points: {st.pts}
                        </div>
                    </div>
                </div>
                <div className="col-6">
                <div className="row fs-1 text-danger">
                        <div className="col-12">
                            Losers
                        </div>
                    </div>
                    { st.losers.map((player,index) => {
                        return (
                            <div className="row">
                                <div className="col-12 fs-5">
                                    {player}
                                </div>
                            </div>
                        )
                    })}
                    <div className="row fs-3">
                        <div className="col-12">
                            Points: {250-st.pts}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Win;
