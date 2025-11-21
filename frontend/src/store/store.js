import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice.js';
import courseReducer from './slices/courseSlice.js';
import enrollmentReducer from './slices/enrollmentSlice.js';

const store = configureStore({
  reducer: {
    auth: authReducer,
    courses: courseReducer,
    enrollments: enrollmentReducer,
  },
});

export default store;
