import React, { useState,useEffect } from "react";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import axios from "axios";

export default function TodoEditForm({showAlertFunc,baseUrl,dataid,showEditForm}) {
  const [editid, setEditid] = useState("");
  const [editdata, setEditdata] = useState({
    "title":"",
    "desc":"",
    "date":""
  });

  
  useEffect(() => {
    console.log('edit ffect call',dataid)
    let editid = {"id":dataid};
    const options = {
        url: baseUrl + "/todo/edit",
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        data:editid
      };

      axios(options)
        .then((response) => {
          console.log(response.data.data[0]);
          let alert='';
          let apimsg='';
          let alerttype='';
          if (response.status) {
            if (response.status !== 200) {
              alerttype="danger";               
            } else {
                setEditid(response.data.data[0].id)
                setEditdata({
                    "title":response.data.data[0].title,
                    "desc":response.data.data[0].todo_desc,
                    "date":response.data.data[0].date,
                })
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

  },[dataid])  
  function editTodo() {
    let todoInfo = { "id":editid,"title": editdata.title, "todo_desc": editdata.desc, "date": editdata.date};
    console.log('todoInfo',todoInfo)
    if (editid>0 && editdata.title != "" && editdata.desc != "" && editdata.date != "") {
      const options = {
        url: baseUrl + "/todo/update",
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
              showEditForm(false)
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
          <Card.Header>Edit Todo</Card.Header>
          <Card.Body>            
            <Form.Label htmlFor="basic-url">Title</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control
                placeholder="Todo Title"
                aria-label="Todo Title"
                aria-describedby="basic-addon1"
                onInput={(e) => {
                    setEditdata(previousState => {
                        return { ...previousState, "title": e.target.value }
                      });
                }}
                value={editdata.title}
              />
            </InputGroup>

            <Form.Label htmlFor="basic-url">Description</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control
                as="textarea"
                aria-label="With textarea"
                onInput={(e) => {
                    setEditdata(previousState => {
                        return { ...previousState, "desc": e.target.value }
                      });
                }}
                value={editdata.desc}
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
                    setEditdata(previousState => {
                        return { ...previousState, "date": e.target.value }
                      });
                }}
                value={editdata.date}
              />
            </InputGroup>
            <Button variant="primary" className="m-2" onClick={editTodo}>
              Update
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

