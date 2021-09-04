import { Sequelize } from 'sequelize'
import dbConfig from '../secret/dbConfig.js'

const { database, username, password, timezone, host, dialect } = dbConfig
const sequelize = new Sequelize(database, username, password, {
  host,
  dialect,
  timezone,
}) // 使用内存数据库

;(async () => {
  // await sequelize.authenticate();
  
  // 根据 models，如果数据库上不存在，生成对应 table
  // https://sequelize.org/master/class/lib/sequelize.js~Sequelize.html#instance-method-sync
  // options.force：执行 DROP TABLE IF EXISTS 后，再创建表。慎用，小心清空了线上数据库
  await sequelize.sync()
  console.log('数据库连接成功')
})()

const db = {
  sequelize
}

export default db
