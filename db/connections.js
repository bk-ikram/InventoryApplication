const { Client, Pool } = require('pg');
require('dotenv').config();

const connectionString = process.env.DB_CONNECTION_STRING;

const pool = new Pool({
    connectionString: connectionString
    });

const client = new Client({
    connectionString: connectionString
    });

module.exports = {
    pool,
    client
}