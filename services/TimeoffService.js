const models = require('../models');

class TimeoffService{

    async createTimeoff(start, end, employee_id){
        let pending = await this.findEmployee(employee_id)
        // if employee is exists in database then create timeoff
        if(pending){
            try {
                const timeoff = await models.TimeOffs.create({
                    startTime: start, 
                    endTime: end, 
                    EmployeeId: employee_id
                });
                return timeoff;
            } catch (error) {
                throw error.message;
            }
        
        }else{
            return false;

        }
    }
    async findEmployee(employee_id){
        if(!isNaN(employee_id)){
            try {
                const f_employee = await models.Employee.findByPk(employee_id);
                if (f_employee){
                    return true;
                }else{
                  return false;
                }
            } catch (error) {
                return error;
            }
        }else{
            try {
                const f_employee = await models.Employee.findOne({where: {lastName: employee_id}});
                if (f_employee){
                   return true; // return employee if employee exists 
                }else{
                  return null; // return null if employee does not exist
                }
            } catch (error) {
                return error;
            }
        }

    }
}
module.exports = TimeoffService;