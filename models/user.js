import sequelize from "sequelize";
const { DataTypes } = sequelize

import db from "./index.js";

const User = db.sequelize.define('user', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.CHAR(40)
  },
  password: {
    type: DataTypes.CHAR(40)
  },
  salt: {
    type: DataTypes.CHAR(8)
  }
})

export default User
