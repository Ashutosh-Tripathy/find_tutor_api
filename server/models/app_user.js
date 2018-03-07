
const app_user = (sequelize, DataTypes) => {
  const tbl = sequelize.define('app_user', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      length: 100,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      length: 100
    },
    is_email_verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      length: 50,
    },
    mobile: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      validate: {
        len: [10, 10]
      }
    },
    type: {
      type: DataTypes.ENUM('S', 'T'),
      allowNull: false
    }
  }, {
    paranoid: false,
    timestamps: false,
    underscored: true,
    freezeTableName: true
  });
  return tbl;
};


export default app_user;


