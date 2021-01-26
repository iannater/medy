import React, { useState } from "react";
import { Row, Col, Button, Container } from "react-bootstrap";

import axios from "axios";
import "./signup.css";

const UserLogin = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [createMedURL, setMainURL]= useState("")

  const submitUser = () => {
    axios.post("/api/login", {
      email,
      password
    }).then((res) => {
      console.log("login Response", res)
      setMainURL(res.dataValues.id)
      console.log("URL ID", res.User.dataValues.id)
    })
  }
  // Map over this.state.projects and render a project component for each one
  return (
    <Container>
      <div className="signupWrap">
      <Row>
    <div className="signupInnerWrap">
      <Col>
    <h1>User Login</h1>

      <input onChange={(e) => { setEmail(e.target.value) }} className="txtarea" type="text" placeholder="Email*"></input>
      <p></p>
      <input onChange={(e) => { setPassword(e.target.value) }} className="txtarea" type="password" placeholder="Password*"></input>

      <p></p>

        <Button onClick={submitUser} className="agentLogin btn" href="/main">Log In</Button>
       
        <p></p>
        <h5>Don't have an account?</h5>                         
        
        <Button  href="/" id="login" type="submit">Sign up </Button> 
        <p></p>
 

    </Col>

    </div>
    </Row>
    </div>
    </Container>
    );

}

export default UserLogin;