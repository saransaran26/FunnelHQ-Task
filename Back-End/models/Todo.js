import mongoose from 'mongoose'

const TodoSchema = new mongoose.Schema({
    name:String,
    email:String,
    age:Number,
})

const TodoModel = mongoose.model("Todo",TodoSchema)

export {TodoModel}