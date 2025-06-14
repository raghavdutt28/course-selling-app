import React from 'react';
import { useParams } from 'react-router-dom';
import apiClient from '../api';

function CourseDetails() {
  const { courseId } = useParams();
  const [course, setCourse] = React.useState({});

  React.useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await apiClient.get(`/courses/${courseId}`);
        setCourse(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCourse();
  }, [courseId]);

  return (
    <div>
      <h1>Course Details</h1>
      <h2>{course.title}</h2>
      <p>{course.description}</p>
      <p>Price: {course.price}</p>
    </div>
  );
}

export default CourseDetails;