const express = require('express');
const router = express.Router();

const TimeoffService = require('../../services/TimeoffService');


router.get('/timeoff/:id', async (req, res) => {
    const id = req.params.id;

})
module.exports = router;