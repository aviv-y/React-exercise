import React, { useState } from "react";
import UsersTable from "./UsersTable";
import UsersPostes from "./UserPostes";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import "./table.css";

export default function Home() {
  const [showC, setShowC] = useState(0);
  const [id, setId] = useState(0);
  return (
    <>
      <h1 id="tHeader" className="header">
        <b>POSTER</b>
        {showC && (
          <BsFillArrowRightCircleFill onClick={() => setShowC(0)} id="return" />
        )}
      </h1>
      <h3 className="header">The posts of the experts </h3>
      {!showC && <UsersTable setShow={setShowC} setId={setId} />}
      {showC && <UsersPostes setShow={setShowC} id={id} />}
    </>
  );
}
