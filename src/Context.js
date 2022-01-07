import React, { useContext, useState, useEffect } from "react";
import { io } from "socket.io-client";

const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const socket = io('ws://kaliteeri.herokuapp.com');
  const [cards, setCards] = useState([]);
  const [mode, setMode] = useState(1);
  const [name, setName] = useState('');

  useEffect(() => {
    socket.emit('getInitialData', {name:name?name:''})
  }, [])

  socket.on('setInitialData', (data) => {
    setName(data.name)
    setCards(data.cards);
    setMode(data.mode);
  })

  socket.on('getGame', (data) => {
    setCards(data.cards[name]);
    setMode(data.mode);
  })

  socket.on('newGame', (data) => {
    setCards([])
    setMode(1);
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
