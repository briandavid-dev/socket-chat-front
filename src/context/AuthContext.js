import React, { createContext, useCallback, useContext, useState } from "react";
import { fetchConToken, fetchSinToken } from "../helpers/fetch";
import { types } from "../types/types";
import { ChatContext } from "./chat/ChatContext";

export const AuthContext = createContext();

const initialState = {
  uid: null,
  checking: true,
  logged: false,
  name: null,
  email: null,
};

export const AuthProvider = (props) => {
  const { children } = props;

  const [auth, setAuth] = useState(initialState);
  const { dispatch } = useContext(ChatContext);

  const login = async (email, password) => {
    const resp = await fetchSinToken("login", { email, password }, "POST");
    if (resp.ok) {
      localStorage.setItem("token", resp.token);

      const { usuario } = resp;

      setAuth({
        uid: usuario.uid,
        checking: false,
        logged: true,
        name: usuario.nombre,
        email: usuario.email,
      });

      console.log("Autenticado!");
    }

    return resp.ok;
  };

  const register = async (nombre, email, password) => {
    const resp = await fetchSinToken(
      "login/new",
      { nombre, email, password },
      "POST"
    );
    if (resp.ok) {
      localStorage.setItem("token", resp.token);

      const { usuario } = resp;

      setAuth({
        uid: usuario.uid,
        checking: false,
        logged: true,
        name: usuario.nombre,
        email: usuario.email,
      });

      console.log("Autenticado!");
      return true;
    }

    return resp;
  };

  const verificaToken = useCallback(async () => {
    const token = localStorage.getItem("token");

    // si el token no existe
    if (!token) {
      setAuth({
        uid: null,
        checking: false,
        logged: false,
        name: null,
        email: null,
      });
      return false;
    }

    // si el token existe, debo hacer una consulta al backend a ver
    // si el token aun está activo
    const resp = await fetchConToken("login/renew");
    if (resp.ok) {
      localStorage.setItem("token", resp.token);

      const { usuario } = resp;

      setAuth({
        uid: usuario.uid,
        checking: false,
        logged: true,
        name: usuario.nombre,
        email: usuario.email,
      });

      console.log("Autenticado!");
      return true;
    } else {
      setAuth({
        uid: null,
        checking: false,
        logged: false,
        name: null,
        email: null,
      });
      return false;
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setAuth({
      checking: false,
      logged: false,
    });

    dispatch({
      type: types.limpiarState,
      payload: {
        uid: "",
        chatActivo: null,
        usuarios: [],
        mensajes: [],
      },
    });
  };

  return (
    <AuthContext.Provider
      value={{ auth, login, register, verificaToken, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
