import { IsString, Length } from 'class-validator';

export class CreateMessageDTO {
  @IsString()
  content: string;
  sender: number;
  receiver: number;
}
