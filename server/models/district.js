
const district = (sequelize, DataTypes) => {
  const tbl = sequelize.define('district', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      length: 50,
    },
    state_id: {
      type: DataTypes.INTEGER,
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

export default district;


