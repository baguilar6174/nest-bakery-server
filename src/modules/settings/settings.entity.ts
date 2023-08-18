import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';

@Entity({ name: 'tb_settings' })
export class Settings extends BaseEntity {
  @Column({ nullable: false, type: 'text' })
  config: string;

  @Column({ name: 'id_user', nullable: false, type: 'int' })
  idUser: number;
}
