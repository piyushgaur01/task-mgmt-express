import { Router, Request, Response } from 'express';
import TaskService from '../services/TaskService';

const router = Router();

const taskService = new TaskService();

router.route('/tasks')
  .get(async (req: Request, res: Response) => {
    try {
      const tasks = await taskService.getTasks();
      res.status(200).json(tasks);
    } catch (error) {
      console.error("Error getting tasks:", error);
      res.status(500).json({ error: 'Internal server error' });
    }
  })
  .post(async (req: Request, res: Response) => {
    try {
      const taskData = req.body;
      const task = await taskService.createTask(taskData);
      res.status(201).json(task);
    } catch (error) {
      console.error("Error creating task:", error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

router.route('/tasks/:id')
  .get(async (req: Request, res: Response) => {
    try {
      const taskId = req.params.id;
      const task = await taskService.getTaskById(taskId);
      if (!task) {
        res.status(404).json({ error: 'Task not found' });
      }
      res.status(200).json(task);
    } catch (error: any) {
      console.error("Error getting task by id:", error);
      res.status(500).json({ error: error.message });
      return;
    }
  })
  .put(async (req: Request, res: Response) => {
    try {
      const taskId = req.params.id;
      const taskData = req.body;
      const task = await taskService.updateTask(taskId, taskData);
      if (!task) {
        res.status(404).json({ error: 'Task not found' });
      }
      res.status(200).json(task);
    } catch (error) {
      console.error("Error updating task:", error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
  })
  .delete(async (req: Request, res: Response) => {
    try {
      const taskId = req.params.id;
      const success = await taskService.deleteTask(taskId);
      if (!success) {
        res.status(404).json({ error: 'Task not found' });
      }
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting task:", error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
  }
  );

export default router;