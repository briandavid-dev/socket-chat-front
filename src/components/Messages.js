import React, { useContext } from "react";
import SendMessage from "./SendMessage";
import IncomingMessage from "./IncomingMessage";
import { OutgoingMessage } from "./OutgoingMessage";
import { ChatContext } from "../context/chat/ChatContext";
import { AuthContext } from "../context/AuthContext";

const Messages = () => {
  const { chatState } = useContext(ChatContext);
  const { auth } = useContext(AuthContext);
  return (
    <>
      {/* <!-- Chat inicio --> */}
      <div className="mesgs">
        {/* <!-- Historia inicio --> */}
        <div id="mensajes" className="msg_history">
          {chatState.mensajes.map((msg) =>
            msg.para === auth.uid ? (
              <IncomingMessage key={msg._id} msg={msg} />
            ) : (
              <OutgoingMessage key={msg._id} msg={msg} />
            )
          )}
        </div>
        {/* <!-- Historia Fin --> */}

        <SendMessage />
      </div>
      {/* <!-- Chat Fin --> */}
    </>
  );
};

export default Messages;
