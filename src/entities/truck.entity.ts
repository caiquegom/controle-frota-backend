import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Delivery } from './delivery.entity';
import { Driver } from './driver.entity';

@Entity('trucks')
export class Truck {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  plate: string;

  @Column({ type: 'varchar' })
  brand: string;

  @Column({ type: 'varchar' })
  model: string;

  @Column({ type: 'varchar', length: 4 })
  year: string;

  @Column({ type: 'float' })
  capacity: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToOne(() => Driver, (driver) => driver.truck, { nullable: true })
  @JoinColumn({ name: 'driverId' })
  driver: Driver;

  @OneToMany(() => Delivery, (delivery) => delivery.truck)
  deliveries: Delivery[];
}
