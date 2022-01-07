import React, { useState, useEffect } from "react";
import Player from './Player.js';
import { useGlobalContext } from './Context';


function Table() {
    const { name, socket, setMode } = useGlobalContext();
    const [roundOffset, setRoundOffset] = useState(0);
    const [players, setPlayers] = useState([]);
    const [colors, setColors] = useState([]);
    const [roundCards, setRoundCards] = useState([]);
    const [turn, setTurn] = useState(0);
    const [pts, setPts] = useState([]);

    useEffect(() => {
        socket.emit('getRound', {})
        socket.emit('getPlayer', {})
    }, []);

    socket.on('changePlayer', (data) => {
        setColors(data.colors)
    })

    socket.on('end', async (data) => {
        await new Promise(r => setTimeout(r, 1500));    
        setMode(100)
    })

    socket.on('newRound', async (data) => {
        await new Promise(r => setTimeout(r, 1500));    
        setMode(data.round);
        setPlayers(data.players);
        setRoundOffset(data.round_offset);

        setRoundCards(data.round_cards);
        setTurn(data.turn);
        setPts(data.points)
    })

    socket.on('newTurn', (data) => {
        setTurn(data.turn);
        setRoundCards(data.round_cards);
    })

    return (
        <div>
            <div className="row px-3">
                <div className="col-2"></div>
                { players.map((player, index) => {
                    return (
                        <div className="col-1 mx-3 p-2" key={index}>
                            <Player 
                            name={player} 
                            color={colors[index]} 
                            info={'true'} 
                            turn={((players.length+index-roundOffset)%players.length)!=turn}
                            card={roundCards[index]} 
                            pt={pts[index]}></Player>
                        </div>
                )})}
                <div className="col-2"></div>
            </div>
        </div>
    );
}

export default Table;