import { Injectable, Inject, HttpException } from '@nestjs/common';

import { Repository } from 'typeorm';

import { TodoItem } from './todoItem.entity';
import { CreateTodoItemDTO, UpdateTodoItemDTO } from './dto';

import { TodoListService } from '../todoList/todoList.service';

@Injectable()
export class TodoItemService {
  constructor(
    @Inject('TODO_ITEM_REPOSITORY')
    private readonly todoItemRepository: Repository<TodoItem>,
    @Inject(TodoListService)
    private readonly todoListService: TodoListService,
  ) {}

  public getAll(): Promise<TodoItem[]> {
    return this.todoItemRepository.find();
  }

  public getOne(id: number): Promise<TodoItem> {
    return this.todoItemRepository.findOne(id);
  }

  public async create(data: CreateTodoItemDTO): Promise<TodoItem> {
    const todoItemData: Partial<TodoItem> = {
      text: data.text,
      todoList: await this.todoListService.getOne(data.todoListId)
    };
    if (!todoItemData.todoList) {
      throw new HttpException('Todo List doesn\'t exist', 400);
    }
    const createdTodoItem = this.todoItemRepository.create(todoItemData);
    await this.todoItemRepository.save(createdTodoItem);
    return createdTodoItem;
  }

  public async update(id: number, data: UpdateTodoItemDTO): Promise<TodoItem> {
    const todoItemToUpdate = await this.todoItemRepository.findOne(id);
    if (!todoItemToUpdate) {
      throw new HttpException('Todo Item not found', 404);
    }
    if (data.text) {
      todoItemToUpdate.text = data.text;
    }
    if (data.todoListId) {
      todoItemToUpdate.todoList = await this.todoListService.getOne(data.todoListId);
      if (!todoItemToUpdate.todoList) {
        throw new HttpException('Todo List doesn\'t exist', 400);
      }
    }
    await this.todoItemRepository.save(todoItemToUpdate);
    return todoItemToUpdate;
  }

  public async delete(id: number): Promise<TodoItem> {
    const todoItemToRemove: TodoItem = await this.todoItemRepository.findOne(id);
    if (!todoItemToRemove) {
      throw new HttpException('Todo Item not found', 404);
    }
    return this.todoItemRepository.remove(todoItemToRemove);
  }
}
