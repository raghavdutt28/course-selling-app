const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const { isAdmin } = require('../middleware/auth');

// Create a new course
router.post('/', isAdmin, async (req, res) => {
    console.log(req.body);
    try {
        console.log(req.body);
        const course = new Course(req.body);
        await course.save();
        res.status(201).send(course);
    } catch (error) {
        res.status(400).send('Error creating course');
    }
});

// Get all courses
router.get('/', async (req, res) => {
    try {
        const courses = await Course.find();
        res.send(courses);
    } catch (error) {
        res.status(500).send('Error fetching courses');
    }
});

// Get a course by ID
router.get('/:id', async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).send('Course not found');
        }
        res.send(course);
    } catch (error) {
        res.status(500).send('Error fetching course');
    }
});

// Update a course
router.put('/:id', isAdmin, async (req, res) => {
    try {
        const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!course) {
            return res.status(404).send('Course not found');
        }
        res.send(course);
    } catch (error) {
        res.status(400).send('Error updating course');
    }
});

// Delete a course
router.delete('/:id', isAdmin, async (req, res) => {
    try {
        const course = await Course.findByIdAndDelete(req.params.id);
        if (!course) {
            return res.status(404).send('Course not found');
        }
        res.send('Course deleted successfully');
    } catch (error) {
        res.status(500).send('Error deleting course');
    }
});

// Enroll a user in a course
router.post('/:id/enroll', async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        const user = await User.findById(req.user.id);

        if (!course) {
            return res.status(404).send('Course not found');
        }

        if (user.enrolledCourses.includes(course._id)) {
            return res.status(400).send('User already enrolled in this course');
        }

        user.enrolledCourses.push(course._id);
        course.students.push(user._id);

        await user.save();
        await course.save();

        res.send('User enrolled in course successfully');
    } catch (error) {
        res.status(500).send('Error enrolling user in course');
    }
});

// De-enroll a user from a course
router.post('/:id/deenroll', async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        const user = await User.findById(req.user.id);

        if (!course) {
            return res.status(404).send('Course not found');
        }

        if (!user.enrolledCourses.includes(course._id)) {
            return res.status(400).send('User not enrolled in this course');
        }

        user.enrolledCourses = user.enrolledCourses.filter(id => id.toString() !== course._id.toString());
        course.students = course.students.filter(id => id.toString() !== user._id.toString());

        await user.save();
        await course.save();

        res.send('User de-enrolled from course successfully');
    } catch (error) {
        res.status(500).send('Error de-enrolling user from course');
    }
});

module.exports = router;