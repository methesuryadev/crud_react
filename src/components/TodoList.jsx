import React, { useEffect, useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import axios from "axios";
import AlertComp from "./AlertComp";

export default function TodoList() {
  let baseUrl = "http://localhost:8088/api";
  const [todos, setTodos] = useState("");
  const [showalert, setShowalert] = useState(false);
  const [apimsg, setApimsg] = useState("");
  const [alerttype, setAlerttype] = useState("success");

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

  function deleteTodo(id) {
    if (id != "") {
      const options = {
        url: baseUrl + "/todo/delete",
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        data: { id: id },
      };

      axios(options)
        .then((response) => {
          console.log(response);
          if (response.status) {
            setShowalert(true);
            setApimsg(response.data.message);
          }
          if (response.status !== 200) {
            setShowalert("danger");
          } else {
            setShowalert("success");
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

  function cancelAlert() {
    setShowalert(false)
  }

  return (
    <div>
         <AlertComp alertshow={showalert} apimsg={apimsg} alerttype={alerttype} cancelAlert={cancelAlert}/>
      <Card>
        <Card.Body>
          <Card.Title>Todo Lists</Card.Title>
          <ListGroup>
            {todos != ""
              ? todos.map((todo) => {
                  return (
                    <ListGroup.Item action variant="light">
                      <b>{todo.title ? todo.title : "--"}</b>
                      <br />
                      <small>{todo.date ? todo.date : "--"}</small>
                      <Button variant="success">Edit</Button>{" "}
                      <Button variant="danger" onClick={()=>{deleteTodo(todo.id)}}>
                        Delete
                      </Button>{" "}
                    </ListGroup.Item>
                  );
                })
              : "Please Wait...."}
          </ListGroup>
        </Card.Body>
      </Card>
    </div>
  );
}
