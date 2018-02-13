
const users = (sequelize, DataTypes) => {
    const tbl = sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            length: 50,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            length: 100
        },
        role: {
            type: DataTypes.ENUM,
            defaultValue: 'user',
            values: ['user', 'manager', 'admin']
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


// db.define('user', {
//   id: { type: Sequelize.UUID, primaryKey: true },
//   name: { type: Sequelize.STRING, length: 50, validate: { notNull: true } },
//   email: { type: Sequelize.STRING, unique: true, length: 50, validate: { isEmail: true, notNull: true } },
//   password: { type: Sequelize.STRING, validate: { notNull: true } }
// });

export default users;

