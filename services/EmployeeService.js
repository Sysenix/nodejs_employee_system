const { Employee } = require('../models');
const models = require('../models/index');

class EmployeeService {

    async createEmployee(params) {
        const {first_Name, last_Name, dateof_birth, blood_Group, color_id} = params;
        try {
            this.models
            const c_employee = await Employee.create({
                firstName: first_Name,
                lastName: last_Name, 
                dateofbirth: dateof_birth, 
                bloodGroup: blood_Group
            });
            return c_employee;
        } catch (error) {
            return error;
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
            return error;
        }
    }
    async findEmployee(employee_id){
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
    }
    async getAllEmployees(){
        try {
            const employees = await Employee.findAll();
            return employees;
        } catch (error) {
            return error;
        }
    }
    
}

module.exports = EmployeeService;