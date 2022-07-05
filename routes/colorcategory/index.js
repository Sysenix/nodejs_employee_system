const express = require('express');
const router = express.Router();

const ColorCategoryService = require('../../services/ColorCategoryService');

const colorCategoryService = new ColorCategoryService();


router.get('/', async (req, res) => {
    res.send({message: "try : /colorcategory/create as a post request"}).status(200);

});

router.post('/create', async (req, res) => {
    const {color_name, color_hex} = req.body;
    if(!color_name || !color_hex){
        res.status(400).send({message: 'Please fill all required fields. All fields are required.'});
    }
    try {
        await colorCategoryService.createColorCategory(color_name, color_hex).then(async (response) => {
            if(response) {
                return res.status(201).send({success: true, message: response});
            }else {
                return res.status(400).send({success: false, message: 'This hex color is already exists.'});

            }
        });

    } catch (error) {
        console.log('Something went wrong with the create color request:  \n  ' + error.message);
        return res.status(400).send({success: false, message: 'Something went wrong !'});
    }
    return res.status(500);

});
module.exports = router;