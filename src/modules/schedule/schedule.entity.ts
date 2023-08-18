import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from 'src/modules/user/entities';

@Entity({ name: 'tb_schedule' })
export class Schedule {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: false, type: 'varchar', length: 10 })
  day: string;

  @Column({ name: 'start_time', nullable: false, type: 'time' })
  startTime: string;

  @Column({ name: 'end_time', nullable: false, type: 'time' })
  endTime: string;

  @ManyToOne(() => User, (user) => user.schedules, { cascade: true })
  @JoinColumn({ name: 'id_user' })
  user: User;
}
