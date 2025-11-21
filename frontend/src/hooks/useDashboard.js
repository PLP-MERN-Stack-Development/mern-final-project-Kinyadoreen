import { useQuery } from '@tanstack/react-query';
import api from '../utils/api.js';

const useDashboard = () => {
  // Fetch dashboard stats
  const statsQuery = useQuery({
    queryKey: ['dashboardStats'],
    queryFn: async () => {
      const response = await api.get('/dashboard/stats');
      return response.data;
    },
  });

  // Fetch enrolled courses
  const coursesQuery = useQuery({
    queryKey: ['enrolledCourses'],
    queryFn: async () => {
      const response = await api.get('/enrollments/my-courses');
      return response.data;
    },
  });

  // Fetch recent activities
  const activitiesQuery = useQuery({
    queryKey: ['recentActivities'],
    queryFn: async () => {
      const response = await api.get('/dashboard/activities');
      return response.data;
    },
  });

  return {
    stats: {
      data: statsQuery.data,
      isLoading: statsQuery.isLoading,
      error: statsQuery.error,
    },
    courses: {
      data: coursesQuery.data,
      isLoading: coursesQuery.isLoading,
      error: coursesQuery.error,
    },
    activities: {
      data: activitiesQuery.data,
      isLoading: activitiesQuery.isLoading,
      error: activitiesQuery.error,
    },
    isLoading: statsQuery.isLoading || coursesQuery.isLoading || activitiesQuery.isLoading,
    refetch: () => {
      statsQuery.refetch();
      coursesQuery.refetch();
      activitiesQuery.refetch();
    },
  };
};

export default useDashboard;
