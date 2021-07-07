import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/chat/ChatContext";
import { SocketContext } from "../context/SocketContext";

const SendMessage = () => {
  const { socket } = useContext(SocketContext);
  const { auth } = useContext(AuthContext);
  const { chatState } = useContext(ChatContext);

  const [mensaje, setMensaje] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();

    if (mensaje.length === 0) return;
    setMensaje("");

    socket?.emit("mensaje-personal", {
      de: auth.uid, // UID emisor
      para: chatState.chatActivo, // UID receptor
      mensaje,
    });

    // TODO HACER EL DISPATCH DEL MENSAJE
  };
  return (
    <>
      {/* <!-- Enviar mensaje Inicio --> */}
      <form onSubmit={onSubmit}>
        <div className="type_msg row">
          <div className="input_msg_write col-sm-9">
            <input
              type="text"
              className="write_msg"
              placeholder="Mensaje..."
              value={mensaje}
              onChange={(e) => {
                setMensaje(e.target.value);
              }}
            />
          </div>
          <div className="col-sm-3 text-center">
            <button className="msg_send_btn mt-3" type="submit">
              enviar
            </button>
          </div>
        </div>
      </form>
      {/* <!-- Enviar mensaje Fin --> */}
    </>
  );
};

export default SendMessage;
