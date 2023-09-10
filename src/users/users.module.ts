import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

const dependencies = [TypeOrmModule.forFeature([User])];

@Module({
  imports: [...dependencies],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
