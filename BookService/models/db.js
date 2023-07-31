require('dotenv').config();
const { Sequelize } = require('sequelize');

const db_client = new Sequelize(
    "goodreadsclone",
    process.env.POSTGRES_HOSTNAME,
    process.env.POSTGRES_PWD,
    {
        host: 'localhost',
        dialect: 'postgres'
    }
);

db_client.authenticate()
        .then(() => { console.log('connected') })
        .catch(err => {console.log(err)})

module.exports = db_client