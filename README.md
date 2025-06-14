# Course Selling App

## Overview

This is a full-stack course selling application built with a Node.js/Express backend and a React/Vite frontend. It uses MongoDB as the database and Mongoose for data modeling.

## Features

### Server-side

* User authentication: signup and login functionality using JWT
* Course management: CRUD operations for courses (restricted to admins)
* User enrollment and de-enrollment in courses

### Client-side

* React-based frontend with client-side routing using React Router
* Pages for:
  * Home
  * Signup
  * Login
  * Courses listing
  * Course details
  * Admin dashboard

## Technology Stack

* Backend: Node.js, Express.js, MongoDB, Mongoose
* Frontend: React, Vite

## Project Structure

The project is structured as a monorepo with two main folders: `server` for backend code and `client` for frontend code.

## API Endpoints

### Authentication

* POST /api/auth/signup: Create a new user
* POST /api/auth/login: Login a user

### Courses

* POST /api/courses: Create a new course (admin only)
* GET /api/courses: Get all courses
* GET /api/courses/:id: Get a course by ID
* PUT /api/courses/:id: Update a course (admin only)
* DELETE /api/courses/:id: Delete a course (admin only)
* POST /api/courses/:id/enroll:user.enroll=course
截至目前，我们在 README.md 文件中添加了更多详细信息，包括实际实现的功能和 API 端点。