import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { CreateTodoItemDTO, UpdateTodoItemDTO } from './dto';
import { TodoItem } from './todoItem.entity';
import { TodoItemService } from './todoItem.service';

@Controller('todo-item')
export class TodoItemController {
  constructor(private readonly todoItemService: TodoItemService) {}

  @Get('/')
  public getAll(): Promise<TodoItem[]> {
    return this.todoItemService.getAll();
  }

  @Get('/:id')
  public getOne(@Param('id') id: number) {
    return this.todoItemService.getOne(id);
  }

  @Post('/')
  public create(@Body() data: CreateTodoItemDTO) {
    return this.todoItemService.create(data);
  }

  @Patch('/:id')
  public patch(@Param('id') id: number, @Body() data: UpdateTodoItemDTO) {
    return this.todoItemService.update(id, data);
  }

  @Delete('/:id')
  public delete(@Param('id') id: number) {
    return this.todoItemService.delete(id);
  }
}
