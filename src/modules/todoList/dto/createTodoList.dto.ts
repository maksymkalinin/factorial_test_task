import { IsString } from 'class-validator';

export class CreateTodoListDTO {
  @IsString()
  readonly name: string;
}
