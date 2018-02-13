'use strict'

import Sequelize from 'sequelize';
import env from './env';
import app_user from '../models/app_user.js';
import tutor from '../models/tutor.js';
import subject from '../models/subject.js';
import state from '../models/state.js';
import district from '../models/district.js';

const Op = Sequelize.Op;
const sequelize = new Sequelize(env.DATABASE_NAME, env.DATABASE_USERNAME, env.DATABASE_PASSWORD, {
    host: env.DATABASE_HOST,
    dialect: env.DATABASE_DIALECT,
    operatorsAliases: Op,
    define: {
        underscored: true
    },
    
    storage: env.DATABASE_PATH
});

// Connect all the models/tables in the database to a db object,
//so everything is accessible via one object
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Models/tables
db.app_user= app_user(sequelize, Sequelize);
db.tutor = tutor(sequelize, Sequelize);
db.subject = subject(sequelize, Sequelize);
db.state = state(sequelize, Sequelize);
db.district = district(sequelize, Sequelize);


//tutor association
db.tutor.belongsTo(db.app_user, { foreignKey: 'id', onDelete: 'CASCADE' });
db.app_user.hasMany(db.tutor, { foreignKey: 'id', onDelete: 'CASCADE' });


db.tutor.belongsTo(db.subject, { foreignKey: 'subject_id' });
db.subject.hasMany(db.tutor, { foreignKey: 'subject_id' });

db.tutor.belongsTo(db.state, { foreignKey: 'state_id' });
db.state.hasMany(db.tutor, { foreignKey: 'state_id' });

db.tutor.belongsTo(db.district, { foreignKey: 'district_id' });
db.district.hasMany(db.tutor, { foreignKey: 'district_id' });

//district association
db.district.belongsTo(db.state, { foreignKey: 'state_id' });
db.state.hasMany(db.district, { foreignKey: 'state_id' });



module.exports = db;
