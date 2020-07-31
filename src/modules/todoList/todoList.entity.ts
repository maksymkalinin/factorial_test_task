import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { TodoItem } from '../todoItem/todoItem.entity';

@Entity()
export class TodoList {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @OneToMany(
    (type) => TodoItem,
    (todoItem) => todoItem.todoList
  )
  todoItems: TodoItem[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
