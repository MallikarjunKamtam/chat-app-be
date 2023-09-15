import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDTO } from './dto/createUser.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async createUser(userData: CreateUserDTO): Promise<User> {
    const data = { ...userData, sent_messages: [], received_messages: [] };
    const user = this.userRepository.create(data);
    return await this.userRepository.save(user);
  }

  async findUserById(id: number): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: { id } });
  }

  async findUserByUserName(user_name: string): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: { user_name } });
  }


  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async updateUser(id: number, user: CreateUserDTO): Promise<User | undefined> {
    const currentUser = await this.findUserById(id);

    if (!currentUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    currentUser.password = user.password;
    currentUser.user_name = user.user_name;

    return await this.userRepository.save(currentUser);
  }

  async deleteUser(id: number): Promise<void> {
    const user = await this.findUserById(id);
    if (!user) throw new NotFoundException(`User with ID ${id} not found`);
    await this.userRepository.remove(user);
  }
}
