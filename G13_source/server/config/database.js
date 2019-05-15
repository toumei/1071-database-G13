module.exports = {
  mysql: {
    host: "localhost",
    user: "root",
    password: "0000",
    database: "res_net_cmms",
    port: 3306,
    connectionLimit: 10,
    multipleStatements: true
  },
  mysqlSequelize: {
    database: "res_net_cmms",
    user: "root",
    password: "0000",
    config: {
      host: "localhost",
      dialect: "mysql",
      logging: false,
      pool: {
        max: 10,
        min: 0,
        idle: 30000
      },
      define: {
        timestamps: false,
        freezeTableName: true
      }
    }
  }
};
