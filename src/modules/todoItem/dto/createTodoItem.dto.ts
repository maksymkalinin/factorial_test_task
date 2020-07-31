import { IsString, IsNumber } from 'class-validator';

export class CreateTodoItemDTO {
  @IsString()
  readonly text: string;

  @IsNumber()
  readonly todoListId: number;
}
