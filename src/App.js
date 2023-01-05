import React, { useState,useEffect } from "react";
import Container from 'react-bootstrap/Container';
import ThemeProvider from 'react-bootstrap/ThemeProvider'
import TodoAddForm from './components/TodoAddForm'
import TodoEditForm from './components/TodoEditForm'
import TodoNavbar from './components/TodoNavbar'
import TodoList from './components/TodoList'
import AlertComp from "./components/AlertComp";
import axios from "axios";

function App() {
  let baseUrl = "http://localhost:8088/api";
  
  const [showalert, setShowalert] = useState(false);
  const [apimsg, setApimsg] = useState("");
  const [alerttype, setAlerttype] = useState("success");
  const [todos, setTodos] = useState("");
  const [editform,setEditform]=useState(false)
  const [dataid,setDataid]=useState('')

  
  const showAlertFunc = (showalert,apimsg,alerttype) =>{
    console.log('showAlertFunc')
    setShowalert(showalert)
    setApimsg(apimsg)
    setAlerttype(alerttype)
  }
  function cancelAlert() {
    setShowalert(false)
  }

  function showEditForm(status,editid) {
    setEditform(status)
    setDataid(editid)
    console.log(editid);
  }
  console.log(dataid);

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
  }, [showalert,editform]);

  
  useEffect(() => {
    if(showalert){
      setInterval(() => {
        setShowalert(false)
      }, 5000);
    }
  }, [showalert]);

  return (
    <div className="App">
    <ThemeProvider breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']} minBreakpoint="xxs">
    <TodoNavbar />
    <Container>
    <AlertComp alertshow={showalert} apimsg={apimsg} alerttype={alerttype} cancelAlert={cancelAlert}/>
    {!editform?<TodoAddForm showAlertFunc={showAlertFunc} baseUrl={baseUrl}/>:<TodoEditForm showAlertFunc={showAlertFunc} baseUrl={baseUrl} dataid={dataid} showEditForm={showEditForm}/>}
    <TodoList todos={todos} showAlertFunc={showAlertFunc} showEditForm={showEditForm} baseUrl={baseUrl} />
    </Container>
    </ThemeProvider>;
    </div>
  );
}

export default App;
