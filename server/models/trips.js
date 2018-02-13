import users from './users';

const trip = (sequelize, DataTypes) => {
    const tbl = sequelize.define('trip', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        destination: {
            type: DataTypes.STRING,
            allowNull: false,
            length: 50,
        },
        startdate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        enddate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        user_id: {
        	type: DataTypes.INTEGER,
            allowNull: false,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false
        },
        updated_at: DataTypes.DATE,
        deleted_at: DataTypes.DATE
    }, {
            paranoid: true,
            underscored: true
        });
    return tbl;
};

// const tripModel = db.define('trip', {
//   id: { type: Sequelize.UUID, primaryKey: true },
//   destination: { type: Sequelize.STRING, length: 50, validate: { notNull: true } },
//   startdate: { type: Sequelize.DATE, validate: { notNull: true } },
//   enddate: { type: Sequelize.DATE, validate: { notNull: true } },
//   comment: { type: Sequelize.STRING, length: 50, validate: { notNull: true } },
// });

export default trip;

