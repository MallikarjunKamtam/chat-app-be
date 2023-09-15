import { Message } from 'src/messages/entity/messages.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  user_name: string;

  @Column()
  password: string;

  @OneToMany(() => Message, (message) => message.sender)
  sent_messages: Message[];

  @OneToMany(() => Message, (message) => message.receiver)
  received_messages: Message[];
}
