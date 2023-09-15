import { Controller, Body, Post, Get, Param } from '@nestjs/common';
import { CreateMessageDTO } from './dto/createMessage.dto';
import { Message } from './entity/messages.entity';
import { MessagesService } from './messages.service';
import { UsersService } from 'src/users/users.service';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) { }

  @Post()
  async createMessage(@Body() msgBody: CreateMessageDTO): Promise<Message> {
    return await this.messagesService.createMessage(msgBody);
  }

  @Get(':user_id')
  async getAllMessages(
    @Param('user_id') id: number,
  ): Promise<Message[] | undefined> {
    return await this.messagesService.getAllMessages(id);
  }
}
