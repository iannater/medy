import React, { useState, useEffect } from "react";
import { Container, Row, Col, Image, Button, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import ".././App.css";
import axios from "axios";
import { useParams } from 'react-router';


const MainPage = () => {
    
    const [medName, setMedName] = useState("")
    const [medTime, setMedTime] = useState("")
    const [medWaiting, setMedWaiting] = useState("")
    const [medAmount, setMedAmount] = useState("")
    //Use params not working for some reason so had to skurrtt that
    const { id } = useParams();

    console.log("Yo ID", location.pathname)
    const winLocation = location.pathname
    const newLocation = winLocation.slice(15)

    const submitMed = () => {
        axios.post("/api/createmed/" + newLocation, {
            medicineName: medName,
            waitingPeriod: medWaiting,
            UserId: newLocation
            
        })
    };



    return (
        <Container>
            <div className="signupWrap">
                <Row>
                    <div className="signupInnerWrap">
                        <Col>

                            <div className="InnerWrap">

                                <h1>Medicine Details</h1>

                                <input onChange={(e) => { setMedName(e.target.value) }} className="txtarea" id="enterAddress" placeholder="Medicine Name" type="address"></input>
                                <input onChange={(e) => { setMedWaiting(e.target.value) }} className="txtarea" id="enterPrice" placeholder="Waiting Period" type="price"></input>

                                <Button onClick={submitMed} href="/main" className="text-center justify-content-center">Add Medicine</Button>
                                <p></p>
                                <div id="backtomain">
                                    <Button href="/main" id="login" type="submit">Back to Main</Button>
                                </div>

                                <p></p>
                            </div>
                        </Col>
                    </div>
                </Row>
            </div>
        </Container>

    );
};

export default MainPage;