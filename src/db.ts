import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('taskdb', 'postgres', 'postgres', {
  host: 'localhost',
  port: 5431,
  dialect: 'postgres',
});

export default sequelize;