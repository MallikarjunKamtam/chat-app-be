import { IsString, Length } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  user_name: string;

  @IsString()
  @Length(7, 20)
  password: string;
}
