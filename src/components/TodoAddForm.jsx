import React, { useState,useEffect } from "react";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import axios from "axios";
import AlertComp from "./AlertComp";

export default function TodoAddForm() {

  let baseUrl = "http://localhost:8088/api";
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [tododate, setTododate] = useState("");
  
  const [showalert, setShowalert] = useState(false);
  const [apimsg, setApimsg] = useState('');
  const [alerttype, setAlerttype] = useState('success');
  const [todos, setTodos] = useState('');

  useEffect(() => {
    axios.get(baseUrl + "/todo/list")
      .then(function (response) {
        // handle success
          console.log(response.data.data);
        setTodos(response.data.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        return;
      });
  }, []);
  
  function cancelAlert() {
    setShowalert(false)
  }
  
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
          if(response.status){
            setShowalert(true)
            setApimsg(response.data.message)
          }
          if(response.status!==200){
            setShowalert('danger')
          }else{
            setShowalert('success')
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
    <AlertComp alertshow={showalert} apimsg={apimsg} alerttype={alerttype} cancelAlert={cancelAlert}/>
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
