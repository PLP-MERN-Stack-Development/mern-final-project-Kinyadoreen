import api from '../../utils/api.js';

// Login
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: 'LOGIN_REQUEST' });

    const response = await api.post('/auth/login', { email, password });

    // Save token
    localStorage.setItem('token', response.data.token);

    dispatch({
      type: 'LOGIN_SUCCESS',
      payload: response.data
    });

    return { success: true };
  } catch (error) {
    dispatch({
      type: 'LOGIN_FAILURE',
      payload: error.response?.data?.message || 'Login failed'
    });
    return { success: false, error: error.response?.data?.message };
  }
};

// Register
export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: 'REGISTER_REQUEST' });

    const response = await api.post('/auth/register', userData);

    // Save token
    localStorage.setItem('token', response.data.token);

    dispatch({
      type: 'REGISTER_SUCCESS',
      payload: response.data
    });

    return { success: true };
  } catch (error) {
    dispatch({
      type: 'REGISTER_FAILURE',
      payload: error.response?.data?.message || 'Registration failed'
    });
    return { success: false, error: error.response?.data?.message };
  }
};

// Logout
export const logout = () => (dispatch) => {
  localStorage.removeItem('token');
  dispatch({ type: 'LOGOUT' });
};
