import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const initialState = {
  enrollments: [],
  myCourses: [],
  isLoading: false,
  isError: false,
  message: '',
};

// Get user's enrolled courses
export const getMyCourses = createAsyncThunk(
  'enrollments/getMyCourses',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const response = await axios.get(`${API_URL}/api/enrollments/my-courses`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.courses || response.data;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const enrollmentSlice = createSlice({
  name: 'enrollments',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMyCourses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMyCourses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.myCourses = action.payload;
      })
      .addCase(getMyCourses.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = enrollmentSlice.actions;
export default enrollmentSlice.reducer;