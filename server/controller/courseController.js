import Courses from "../model/course.js"

export const getCourses = async (req, res) => {
    try {
        const courses = await Courses.find().exec()
        res.status(200).json({
            courses,
            total: courses.length
        })
    } catch (error) {
        res.status(404).json({
            error: error.message
        })
    }
}

export const postCourses = async (req, res) => {
    try {
        const { title, image, duration } = req.body
        const isCourseExisting = await Courses.findOne({ title })
        if (isCourseExisting) {
            return res.json({ message: "Course Already Exists" })
        }
        let newCourse = new Courses({
            title, image, duration
        })
        await newCourse.save()

        res.json({
            message: "Course Added Successfully"
        })
    } catch (error) {
        res.json({
            error: "Failed to Add Course",
            message: error.message,
        })
    }
}
export const putCourses = async (req, res) => {
    try {
        const course = await Courses.findOne({ _id: req.params.courseId })

        res.json({
            course
        })
    } catch (error) {
        res.json({
            error: "Failed to Get the Course",
            message: error.message,
        })
    }
}
export const deleteCourses = async (req, res) => {
    try {
        await Courses.findByIdAndDelete(req.params.courseId)

        res.json({
            message: "Course Deleted Successfully",
            // updatedCourse: isCourseExisting
        })
    } catch (error) {
        res.json({
            error: "Failed to Delete the Course",
            message: error.message,
        })
    }
}
