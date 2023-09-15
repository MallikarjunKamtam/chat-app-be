import { IsString, Length } from 'class-validator';
import { User } from 'src/users/entities/user.entity';

export class CreateMessageDTO {
  @IsString()
  content: string;
  sender: User;
  receiver: User;
}

