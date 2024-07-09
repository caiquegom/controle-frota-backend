import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Delivery } from './delivery.entity';

export enum CargoType {
  ELETRONIC = 'eletronic',
  FUEL = 'fuel',
  OTHER = 'other',
}

@Entity('cargos')
export class Cargo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'enum', enum: CargoType })
  type: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @OneToOne(() => Delivery, (delivery) => delivery.destiny)
  deliveries: Delivery[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
