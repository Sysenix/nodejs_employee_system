const express = require('express');
const router = express.Router();

const EmployeeService = require('../../services/EmployeeService');

const employeeService = new EmployeeService();



// get all employees
router.get('/', async (req, res) => {
    await employeeService.getAllEmployees().then((response) => {
        if(response){
            return res.status(201).send({success: true, message: response});
        }else{
            return res.status(400).send({success: false, message: 'There is no any data to send.'});
        }
    });
});

router.post('/create', async (req,res) => {
    const {first_name, last_name, date_of_birth, blood_group, color_id} = req.body;
    if(!first_name && !last_name && !date_of_birth && !blood_group && !color_id) { 
        res.status(400).send({message: 'Please fill all required fields. All fields are required.'});
    }
    try {
        const c_employee = await employeeService.createEmployee(req.body).then((response) => {
            if(response){
                return res.status(201).send({success: true, message: response});
            }else{
                return res.status(400).send({success: false, message: 'This employee is already in the list of employees.'});
            }
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

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    if (!id){
        return res.status(400).send({ message: 'Please specify employee id.'})
    }
    try {  
        await employeeService.findEmployee(id).then((response) => {
            if (response){
                return res.status(200).send({success: true, message: response});
            }else{
                return res.status(404).send({success: false, message:'Employee not found! '});
            }
        });
    } catch (error) {
        console.log(error.message);
        return res.status(400).send({success: false, message: error.message});  
    }
    return res.status(500);
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    if (!id){
        return res.status(400).send({ message: 'Please specify employee id.'})
    }
    await employeeService.deleteEmployee(id).then((response) => {
        if(response){
            return res.status(204).send({success: true, message: response});
        }else{
            return res.status(404).send({success: false, message:'Employee not deleted because there is no employee.'});
        }
    })
});

// Update
router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const {first_name, last_name, date_of_birth, blood_group} = req.body;
    try {
        await employeeService.findEmployee(id).then(async (employee) => {
            if(employee){
                //console.log('employee found', employee);
                employee.firstName = first_name;
                employee.lastName = last_name;
                employee.dateofBirth = date_of_birth;
                employee.bloodGroup = blood_group;

                await employee.save();
                return res.status(200).send({success: true, message: employee})
            }else{
                return res.status(404).send({success: false, message:'User not found !'});
            }
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({success: false, message: "Something went wrong!", error: error});
    }
});
module.exports = router;