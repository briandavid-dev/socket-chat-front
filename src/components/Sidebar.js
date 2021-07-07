import React, { useContext } from "react";
import { ChatContext } from "../context/chat/ChatContext";
import { AuthContext } from "../context/AuthContext";
import { SidebarChatItem } from "./SidebarChatItem";

export const Sidebar = () => {
  const { chatState } = useContext(ChatContext);
  const { auth } = useContext(AuthContext);
  return (
    <>
      {/* <!-- Sidebar inicio --> */}
      <div className="inbox_chat">
        {chatState.usuarios
          .filter((usuario) => usuario.uid !== auth.uid)
          .map((usuario) => (
            <SidebarChatItem key={usuario.uid} usuario={usuario} />
          ))}

        {/* <!-- Espacio extra para scroll --> */}
        <div className="extra_space"></div>
      </div>
      {/* <!-- Sidebar Fin --> */}
    </>
  );
};
