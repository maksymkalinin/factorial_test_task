import { IsString } from 'class-validator';

export class UpdateTodoListDTO {
  @IsString()
  readonly name: string;
}
