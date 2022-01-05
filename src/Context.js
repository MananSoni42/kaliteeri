import React, { useContext, useState } from "react";
import { useEffect } from "react/cjs/react.development";
import { io } from "socket.io-client";

const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const socket = io('ws://localhost:5000');
  const [cards, setCards] = useState([]);
  const [mode, setMode] = useState(1);
  const [name, setName] = useState('');

  useEffect(() => {
    console.log('hi2');
    socket.emit('getInitialData', {name:name?name:''})
  }, [])

  socket.on('setInitialData', (data) => {
    //console.log(window.localStorage.getItem('name'), data);
    console.log('si')
    console.log(data.name, data);
    setName(data.name)
    setCards(data.cards);
    setMode(data.mode);
  })

  socket.on('getGame', (data) => {
    console.log('c', name)
    setCards(data.cards[name]);
    setMode(data.mode);
  })

  socket.on('getMode', (data) => {
    setMode(data.mode);
  })
  
  function resetGame() {
    setCards([]);
    setMode(1);
    socket.emit('reset', {})
  }

  return (
    <AppContext.Provider
      value={{
        socket, resetGame,
        cards, setCards,
        mode, setMode,
        name, setName,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => useContext(AppContext);
