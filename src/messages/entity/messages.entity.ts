
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Expose } from 'class-transformer'

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  auto_id: number;

  @Column()
  id: string;

  @Column()
  content: string;


  @Column()
  created_at: string;


  @ManyToOne(() => User, (user) => user.sent_messages)
  @JoinColumn({ name: 'senderId' })
  sender: User;



  @ManyToOne(() => User, (user) => user.received_messages)
  @JoinColumn({ name: 'receiverId' })
  receiver: User;




}
