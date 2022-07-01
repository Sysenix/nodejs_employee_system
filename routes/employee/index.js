const express = require('express');
const router = express.Router();

const EmployeeService = require('../../services/EmployeeService');
// const {Employee} = require('../../models');


router.post('/create', async (req,res) => {
    const {first_name, last_name, date_of_birth, blood_group, color_id} = req.body;
    if(!first_name && !last_name && !date_of_birth && !blood_group && !color_id) { 
        res.status(400).send({message: 'Please fill all required fields. All fields are required.'});
    }
    try {
        const c_employee = await EmployeeService.createEmployee(req.body).then((response) => {
            return res.status(200).send({success: true, message: response.message});
        });

    } catch (error) {
        console.log(error.message);
        return res.status(400).send({success: false, message: error.message});  // TODO: handle error properly  and throw exception here
    }
    return res.status(500);
});

router.post('/update', (req, res) => {
    const {first_name, last_name, date_of_birth, blood_group} = req.body;
    console.log('Update request:', first_name, last_name, date_of_birth);
});

module.exports = router;