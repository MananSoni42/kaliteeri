import React, { useContext, useState } from "react";
import { useEffect } from "react/cjs/react.development";
import { io } from "socket.io-client";

const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const socket = io('ws://localhost:5000');
  const [players, setPlayers] = useState([]);
  const [cards, setCards] = useState([]);
  const [bid, setBid] = useState(100);
  const [bidder, setBidder] = useState('');
  const [trump, setTrump] = useState(0);
  const [turn, setTurn] = useState(0);
  const [round, setRound] = useState(0);
  const [mode, setMode] = useState(1);
  const [name, setName] = useState('');

  useEffect(() => {
    console.log('hi2');
    //socket.emit('getInitialData', {name: localStorage.getItem('name')?localStorage.getItem('name'):''})
    socket.emit('getInitialData', {name:name?name:''})
  }, [])

  socket.on('setInitialData', (data) => {
    //console.log(window.localStorage.getItem('name'), data);
    console.log('si')
    console.log(data.name, data);
    setName(data.name)
    setPlayers(data.players);
    setCards(data.cards);
    setBid(data.bid);
    setBidder(data.bidder);
    setTrump(data.trump);
    setTurn(data.turn);
    setRound(data.round);
    setMode(data.mode);
  })

  socket.on('getGame', (data) => {
    console.log('gg')
    console.log(data.name, data);
    setName(data.name)
    setPlayers(data.players);
    //setCards(data.cards[localStorage.getItem('name')]);
    setCards(data.cards[data.name]);
    setBid(data.bid);
    setBidder(data.bidder);
    setTrump(data.trump);
    setTurn(data.turn);
    setRound(data.round);
    setMode(data.mode);
  })

  socket.on('changePlayer', (players) => {
    console.log('get', players)
    setPlayers(players)
  }) 

  socket.on('newBid', (data) => {
    setBid(data.bid);
    setBidder(data.bidder)
  }) 
  socket.on('getMode', (data) => {
    setMode(data.mode);
  })

  function resetGame() {
    setPlayers([]);
    setCards({});
    setBid(100);
    setBidder('');
    setMode(1);
    setTrump(0);
    setRound(0);
    setTurn(0);
    socket.emit('reset', {})
  }

  return (
    <AppContext.Provider
      value={{
        socket, resetGame,
        cards, setCards,
        bid, setBid,
        bidder, setBidder,
        trump, setTrump,
        players, setPlayers,
        round, setRound,
        turn, setTurn,
        mode, setMode,
        name, setName,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => useContext(AppContext);
