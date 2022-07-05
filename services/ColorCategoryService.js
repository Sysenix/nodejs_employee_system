const { response } = require('express');
const e = require('express');
const { ColorCategory } = require('../models');

class ColorCategoryService {
    async createColorCategory(color_name, color_hex){
        if(await this.findColor(color_hex)){
            return false;
        }else{
            try {
                const color = await ColorCategory.create({
                    colorName: color_name, 
                    colorHex: color_hex
                });
                return color;
            } catch (error) {
                console.log('Something went wrong during processing of createColorCategory.');

                throw error.message;
            }
          
        }
    }
    async findColor(color_hex){
        try {
            const f_color = await ColorCategory.findOne({where: {colorHex: color_hex}});
            if(f_color){
                return true;
            }else{
                return false;
            }
        } catch (error) {
            console.log('Something went wrong during processing of findColor.');
            throw error.message;
        }
       
    }
}
module.exports = ColorCategoryService;