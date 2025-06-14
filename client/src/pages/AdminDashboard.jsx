import React, { useState, useEffect } from 'react';
import apiClient from '../api';

function AdminDashboard() {
  const [courses, setCourses] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await apiClient.get('/courses');
        setCourses(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCourses();
  }, []);

  const [newCourse, setNewCourse] = useState({ title: '', description: '' });

  const handleCreateCourse = async () => {
    try {
      console.log(newCourse);
      const response = await apiClient.post('/courses', newCourse, {
        headers: {
          Authorization: token
        }
      });

      setCourses((prevCourses) => [...prevCourses, response.data]);
      setNewCourse({ title: '', description: '' });
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateCourse = async (courseId) => {
    try {
      const courseToUpdate = courses.find((course) => course._id === courseId);
      const updatedCourse = { ...courseToUpdate, title: 'Updated Title' }; // Example update
      const response = await apiClient.put(`/courses/${courseId}`, updatedCourse, {
        headers: {
          Authorization: token
        }
      });
      setCourses((prevCourses) => prevCourses.map((course) => (course._id === courseId ? response.data : course)));
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteCourse = async (courseId) => {
    try {
      await apiClient.delete(`/courses/${courseId}`, {
        headers: {
          Authorization: token
        }
      });
      setCourses((prevCourses) => prevCourses.filter((course) => course._id !== courseId));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <section>
        <h2>Courses Management</h2>
        <ul>
          {courses.map((course) => (
            <li key={course._id}>
              {course.name}
              <button onClick={() => handleUpdateCourse(course._id)}>Update</button>
              <button onClick={() => handleDeleteCourse(course._id)}>Delete</button>
            </li>
          ))}
        </ul>
        <div>
          <input
            type="text"
            placeholder="Title"
            value={newCourse.title}
            onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
          />
          <input
            type="text"
            placeholder="Description"
            value={newCourse.description}
            onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
          />
          <button onClick={handleCreateCourse}>Create New Course</button>
        </div>
      </section>
    </div>
  );
}

export default AdminDashboard;