const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://parth:india1142@cluster0.nexb8.mongodb.net/")

const todoDBschema = mongoose.Schema({
    title: String,
    description : String,
    status : Boolean
})

const todo = mongoose.model('todos',todoDBschema);

module.exports = {
    todo
}