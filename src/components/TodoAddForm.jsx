import React, { useState,useEffect } from "react";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import axios from "axios";

export default function TodoAddForm({showAlertFunc,baseUrl}) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [tododate, setTododate] = useState("");
  

  function addTodo() {
    let todoInfo = { title: title, todo_desc: desc, date: tododate};

    if (title != "" && desc != "" && tododate != "") {
      const options = {
        url: baseUrl + "/todo/create",
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        data: todoInfo
      };

      axios(options)
        .then((response) => {
          console.log(response);
          let alert='';
          let apimsg='';
          let alerttype='';
          if (response.status) {
            alert=true
            apimsg=response.data.message
            if (response.status !== 200) {
              alerttype="danger";
            } else {
              alerttype="success";
            }
            showAlertFunc(alert,apimsg,alerttype)
          }          
        })
        .catch(function (error) {
          // handle error
          console.log(error);
          return;
        });
    } else {
      console.log("Empty data");
    }
  }

  return (
    <>
      <Row>
        <Card style={{ margin: "2% 0%" }}>
          <Card.Header>Add Todo</Card.Header>
          <Card.Body>
            <Form.Label htmlFor="basic-url">Title</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control
                placeholder="Todo Title"
                aria-label="Todo Title"
                aria-describedby="basic-addon1"
                onInput={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </InputGroup>
            <Form.Label htmlFor="basic-url">Description</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control
                as="textarea"
                aria-label="With textarea"
                onInput={(e) => {
                  setDesc(e.target.value);
                }}
              />
            </InputGroup>

            <Form.Label htmlFor="basic-url">Description</Form.Label>
            <InputGroup className="mb-3">
              <input
                type="date"
                id="start"
                className="form-control"
                name="trip-start"
                onInput={(e) => {
                  setTododate(e.target.value);
                }}
              />
            </InputGroup>
            <Button variant="primary" className="m-2" onClick={addTodo}>
              Save
            </Button>
            <Button variant="danger" className="m-2">
              Clear
            </Button>
          </Card.Body>
        </Card>
      </Row>
    </>
  );
}
