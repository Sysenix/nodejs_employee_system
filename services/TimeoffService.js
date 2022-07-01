const Models = require('../models');

class TimeoffService{
    constructor(sequelize){
        Models(sequelize);
        this.models = sequelize.models;
    }
}