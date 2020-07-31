import { Module } from '@nestjs/common';
import { TodoItemController } from './todoItem.controller';
import { TodoItemService } from './todoItem.service';
import { todoItemProviders } from './todoItem.provider';

import { TodoListModule } from '../todoList/todoList.module';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule, TodoListModule],
  providers: [TodoItemService, todoItemProviders],
  controllers: [TodoItemController],
})
export class TodoItemModule {}
