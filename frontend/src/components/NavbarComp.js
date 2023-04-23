import React, { Component } from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
  } from "react-router-dom";
import Home from "../pages/Home";

  export default class NavbarComp extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Navbar bg="#121212" variant="dark" expand="md">
                        <Container>
                            <Navbar.Collapse id="basic-navbar-nav">
                               <Nav className="me-auto">
                                  <div className="navbar" style={{display:"flex", position:'absolute', left: '41vw', justifyContent: 'center', align: 'center'}}>
                                       <Nav.Link style={{fontWeight: 'bolder'}} as={Link} to={"/home"}>Home.</Nav.Link>
                                  </div>
                               </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </div>
                <div>
                    <Routes>
                        {/* EXAMPLE ROUTE */}
                          {/* <Route exact path="/myfriends" element={<MyFriendsScreen/>}/> */}
                          <Route exact path="/home" element={<Home/>}/> 
                    </Routes>
                </div>
            </Router>
        )
    
    }


}