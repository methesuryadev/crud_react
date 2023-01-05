import React, { useEffect, useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import axios from "axios";

export default function TodoList({todos,showAlertFunc,showEditForm,baseUrl}) {

 
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
          let alert='';
          let apimsg='';
          let alerttype='';
          console.log(response);
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
    <div>        
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
                      <Button variant="success" onClick={()=>{showEditForm(true,todo.id)}}>Edit</Button>{" "}
                      <Button variant="danger" onClick={()=>{showEditForm(false,""); deleteTodo(todo.id)}}>
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
