import Player from "./Player";
import axios from "axios";
import { useState } from "react/cjs/react.development";
import { useEffect } from "react";
import Card from "./Card";

function Start({start,bid}) {
    const [name,setName] = useState('');
    const [players, setPlayers] = useState([]);

    function getPlayers() {
        axios.get('/startShow')
        .then((data) => { console.log(data); setPlayers(data['data']['players']); })
        .catch((e) => { console.log('Error in useffect'); console.log(e) })
    }

    useEffect(() => {
        getPlayers()
    }, []);

    return (
        <div>
            <div className="row mb-5 bg-dark text-light text-center">
                <div className="col-1">
                    <Card num={15}></Card>
                </div>
                <div className="col-10 my-auto">
                    <div className="fs-1"> Kaali Teeri </div>
                </div>
            </div>
            <div className="row">
                <div className="col-4">
                    <div className="row">
                        <div className="col-6 text-center">
                            <button className="btn btn-danger" onClick={() => { 
                                start(true); 
                                bid(true); 
                                axios.get('/reset');
                                window.location.reload();
                            }}> Reset </button>
                        </div>
                        <div className="col-6 text-center">
                            <button className="btn btn-warning" onClick={() => { start(false) }}> Start Game</button>
                        </div>
                    </div>      
                    <div className="row m-5 ">
                            <div className="col-12 border border-dark m-3 p-3">
                                <form>
                                    <div className="mb-3">
                                        <label className="text-dark fs-4"> Enter details </label>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Name</label>
                                        <input type="text" className="form-control" id="name" onInput={(e) => { setName(e.target.value) }}></input>
                                    </div>
                                    <button type="submit" className="btn btn-primary" 
                                        onClick = {async (e) => {
                                            e.preventDefault(); 
                                            
                                            axios.post('/add', {'name': name }) 
                                            .then(() => { 
                                                console.log('Done'); 
                                                getPlayers(); 
                                                alert('Registered');
                                                window.location.reload();
                                            })
                                            .catch((e) => console.log(e));
                                    }}> 
                                    Register </button>
                                </form>                
                            </div>
                    </div>
                </div>
                <div className="col-8 p-1 border border-dark">
                    <div className="row">
                        { players && players.map((player,index) => {
                            return <div key={index} className="col-2 fs-8"> <Player name={player} info={false}></Player> </div>
                        })}                        
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Start;