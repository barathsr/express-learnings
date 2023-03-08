import mongoose, { Schema } from "mongoose";

const blogScheme = new mongoose.Schema({
    name: {
        type : String,
        required : true
    },
    age: {
        type : Number,
        required : true
    },
    color: {
        type : String,
        required : true
    }

})

export default mongoose.model('schema', blogScheme);