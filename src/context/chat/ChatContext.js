import React, { createContext, useReducer } from "react";
import { chatReducer } from "./chatReducer";

export const ChatContext = createContext();

const initialState = {
  uid: "",
  chatActivo: null, // UID del usuario al que yo quiero enviar mensajes
  usuarios: [], // todos los usuarios
  mensajes: [], // el chat seleccionado
};

export const ChatProvider = (props) => {
  const { children } = props;
  const [chatState, dispatch] = useReducer(chatReducer, initialState);

  return (
    <ChatContext.Provider value={{ chatState, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
