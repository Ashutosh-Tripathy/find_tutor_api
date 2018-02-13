'use strict'

import Sequelize from 'sequelize';
import env from './env';
import users from '../models/users.js';
import trips from '../models/trips.js';
const sequelize = new Sequelize(env.DATABASE_NAME, env.DATABASE_USERNAME, env.DATABASE_PASSWORD, {
    host: env.DATABASE_HOST,
    dialect: env.DATABASE_DIALECT,
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
db.users = users(sequelize, Sequelize);
db.trips = trips(sequelize, Sequelize);

//Relations
//Task.belongsTo(User, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
//User.hasMany(Task, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

//db.trips.belongsTo(db.users, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
//db.users.hasMany(db.trips, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

db.trips.belongsTo(db.users, { foreignKey: 'user_id', onDelete: 'CASCADE' });
db.users.hasMany(db.trips, { foreignKey: 'user_id', onDelete: 'CASCADE' });


module.exports = db;
