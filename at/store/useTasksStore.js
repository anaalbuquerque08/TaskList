// ANTIGO
import create from 'zustand';

const useTasksStore = create((set) => ({
  tasks: [],
  setTasks: (tasks) => set({ tasks }),
}));

export default useTasksStore;