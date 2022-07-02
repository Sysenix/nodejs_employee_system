const db = require('../models');

//console.log(User === sequelize.models.User); // true
class TimeoffService{
    constructor(db){
        this.models = db.models;
    }
    async createTimeoff(start, end, employee_id){
        try {
            const timeoff = await this.models.TimeOffs.create(start, end, employee_id);
            return timeoff;
        } catch (error) {
            return error;
        }
    }
}
module.exports = TimeoffService;