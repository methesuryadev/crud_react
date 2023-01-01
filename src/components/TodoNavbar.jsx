import React from 'react'
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

export default function TodoNavbar() {
  return (
    <>
        <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="javascript:void(0)">Todo App
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  )
}
