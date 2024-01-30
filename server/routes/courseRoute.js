import express from "express";
import { deleteCourses, getCourses, postCourses, putCourses } from "../controller/courseController.js";

const router = express.Router()

router.get("/courses", getCourses)
router.post("/courses/addcourse", postCourses)
router.get("/courses/:courseId", putCourses)
router.delete("/courses/:courseId", deleteCourses)

export default router