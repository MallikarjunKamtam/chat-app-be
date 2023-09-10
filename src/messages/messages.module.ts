import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './entity/messages.entity';

const dependencies = [TypeOrmModule.forFeature([Message])];

@Module({
  imports: [...dependencies],
  controllers: [MessagesController],
  providers: [MessagesService],
})
export class MessagesModule {}
