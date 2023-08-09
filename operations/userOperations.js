
const user = require('../models/userModel')
const mongoose = require('mongoose')
require('dotenv').config()


// createRecord


async function createUserRecord(data) {


   return user.create(data)


}



async function findUserRecord(data) {

   let email = data.email;
   return user.findOne({ email })


}
module.exports = { createUserRecord, findUserRecord }