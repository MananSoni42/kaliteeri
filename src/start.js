import Player from "./Player";
import axios from "axios";
import { useState } from "react/cjs/react.development";
import { useEffect } from "react";
function Start({arg}) {
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
        <div className="m-5">
            <div className="row">
                <div className="col-4">
                    <div className="row">
                        <div className="col-12">
                            <button className="btn btn-danger" onClick={() => { arg(false) }}> Start </button>
                        </div>
                    </div>                    
                    <div className="row m-5">
                            <div className="col-3"></div>
                            <div className="col-6">
                                <form>
                                    <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                                    <input type="text" className="form-control" id="name" onInput={(e) => { setName(e.target.value) }}></input>
                                    </div>
                                    <button type="submit" className="btn btn-primary" 
                                        onClick = {async (e) => {
                                            e.preventDefault(); 
                                            
                                            axios.post('/add', {'name': name }) 
                                            .then(() => { console.log('Done'); getPlayers(); })
                                            .catch((e) => console.log(e));
                                    }}> 
                                    Register </button>
                                </form>                
                            </div>
                        <div className="col-3"></div>
                    </div>
                </div>
                <div className="col-8 p-3">
                    <div className="row">
                        { players && players.map((player,index) => {
                            return <div key={index} className="col-1"> <Player name={player} info={false}></Player> </div>
                        })}                        
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Start;