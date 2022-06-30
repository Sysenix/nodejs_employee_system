const express = require('express');
const router = express.Router();

const EmployeeService = require('../../services/EmployeeService');

const {Employee} = require('../models');

router.post('/create',(req,res,next) => {
    const {first_name, last_name, date_of_birth, blood_group, color_id} = req.body;
    if(!first_name || !last_name || !date_of_birth || !blood_group || !color_id) { 
        res.status(400).send({message: 'Please fill all required fields. All fields are required.'});
    }
    try {
        const c_employee = await EmployeeService.createEmployee(req.body).then(() => {
            return res.status(200).send({success: true, message: response.message});
        });

    } catch (error) {
        return next(error);
    }
    return res.status(500);
});