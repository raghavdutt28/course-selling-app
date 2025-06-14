import React, { useState, useEffect } from 'react';
import apiClient from '../api';

function Courses() {
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await apiClient.get('/courses');
        setCourses(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    const fetchEnrolledCourses = async () => {
      try {
        const response = await apiClient.get('/users/enrolled-courses');
        setEnrolledCourses(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCourses();
    fetchEnrolledCourses();
  }, []);

  const handleEnroll = async (courseId) => {
    try {
      await apiClient.post(`/courses/${courseId}/enroll`);
      setEnrolledCourses((prevEnrolled) => [...prevEnrolled, courseId]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeenroll = async (courseId) => {
    try {
      await apiClient.post(`/courses/${courseId}/deenroll`);
      // Update enrolledCourses state
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Courses Page</h1>
      <ul>
        {courses.map((course) => (
          <li key={course._id}>
            <a href={`/courses/${course._id}`}>{course.name}</a>
            <button onClick={() => handleEnroll(course._id)}>Enroll</button>
            <button onClick={() => handleDeenroll(course._id)}>De-enroll</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Courses;