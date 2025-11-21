import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const initialState = {
  stats: {
    totalStudents: 0,
    totalCourses: 0,
    totalEnrollments: 0,
    activeUsers: 0,
  },
  activities: [],
  isLoading: false,
  isError: false,
  message: '',
};

// Get dashboard stats
export const getDashboardStats = createAsyncThunk(
  'dashboard/getStats',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/api/dashboard/stats`);
      return response.data;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get recent activities
export const getActivities = createAsyncThunk(
  'dashboard/getActivities',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/api/dashboard/activities`);
      return response.data.activities || response.data;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const dashboardSlice = createSlice({
  name: 'dashboard',
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
      .addCase(getDashboardStats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDashboardStats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.stats = action.payload;
      })
      .addCase(getDashboardStats.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getActivities.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getActivities.fulfilled, (state, action) => {
        state.isLoading = false;
        state.activities = action.payload;
      })
      .addCase(getActivities.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = dashboardSlice.actions;
export default dashboardSlice.reducer;