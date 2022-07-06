const { Employee } = require('../models');
const models = require('../models/index');

const ColorCategoryService = require('../services/ColorCategoryService');
const colorCategoryService = new ColorCategoryService();

class EmployeeService {
    response = {
    }

    async createEmployee(params) {
        const {first_name, last_name, date_of_birth, blood_group, color_id} = params;
        const f_employee = await this.findEmployee(last_name);
        const f_color = await colorCategoryService.findColor(null, color_id);
        if(f_employee){
            return false;
        } 
        else if(!f_color){
            return 'This color is not available.';
        }
        else{
            try {

                const c_employee = await Employee.create({
                    firstName: first_name,
                    lastName: last_name, 
                    dateofBirth: date_of_birth, 
                    bloodGroup: blood_group,
                    colorId: color_id
                });
                return c_employee;
            } catch (error) {
                console.log(error.message);
                return error;
            }
        }
    }


    async deleteEmployee(employee_id) {
        try {
            const f_employee = await this.findEmployee(employee_id);
            if(f_employee){
                // await f_employee.destroy();
                const d_employee = await Employee.destroy({where:{id: f_employee.id}});
                return d_employee;
            }else{
                return null;
            }
        } catch (error) {
            console.log(error);
            return error;
        }
    }
    async findEmployee(employee_id){
        if(!isNaN(employee_id)){
            try {
                const f_employee = await Employee.findByPk(employee_id);
                if (f_employee){
                    return f_employee;
                }else{
                  return null;
                }
            } catch (error) {
                return error;
            }
        }else{
            try {
                const f_employee = await Employee.findOne({where: {lastName: employee_id}});
                if (f_employee){
                   return f_employee; // return employee if employee exists 
                }else{
                  return null; // return null if employee does not exist
                }
            } catch (error) {
                return error;
            }
        }

    }
    async getAllEmployees(){
        try {
            const employees = await Employee.findAll();
            return employees;
        } catch (error) {
            console.log('Something went wrong during getAllEmployees', error.message);
            return error;
        }
    }
    
}

module.exports = EmployeeService;