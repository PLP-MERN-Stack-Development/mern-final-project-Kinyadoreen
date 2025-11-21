import request from 'supertest';
import app from '../server.js';
import Course from '../models/Course.js';
import User from '../models/User.js';

describe('Course Endpoints', () => {
  let teacherToken;
  let studentToken;
  let courseId;

  beforeAll(async () => {
    // Register teacher
    const teacherRes = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Teacher',
        email: 'teacher@test.com',
        password: 'password123',
        role: 'teacher',
      });
    teacherToken = teacherRes.body.token;

    // Register student
    const studentRes = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Student',
        email: 'student@test.com',
        password: 'password123',
        role: 'student',
      });
    studentToken = studentRes.body.token;
  });

  describe('POST /api/courses', () => {
    it('should create course as teacher', async () => {
      const response = await request(app)
        .post('/api/courses')
        .set('Authorization', `Bearer ${teacherToken}`)
        .send({
          title: 'Test Course',
          description: 'Test Description',
          category: 'Programming',
          level: 'beginner',
          lessons: [
            {
              title: 'Lesson 1',
              content: 'Content',
              duration: 30,
              order: 1,
            },
          ],
        });

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.course.title).toBe('Test Course');
      courseId = response.body.course._id;
    });

    it('should not create course as student', async () => {
      const response = await request(app)
        .post('/api/courses')
        .set('Authorization', `Bearer ${studentToken}`)
        .send({
          title: 'Test Course',
          description: 'Test Description',
          category: 'Programming',
        });

      expect(response.status).toBe(403);
    });
  });

  describe('GET /api/courses', () => {
    it('should get all courses', async () => {
      const response = await request(app).get('/api/courses');

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.courses)).toBe(true);
    });
  });

  describe('POST /api/courses/:id/enroll', () => {
    it('should enroll in course', async () => {
      const response = await request(app)
        .post(`/api/courses/${courseId}/enroll`)
        .set('Authorization', `Bearer ${studentToken}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
    });
  });
});