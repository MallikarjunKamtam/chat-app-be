import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getConnection } from 'typeorm';
import { Message } from './entity/messages.entity';
import { CreateMessageDTO } from './dto/createMessage.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly msgRepository: Repository<Message>,

  ) { }

  async createMessage(msg: CreateMessageDTO): Promise<Message> {
    const currentTime = new Date().getTime()?.toString();
    const id = currentTime + String(msg.sender) + String(msg.receiver);

    const data = {
      ...msg,
      created_at: String(currentTime),
      id,

    };

    const createdMsg = this.msgRepository.create(data);

    return await this.msgRepository.save(createdMsg);
  }

  async getAllMessages({ receiverId, senderId }: { senderId: number; receiverId: number }): Promise<Message[]> {
    const res = await this.msgRepository
      .createQueryBuilder('message')
      .leftJoinAndSelect('message.sender', 'sender')
      .leftJoinAndSelect('message.receiver', 'receiver')
      .where('(sender.id = :senderId OR receiver.id = :senderId)', { senderId })
      .andWhere('(sender.id = :receiverId OR receiver.id = :receiverId)', { receiverId })
      .getMany();

    return res;
  }
  async getOneMessageById(id: string) {
    const msg = await this.msgRepository.findOne({ where: { id } });

    if (!msg) {
      throw new NotFoundException('MSG with this id does not exist');
    } else {
      return msg;
    }
  }

  async deleteMessage(id: string): Promise<void> {
    const msg = await this.getOneMessageById(id);
    if (!msg) throw new NotFoundException(`Message with ID ${id} not found`);
    await this.msgRepository.remove(msg);
  }
}




// .createQueryBuilder('message')
//       .where('(message.sender = :user_id OR message.receiver = :user_id)', {
//         user_id,
//       })
//       .orderBy('message.created_at', 'ASC')
//       .getMany();