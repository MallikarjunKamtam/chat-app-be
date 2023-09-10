// users/entities/message.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  auto_id: number;

  @Column()
  id: string;

  @Column()
  content: string;

  @ManyToOne(() => User, (user) => user.sent_messages)
  sender: number;

  @ManyToOne(() => User, (user) => user.received_messages)
  receiver: number;

  @Column()
  created_at: string;
}
