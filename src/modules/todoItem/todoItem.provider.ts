import { Connection, Repository } from 'typeorm';
import { TodoItem } from './todoItem.entity';

export const todoItemProviders = {
  provide: 'TODO_ITEM_REPOSITORY',
  useFactory: (connection: Connection): Repository<TodoItem> =>
    connection.getRepository(TodoItem),
  inject: ['DATABASE_CONNECTION'],
};
