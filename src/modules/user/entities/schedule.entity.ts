/* eslint-disable prettier/prettier */
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { User } from './user.entity';

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

    @ManyToOne((type) => User, (user) => user.schedules, { cascade: true, eager: false })
    @JoinColumn({ name: 'id_user' })
    user: User;
}