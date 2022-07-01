import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Dropdown, FormControl, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./table.css";

export default function UsersTable(props) {
  const [arrUser, setArrUser] = useState([{}]);
  const [arrUserR, setArrUserR] = useState([{}]);
  const [reshow, setReshow] = useState(0);
  let initialArr = [{}];
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        let data = res.data;
        data.map((item, i) => {
          initialArr[i] = {
            id: item.id,
            name: item.name,
            email: item.email,
            company: item.company.name,
          };
        });
        setArrUser(initialArr);
        setArrUserR(initialArr);
        setReshow(0);
      })
      .catch((err) => console.log("there is error in get data :("));
  }, [reshow]);

  const search = (e, type) => {
    console.log(e);
    if (e === "") setReshow(1);
    let a = [];
    initialArr = [...arrUserR];
    console.log(initialArr);
    initialArr.map((item) => {
      let result = eval(`item.${type}.slice(0, e.length - item.${type}.length);`)
      if (result.toLowerCase() === e.toLowerCase()) a = [...a, item];
    });
    setArrUser(a);
  };

  const showPostes = (id) => {
    console.log(id);
    props.setShow(1);
    props.setId(id);
  };
  return (
    <Col sm={9} className="tblU">
      <Table striped>
        <thead>
          <tr>
            <th>
              Name{" "}
              <Dropdown className="dialogBox">
                <Dropdown.Toggle />
                <Dropdown.Menu>
                  <FormControl
                    autoFocus
                    className="mx-3 my-2 w-auto"
                    placeholder="Type to filter..."
                    onChange={(e) => search(e.target.value, "name")}
                  />
                </Dropdown.Menu>
              </Dropdown>
            </th>
            <th>
              Email{" "}
              <Dropdown className="dialogBox">
                <Dropdown.Toggle />
                <Dropdown.Menu>
                  <FormControl
                    autoFocus
                    className="mx-3 my-2 w-auto"
                    placeholder="Type to filter..."
                    onChange={(e) => search(e.target.value, "email")}
                  />
                </Dropdown.Menu>
              </Dropdown>
            </th>
            <th>Company</th>
          </tr>
        </thead>
        <tbody>
          {arrUser.map((item, i) => {
            return (
              <tr key={i}>
                <td
                  className="nameUser"
                  onClick={() => showPostes(arrUser[i].id)}
                >
                  <p>{item.name}</p>
                </td>
                <td>{item.email}</td>
                <td>{item.company}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Col>
  );
}
