const db = require('../models');

class EmployeeService {
    constructor(db) {
        /*
        Models(sequelize);
        this.client = sequelize;*/
        
        this.models = db.models;
    }
    async createEmployee({firstName, lastName, dateofbirth, bloodGroup, color_id}) {
        try {
            const c_employee = await this.models.Employee.create({
                firstName,
                lastName, 
                dateofbirth, 
                bloodGroup, 
                color_id});
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
                const d_employee = await this.models.destroy({where:{id: f_employee.id}});
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
            const f_employee = await this.models.Employee.findByPk(employee_id);
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
            const employees = await this.models.Employee.findAll();
            return employees;
        } catch (error) {
            return error;
        }
    }
    
}

module.exports = EmployeeService;