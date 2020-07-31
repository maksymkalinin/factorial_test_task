import { Injectable, Inject, HttpException } from '@nestjs/common';

import { Repository } from 'typeorm';

import { TodoList } from './todoList.entity';
import { CreateTodoListDTO, UpdateTodoListDTO } from './dto';

@Injectable()
export class TodoListService {
  constructor(
    @Inject('TODO_LIST_REPOSITORY')
    private readonly todoListRepository: Repository<TodoList>
  ) {}

  public getAll(): Promise<TodoList[]> {
    return this.todoListRepository.find();
  }

  public getOne(id: number): Promise<TodoList> {
    return this.todoListRepository.findOne(id, { relations: ['todoItems'] });
  }

  public async create(data: CreateTodoListDTO): Promise<TodoList> {
    const doesNameExist = await this.todoListRepository.findOne({ name: data.name });
    if (doesNameExist) {
      throw new HttpException('Todo List name already exists', 400);
    }
    const createdTodoList = this.todoListRepository.create(data);
    await this.todoListRepository.save(createdTodoList);
    return createdTodoList;
  }

  public async update(id: number, data: UpdateTodoListDTO): Promise<TodoList> {
    const todoListToUpdate = await this.todoListRepository.findOne(id);
    if (!todoListToUpdate) {
      throw new HttpException('Todo List not found', 404);
    }
    todoListToUpdate.name = data.name;
    await this.todoListRepository.save(todoListToUpdate);
    return todoListToUpdate;
  }

  public async delete(id: number): Promise<TodoList> {
    const todoListToRemove: TodoList = await this.todoListRepository.findOne(id);
    if (!todoListToRemove) {
      throw new HttpException('Todo List not found', 404);
    }
    return this.todoListRepository.remove(todoListToRemove);
  }
}
