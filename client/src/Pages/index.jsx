import React, { useState, useEffect} from "react";
import { Container, Row, Col, Image, Button, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import ".././App.css";
import axios from "axios";
import {useParams} from 'react-router';


const MainPage = () => {
    const [medData, setMedData] = useState({})
    const { id } = useParams();
    
    useEffect(() => {
        axios.get("/api/getmed/" + id)
            .then((res) => {
                setMedData(res)
                console.log(res)
                
            });
    }, []);

    

    return (
        <div>
            Hello
        </div>

    );
};

export default MainPage;