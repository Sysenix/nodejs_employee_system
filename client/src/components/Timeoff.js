import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
const API_URL = '/timeoff/request/'

const Timeoff = () => {
    const [employee, setEmployee] = useState([]);
    const { employee_id } = useParams();

    useEffect(() => {
        //const response = await fetch(`${API_URL}${employee_id}`);
        //const timeoffreq
    },[]);

    const sendTimeoffRequest = () => {
        
    }
}