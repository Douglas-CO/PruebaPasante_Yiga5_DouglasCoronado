const { Pool } = require("pg");
require('dotenv').config();

const pool = new Pool({
  database: process.env.DATABASE_YIGA,
  user: process.env.USER_YIGA,
  port: process.env.PORT_YIGA,
  password: process.env.PASSWORD_YIGA,
  host: process.env.HOST_YIGA,
  ssl: { rejectUnauthorized: false }, // Desactivar la verificación del certificado, úsala con precaución
});

module.exports = pool;
