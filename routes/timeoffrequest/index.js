const { request } = require('express');
const express = require('express');
const router = express.Router();

const TimeoffService = require('../../services/TimeoffService');
const timeoffService = new TimeoffService();

router.post('/request/:id', async (req, res) => {
    const id = req.params.id;
    const {startTime, endTime} = req.body;
    
    const date = Date();
    try {
        const req_timeoff = await timeoffService.createTimeoff(startTime,endTime,id);
        if(req_timeoff){
            return res.status(201).send({success: true, message: req_timeoff});

        }else{
            return res.status(404).send({success: false, message: 'This employee is not exist.'});
        }
    } catch (error) {
        throw error.message;
    }
});
module.exports = router;