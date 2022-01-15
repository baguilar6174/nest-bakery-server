/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tb_settings' })
export class Settings {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ nullable: false, type: 'text' })
    config: string;

    @Column({ name: 'id_user', nullable: false, type: 'int' })
    idUser: number;
}