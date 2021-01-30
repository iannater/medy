import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Card, Table, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import ".././App.css";
import axios from "axios";


const MainPage = () => {
    const [urlId, setURLId] = useState();
    const [user, setUser] = useState({});
    const [name, setName] = useState("");
    const [amount, setAmount] = useState();
    const [id, setId] = useState();
    const date = new Date().toLocaleTimeString()

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        axios.get("/api/getMed/")
            .then((res) => {
                // setMedData(res)
                setUser(res.data.result);
                setURLId("/api/createMed/" + res.data.result.id)
                console.log("$$$$$$$$$$$$$$$$$$$$$$", res.data)
                console.log("User ID", res.data.result.id)
                console.log("$$$$$$$$$$$$$$", user.firstName)
                setId(res.data.result.id)

            });
    }, []);

    //Need to set up the other model that takes in the time it was taken and how many were taken.
    const submitMed = () => {
        axios.post(urlId, {
            medicineName: name,
            waitingPeriod: 4,
            UserId: id

        })
    }

    const submitMedDeet = () => {
        axios.post("/api/createMedDeet/" + id, {
            timeTaken: date,
            amountTaken: amount,
            MedicineId: id

        })
    }

    const deleteMed = () => {
        axios.delete("/api/deletemed/", {

        })
    }

    return (
        <Container>
            <div>
                <div id="userName">{user.firstName}'s Medicines</div>
                <Row className="btnRow">
                    
                {user.Medicines && user.Medicines.length !== 0 && user.Medicines.map(item => {
                            return (
                            <Col>
                            <Button className="medBtn" onClick={handleShow} block>{item.medicineName}</Button>
                            </Col>
                            )



                        })}
                    
                    
                </Row>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>How many name did you take?</Modal.Body>
                    <input onChange={(e) => { setAmount(e.target.value) }} placeholder="Type Number" type="number"></input>
                    <Modal.Footer>
                    <Button variant="primary" onClick={submitMedDeet} href="/main"> Take Medicine </Button>
                        <Button variant="secondary" onClick={handleClose}>Close</Button>
             
                    </Modal.Footer>
                </Modal>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>
                                Med Name
                            </th>
                            <th>
                                Time Taken
                            </th>
                            <th>
                                Amount Taken
                            </th>
                            <th>
                                Rest Period
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {user.Medicines && user.Medicines.length !== 0 && user.Medicines.map(item => {
                            return (
                                <tr>
                                    <td>{item.medicineName}</td>
                                    <td> {item.timeTaken}  </td>
                                    <td>{item.amountTaken}</td>
                                    <td>{item.waitingPeriod} hours</td>
                                </tr>
                            )



                        })}
                    </tbody>
                </Table>
                <Row>
                    <Button  href={urlId}>Add New Medicine</Button>
                </Row>
            </div>
        </Container>

    );
};

export default MainPage;
