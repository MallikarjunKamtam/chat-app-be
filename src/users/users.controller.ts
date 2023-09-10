import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserDTO } from './dto/createUser.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAllUsers(): Promise<User[]> {
    return await this.usersService.getAllUsers();
  }

  @Post()
  async createUser(@Body() userData: CreateUserDTO): Promise<User> {
    return await this.usersService.createUser(userData);
  }

  @Get(':id')
  async findUserById(@Param('id') id: number): Promise<User | undefined> {
    return await this.usersService.findUserById(+id);
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: number,
    @Body() userData: CreateUserDTO,
  ): Promise<User | undefined> {
    return await this.usersService.updateUser(+id, userData);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number): Promise<void> {
    await this.usersService.deleteUser(+id);
  }
}
