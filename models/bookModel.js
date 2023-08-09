
const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    name: { type: String,required:true},
    author: { type: String,required:true },
    publishDate: { type: Date, required:true },
    status: { type: Number, required:true},
    price: { type: Number, required:true }
}, {
    timestamps: true    
})

module.exports = mongoose.model('Book', bookSchema)