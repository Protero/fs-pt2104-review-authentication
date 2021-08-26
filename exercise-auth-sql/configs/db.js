const slonik = require('slonik');
const  SLONIK_URL=process.env.SLONIK_URL;

module.exports = slonik.createPool(SLONIK_URL);