import { Row, Col, Button, Container } from "react-bootstrap";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import "./signup.css"

const SignUp = () => {
    const [firstName, setfirstName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const createLogin = () => {
        axios.post("/api/user_signup", {
            firstName: firstName,
            email: email,
            password: password
        }).then(() => {

        })
    }
    return (

        <Container>
            <div className="signupWrap">
                <Row>
                    <div className="signupInnerWrap">
                        <Col>
                            <h1>Sign Up</h1>
                            <input onChange={(e) => { setfirstName(e.target.value) }} className="txtarea" type="text" placeholder="First Name*" />
                            <p></p>

                            <input onChange={(e) => { setEmail(e.target.value) }} className="txtarea" type="email" placeholder="Email*" />
                            <p></p>

                            <h2>Create a Password</h2>
                            <p>Password requires 6 characters minimum</p>
                            <input onChange={(e) => { setPassword(e.target.value) }} className="txtarea" type="password" placeholder="Password" />
                            <p></p>

                            <p>

                                <div class="buttoncss">
                                    <Button onClick={createLogin} href="/main" type="submit">Submit</Button>
                                </div>
                            </p>
                            <h5>Already signed up?</h5>

                            <Button href="/login" id="login" type="submit">Log In</Button>
                            <p></p>
                        </Col>
                    </div>

                </Row>
            </div>
        </Container>

    )

}


export default SignUp;

