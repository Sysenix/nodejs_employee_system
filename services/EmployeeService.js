const Models = require('../models');

class EmployeeService {
    constructor(sequelize) {
        Models(sequelize);
        this.client = sequelize;
        this.models = sequelize.models;
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
}

module.exports = new EmployeeService();