import { Module } from '@nestjs/common';
import { TodoListService } from './todoList.service';
import { TodoListController } from './todoList.controller';
import { todoListProviders } from './todoList.provider';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [TodoListService, todoListProviders],
  controllers: [TodoListController],
  exports: [TodoListService],
})
export class TodoListModule {}
