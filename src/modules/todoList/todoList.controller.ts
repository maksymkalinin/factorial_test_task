import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { CreateTodoListDTO, UpdateTodoListDTO } from './dto';
import { TodoList } from './todoList.entity';
import { TodoListService } from './todoList.service';

@Controller('todo-list')
export class TodoListController {
  constructor(private readonly todoListService: TodoListService) {}

  @Get('/')
  public getAll(): Promise<TodoList[]> {
    return this.todoListService.getAll();
  }

  @Get('/:id')
  public getOne(@Param('id') id: number) {
    return this.todoListService.getOne(id);
  }

  @Post('/')
  public create(@Body() data: CreateTodoListDTO) {
    return this.todoListService.create(data);
  }

  @Put('/:id')
  public put(@Param('id') id: number, @Body() data: UpdateTodoListDTO) {
    return this.todoListService.update(id, data);
  }

  @Delete('/:id')
  public delete(@Param('id') id: number) {
    return this.todoListService.delete(id);
  }
}
