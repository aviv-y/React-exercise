import React, { useState} from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FormControl } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./table.css";

export default function AddPost(props) {
  const { userPostes, setAddPost, id } = props;
  const [title, setTitle] = useState("");
  const [post, setPost] = useState("");

  const addPost = () => {
    const newP = {
      id: userPostes[userPostes.length - 1].id + 1,
      userId: id,
      title: title,
      body: post,
      };
      setAddPost([newP, ...userPostes]);
      props.onHide(false);
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <FormControl
            autoFocus
            className="md-3 my-2 w-auto"
            placeholder="Title Post"
            onChange={(e) => setTitle(e.target.value)}
          />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormControl
          autoFocus
          as="textarea"
          rows={6}
          className="md-3 my-2 w-auto"
          onChange={(e) => setPost(e.target.value)}
          placeholder="Your Post..."
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-primary" onClick={addPost}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
