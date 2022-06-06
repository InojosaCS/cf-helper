import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';  
import { Navbar, Container, Nav } from "react-bootstrap";

function Header() {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">@InojosaCS</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#">Home</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;
