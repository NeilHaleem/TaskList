//https://node-postgres.com/

const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "postgres1",
  host: "localhost",
  port: 5432,
  database: "tasklistDB"
});

module.exports = pool;