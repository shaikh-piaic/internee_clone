import mongoose from "mongoose";

const courseSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true,
        default: 1
    },
}, { timestamps: true })

const Courses = mongoose.model("Courses", courseSchema)
export default Courses