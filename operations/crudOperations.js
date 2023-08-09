const { query } = require('express')
const { findById } = require('../models/bookModel')
const book = require('../models/bookModel')
const mongoose = require('mongoose')

// require('dotenv').config()


// createRecord


async function createRecord(data) {


   return book.create(data)

}

//readRecord

async function readRecord(data) {
   const search = data.search
   const pageNumber = data.pageNumber
   const limit = data.limit
   const skip = (pageNumber - 1) * limit
   let query = {}
   if (search) {
      query = {
         $or: [
            { name: { $regex: search, $options: "i" } },
            { author: { $regex: search, $options: "i" } },
         ]
      }
   }
   const queryCount = await book.countDocuments(query)//count documents
   // queryCountLength = queryCount.length
   // console.log(queryCountLength)
   const totalPages = Math.ceil((queryCount / limit))
   console.log(totalPages)
   const result =await  book.find(query).skip(skip).limit(limit)
   return ({
      totalpage:totalPages,
      result:result
   })



}




//updateRecord
async function updateRecord(data) {
   const id = data._id
   return book.updateOne({ _id: id }, { $set: data })


}

// async function deleteRecord(data) {
//    const id=data._id
//    result=  await book.updateone({_id:id},{$set:data})

// }


module.exports = { readRecord, createRecord, updateRecord }