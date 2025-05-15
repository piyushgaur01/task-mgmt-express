import { TaskModel, TaskInstance } from '../models/task';

class TaskService {
  async createTask(taskData: Omit<TaskInstance, 'id' | 'createdAt' | 'updatedAt' | 'status' | 'setDataValue' | 'getDataValue' | 'toJSON' | 'changed' | 'increment' | 'decrement' | 'reload' | 'save' | 'destroy' | 'validate' | 'equals' | 'get' | 'set' | 'has' | 'Model'>): Promise<TaskInstance> {
    try {
      const task = await TaskModel.create({ ...taskData, status: 'to-do' });
      return task;
    } catch (error) {
      console.error("Error creating task:", error);
      throw error;
    }
  }

  async getTasks(): Promise<TaskInstance[]> {
    try {
      const tasks = await TaskModel.findAll();
      return tasks;
    } catch (error) {
      console.error("Error getting tasks:", error);
      throw error;
    }
  }

  async getTaskById(id: string): Promise<TaskInstance | null> {
    try {
      const task = await TaskModel.findByPk(id);
      return task;
    } catch (error) {
      console.error("Error getting task by id:", error);
      throw error;
    }
  }

  async updateTask(id: string, taskData: Partial<TaskInstance>): Promise<TaskInstance | null> {
    try {
      const task = await TaskModel.findByPk(id);
      if (!task) {
        return null;
      }
      await task.update(taskData);
      return task;
    } catch (error) {
      console.error("Error updating task:", error);
      throw error;
    }
  }

  async deleteTask(id: string): Promise<boolean> {
    try {
      const task = await TaskModel.findByPk(id);
      if (!task) {
        return false;
      }
      await task.destroy();
      return true;
    } catch (error) {
      console.error("Error deleting task:", error);
      throw error;
    }
  }
}

export default TaskService;