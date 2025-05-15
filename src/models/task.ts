import { DataTypes, Model } from 'sequelize';

import sequelize from '../db';

interface TaskInstance extends Model {
  id: string;
  name: string;
  description: string;
  status: 'to-do' | 'in-progress' | 'completed';
  createdAt: Date;
  updatedAt: Date;
}

const TaskModel = sequelize.define<TaskInstance>('Task', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.ENUM('to-do', 'in-progress', 'completed'),
    defaultValue: 'to-do',
  },
  assignee: {
    type: DataTypes.STRING,
  },
});

sequelize.sync({ alter: true })
  .then(() => {
    console.log('Task table created successfully');
  })
  .catch((error) => {
    console.error('Error creating Task table:', error);
  });

export { TaskModel, TaskInstance };