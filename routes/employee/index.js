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
            return res.status(201).send({success: true, message: response.message});
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

router.get('/employee/:id', async (req, res) => {
    const id = req.params.id;
    if (!id){
        return res.status(400).send({ message: 'Please specify employee id.'})
    }
    await EmployeeService.findEmployee(parseInt(id)).then((response) => {
        if (response){
            return res.status(200).send({success: true, message: response});
        }else{
            return res.status(404).send({success: false, message:'User not found! '});
        }
    })
});

router.delete('/employee/:id', async (req, res) => {
    const id = req.params.id;
    if (!id){
        return res.status(400).send({ message: 'Please specify employee id.'})
    }
    await EmployeeService.deleteEmployee(parseInt(id)).then((response) => {
        if(response){
            return res.status(204).send({success: true, message: response});
        }else{
            return res.status(404).send({success: false, message:'User not found !'});
        }
    })
});

// Update
router.put('/employee/:id', async (req, res) => {
    const id = req.params.id;
    const {first_Name, last_Name, blood_Group } = req.body;
    try {
        await EmployeeService.findEmployee(parseInt(id)).then((employee) => {
            if(employee){
                employee.firstName = first_Name;
                employee.lastName = last_Name;
                employee.bloodGroup = blood_Group;

                await employee.save();
                return res.status(200).send({success: true, message: response})
            }else{
                return res.status(404).send({success: false, message:'User not found !'});
            }
        })
    } catch (error) {
        return res.status(500).send({success: false, message: "Something went wrong!", error: error});
    }
});

module.exports = router;