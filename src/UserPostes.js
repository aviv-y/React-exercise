import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./table.css";
import AddPost from "./AddPost";

export default function UsersPostes(props) {
  const id = props.id;
  const [userPostes, setUserPostes] = useState([{}]);
  const [modalShow, setModalShow] = useState(false);
  let initialArr = [{}];
  useEffect(() => {
    async function sPostes() {
      await axios
        .get(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
        .then((res) => {
          let data = res.data;
          data.map((item, i) => {
            initialArr[i] = {
              id: item.id,
              title: item.title.toUpperCase(),
              body: item.body,
            };
          });
          setUserPostes(initialArr);
        })
        .catch((err) => console.log("there is error in get data :("));
    }
    sPostes();
  }, []);

  
  return (
    <>
      <AddPost
        show={modalShow}
        onHide={() => setModalShow(false)}
        setAddPost={setUserPostes}
        userPostes={userPostes}
        id={props.id}
      />
      <Button
        id="addBtn"
        variant="outline-primary"
        onClick={() => setModalShow(true)}
      >
        <h1>
          <b id="addP">+</b>
        </h1>
      </Button>
      <Row className="postes containP ">
        {userPostes.map((item) => {
          return (
            <Card
              key="Light"
              text="Light"
              style={{ width: "18rem" }}
              className="cardP mb-2"
            >
              <Card.Header className="CardHP">
                <b>{item.title}</b>
              </Card.Header>
              <Card.Body className="CardBP">
                <Card.Text>{item.body}</Card.Text>
              </Card.Body>
            </Card>
          );
        })}
      </Row>
    </>
  );
}
