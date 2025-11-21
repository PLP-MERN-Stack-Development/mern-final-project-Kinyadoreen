import api from '../../utils/api.js';

// Fetch all courses
export const fetchCourses = () => async (dispatch) => {
  try {
    dispatch({ type: 'FETCH_COURSES_REQUEST' });

    const response = await api.get('/courses');

    dispatch({
      type: 'FETCH_COURSES_SUCCESS',
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: 'FETCH_COURSES_FAILURE',
      payload: error.response?.data?.message || 'Failed to fetch courses'
    });
  }
};

// Fetch single course by ID
export const fetchCourseById = (id) => async (dispatch) => {
  try {
    dispatch({ type: 'FETCH_COURSE_REQUEST' });

    const response = await api.get(`/courses/${id}`);

    dispatch({
      type: 'FETCH_COURSE_SUCCESS',
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: 'FETCH_COURSE_FAILURE',
      payload: error.response?.data?.message || 'Failed to fetch course'
    });
  }
};

// Create new course (instructor only)
export const createCourse = (courseData) => async (dispatch) => {
  try {
    const response = await api.post('/courses', courseData);

    dispatch({
      type: 'CREATE_COURSE_SUCCESS',
      payload: response.data
    });

    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to create course'
    };
  }
};

// Update course
export const updateCourse = (id, courseData) => async (dispatch) => {
  try {
    const response = await api.put(`/courses/${id}`, courseData);

    dispatch({
      type: 'UPDATE_COURSE_SUCCESS',
      payload: response.data
    });

    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to update course'
    };
  }
};

// Delete course
export const deleteCourse = (id) => async (dispatch) => {
  try {
    await api.delete(`/courses/${id}`);

    dispatch({
      type: 'DELETE_COURSE_SUCCESS',
      payload: id
    });

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to delete course'
    };
  }
};

// Clear course errors
export const clearCourseError = () => (dispatch) => {
  dispatch({ type: 'CLEAR_COURSE_ERROR' });
};
