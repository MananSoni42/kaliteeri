import Player from "./Player";
import { useState } from "react/cjs/react.development";
import Card from "./Card";
import { useGlobalContext } from './Context';

function Start() {
    const [name,setName1] = useState('');
    const [color, setColor] = useState('black');
    const [players, setPlayers] = useState([]);
    const [colors, setColors] = useState([]);
    const { socket, resetGame, setName, setMode } = useGlobalContext();
    
    socket.on('changePlayer', (data) => {
        setPlayers(data.players);
        setColors(data.colors)
    })

    socket.on('setInitialData', (data) => {
        setPlayers(data.players);
        setColors(data.colors);
      })
    
    return (
        <div>
            <div className="row mb-5 bg-dark text-light text-center">
                <div className="col-1">
                    <Card num={16}></Card>
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
                                resetGame()
                            }}> Reset </button>
                        </div>
                        <div className="col-6 text-center">
                            <button className="btn btn-warning" onClick={() => 
                                { 
                                    setMode(2);
                                    socket.emit('setMode', {mode: 2})
                                }
                            }
                                > 
                                Start Game
                            </button>
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
                                        <input type="text" className="form-control" id="name" onChange={(e) => { setName1(e.target.value) }}></input>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label"> Color </label>
                                        <select class="form-select"
                                        onChange={(e) => { 
                                            setColor(e.target.value);
                                        }}>
                                            <option value='black' selected  > Black  </option>
                                            <option value='brown'> Brown  </option>
                                            <option value='cyan'> Cyan   </option>
                                            <option value='gray'> Gray   </option>
                                            <option value='green'> Green  </option>
                                            <option value='purple'> Purple </option>
                                            <option value='red'> Red    </option>
                                            <option value='white'> White  </option>
                                            <option value='yellow'> Yellow </option>
                                        </select>                                
                                    </div>
                                    <button className="btn btn-primary" 
                                        onClick = {async (e) => {
                                            e.preventDefault(); 
                                            localStorage.setItem('name', name);
                                            setName(name);
                                            socket.emit('addPlayer', {name: name, color: color})
                                    }}> 
                                    Register </button>
                                </form>                
                            </div>
                    </div>
                </div>
                <div className="col-8 p-1 border border-dark">
                    <div className="row">
                        { players && players.map((player,index) => {
                            return <div key={index} className="col-2 fs-8"> <Player name={player} color={colors[index]} info={false}></Player> </div>
                        })}                        
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Start;