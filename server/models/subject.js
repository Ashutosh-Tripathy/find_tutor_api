
const subject = (sequelize, DataTypes) => {
  const tbl = sequelize.define('subject', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      length: 100,
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

export default subject;


