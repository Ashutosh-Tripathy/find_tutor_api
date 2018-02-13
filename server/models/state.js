
const state = (sequelize, DataTypes) => {
  const tbl = sequelize.define('state', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      length: 50,
      unique: true
    }
  }, {
    paranoid: false,
    timestamps: false,
    underscored: true,
    freezeTableName: true
  });
  return tbl;
};

export default state;


