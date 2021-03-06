import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Card, Table, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import ".././App.css";
import axios from "axios";

// Need to do get the correct medicine id when creating med deets, only have the table data showing after a button is clicked, getting the meed deets data nd medicine data to populate on the same table row.


const MainPage = () => {
    const [urlId, setURLId] = useState();
    const [user, setUser] = useState({});
    const [name, setName] = useState("");
    const [amount, setAmount] = useState();
    const [id, setId] = useState();
    const [medID, setMedID]= useState();
    const date = new Date().toLocaleTimeString();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const submitMedDeet = () => {
        axios.post("/api/createMedDeet/" + id, {
            timeTaken: date,
            amountTaken: amount,
            MedicineId: medID

        })
    }

    useEffect(() => {
        axios.get("/api/getMed/")
            .then((res) => {
                setUser(res.data.result);
                setURLId("/api/createMed/" + res.data.result.id)
                setId(res.data.result.id)
                console.log(res.data.result.Medicines)
                // res.data.result.Medicines.map(item =>{
                //     console.log("Med Item",item.id)
                //     setMedId(item.id)
                // })

            });
    }, []);

    // Need to get the id of the medicine that they click on and set it as the id for medicine id


    return (
        <Container>
            <div>
                <div id="userName">{user.firstName}'s Medicines</div>
                <Row className="btnRow">

                    {user.Medicines && user.Medicines.length !== 0 && user.Medicines.map(item => {
                        const medID = item.id
                        // setMedId(item.id)
                        return (
                            <Col>
                                <Button className="medBtn" value={medID} onClick={handleShow} onChange={(e) => { this.setMedID(e, "value") }} block>{item.medicineName}</Button>
                            </Col>
                        )



                    })}
                </Row>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Medicine Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>How many name did you take?</Modal.Body>
                    <input onChange={(e) => { setAmount(e.target.value) }} placeholder="Amount" type="number"></input>
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
                        { user.Medicines && user.Medicines.length !== 0 && user.Medicines.map(item => {
                            console.log(item)
                          
                          

                            const medDeets = item.MedDeets
                            const medDeetMap = medDeets.map(deet => {
                                
                                
                            })
                            return (
                                <tr>
                                    <td>{item.medicineName}</td>
                                    <td>   </td>
                                    <td></td>
                                    <td>{item.waitingPeriod} hours</td>
                                </tr>

                            )
                            // }


                        })}
                    </tbody>
                </Table>
                <Row>
                    <Button href={urlId}>Add New Medicine</Button>
                </Row>
            </div>
        </Container>

    );
};

export default MainPage;
