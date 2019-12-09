const knex = require('knex');

const config = require('../knexfile.js');

//this is being imported in our post-router
module.exports = knex(config.development);