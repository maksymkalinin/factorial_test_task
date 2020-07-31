import { IsNumber, IsString, IsOptional } from 'class-validator';

export class UpdateTodoItemDTO {
  @IsOptional()
  @IsString()
  readonly text?: string;

  @IsOptional()
  @IsNumber()
  readonly todoListId?: number;
}
