import axios from 'axios';

const API_BASE_URL = 'https://veiopads.netlify.app/api/ana-alvarez';

export const getTasks = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/tasks`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch tasks:', error);
    throw error;
  }
};

export const createTask = async (task) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/tasks`, task);
    return response.data;
  } catch (error) {
    console.error('Failed to create task:', error);
    throw error;
  }
};

export const updateTaskStep = async (id, step) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/tasks/${id}/update-step`, { step });
    return response.data;
  } catch (error) {
    console.error('Failed to update task step:', error);
    throw error;
  }
};

export const deleteTask = async (id) => {
  try {
    await axios.delete(`${API_BASE_URL}/tasks/${id}`);
  } catch (error) {
    console.error('Failed to delete task:', error);
    throw error;
  }
};

export const getTask = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/tasks/${id}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch task:', error);
    throw error;
  }
};

export const editTask = async (id, task) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/tasks/${id}`, task);
    return response.data;
  } catch (error) {
    console.error('Failed to edit task:', error);
    throw error;
  }
};


