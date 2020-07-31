import { Connection, Repository } from 'typeorm';
import { TodoList } from './todoList.entity';

export const todoListProviders = {
  provide: 'TODO_LIST_REPOSITORY',
  useFactory: (connection: Connection): Repository<TodoList> =>
    connection.getRepository(TodoList),
  inject: ['DATABASE_CONNECTION'],
};
