import React, { useEffect, useState } from "react";
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';  
import Button from 'react-bootstrap/Button';  
import axios from 'axios';

export default function TodoList() {

    let baseUrl="http://localhost:8088/api";
    const [todos,setTodos]=useState('');

    useEffect(() => {
        axios.get(baseUrl+'/todo/list')
        .then(function (response) {
          // handle success
        //   console.log(response.data.data);
          setTodos(response.data.data);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
          return
        })
    }, []);
console.log('todos',todos)



  return (
    <div>
    <Card>
      <Card.Body>
      <Card.Title>Todo Lists</Card.Title>
      <ListGroup>
        {todos!=''?
        todos.map((todo)=>{
             return <ListGroup.Item action variant="light" >
             <b>{todo.title?todo.title:'--'}</b>
             <br />
             <small>{todo.date?todo.date:'--'}</small>
             <Button variant="success">Edit</Button>{' '}
             <Button variant="danger">Delete</Button>{' '}
           </ListGroup.Item>
        }) :"Please Wait...."    
    }
    </ListGroup>
      </Card.Body>
    </Card>     
    </div>
  );
}
