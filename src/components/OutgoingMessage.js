import React from "react";
import { horaMes } from "../helpers/horaMes";

export const OutgoingMessage = (props) => {
  const { msg } = props;

  return (
    <>
      {/* <!-- Mensaje enviado inicio --> */}
      <div className="outgoing_msg">
        <div className="sent_msg">
          <p>{msg.mensaje}</p>
          <span className="time_date">{horaMes(msg.createdAt)}</span>
        </div>
      </div>
      {/* <!-- Mensaje enviado inicio --> */}
    </>
  );
};
