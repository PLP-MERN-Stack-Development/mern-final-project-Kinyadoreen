import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../utils/api.js';

// Fetch all courses
export const useCourses = () => {
  return useQuery({
    queryKey: ['courses'],
    queryFn: async () => {
      const response = await api.get('/courses');
      return response.data;
    },
  });
};

// Fetch single course by ID
export const useCourse = (id) => {
  return useQuery({
    queryKey: ['course', id],
    queryFn: async () => {
      const response = await api.get(`/courses/${id}`);
      return response.data;
    },
    enabled: !!id, // Only run if ID exists
  });
};

// Create course mutation
export const useCreateCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (courseData) => {
      const response = await api.post('/courses', courseData);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate and refetch courses list
      queryClient.invalidateQueries({ queryKey: ['courses'] });
    },
  });
};

// Update course mutation
export const useUpdateCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }) => {
      const response = await api.put(`/courses/${id}`, data);
      return response.data;
    },
    onSuccess: (data, variables) => {
      // Invalidate specific course and courses list
      queryClient.invalidateQueries({ queryKey: ['course', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['courses'] });
    },
  });
};

// Delete course mutation
export const useDeleteCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      await api.delete(`/courses/${id}`);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
    },
  });
};

// Enroll in course mutation
export const useEnrollCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (courseId) => {
      const response = await api.post('/enrollments', { courseId });
      return response.data;
    },
    onSuccess: () => {
      // Refetch enrolled courses and dashboard stats
      queryClient.invalidateQueries({ queryKey: ['enrolledCourses'] });
      queryClient.invalidateQueries({ queryKey: ['dashboardStats'] });
    },
  });
};
