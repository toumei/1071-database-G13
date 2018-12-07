module.exports = {
    mysql: {
        host: 'localhost',
        user: 'root',
        password: '0000',
        database: 'dbdemo',
        port: 3306,
        connectionLimit: 10
    },
    mysql2: {
        host: 'localhost',
        user: 'root',
        password: '0000',
        database: 'res_net_cmms',
        port: 3306,
        connectionLimit: 10,
        multipleStatements: true
    }
};
