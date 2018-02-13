
const tutor = (sequelize, DataTypes) => {
  const tbl = sequelize.define('tutor', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
    },
    gender: {
      type: DataTypes.ENUM('M', 'F'),
      allowNull: false
    },
    min_rate: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 100,
        max: 50000,
      }
    },   
    max_rate: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 100,
        max: 50000,
      }
    },
    summary: {
      type: DataTypes.STRING,
      allowNull: false,
      length: 120,
    },
    about_me: {
      type: DataTypes.STRING,
      length: 2000
    },
    subject_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    about_session: {
      type: DataTypes.STRING,
      length: 2000
    },
    qualification: {
      type: DataTypes.STRING,
      allowNull: false,
      length: 2000
    },
    availability: {
      type: DataTypes.STRING,
      allowNull: false,
      length: 1000
    },
    state_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    district_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    comment: {
      type: DataTypes.STRING,
      length: 1000
    },
    is_hidden: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    paranoid: true,
    timestamps: true,
    underscored: true,
    freezeTableName: true
  });
  return tbl;
};


export default tutor;
