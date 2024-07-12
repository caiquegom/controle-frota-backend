import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Cargo } from './cargo.entity';
import { Driver } from './driver.entity';
import { Region } from './region.entity';
import { Truck } from './truck.entity';

@Entity('deliveries')
export class Delivery {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'float' })
  value: number;

  @Column({ type: 'float' })
  tax: number;

  @Column({ type: 'float' })
  totalValue: number;

  @Column({ type: 'boolean' })
  isValuable: boolean;

  @Column({ type: 'boolean' })
  isDangerous: boolean;

  @Column({ type: 'boolean' })
  hasInsurance: boolean;

  @Column({ type: 'timestamp' })
  deliveryDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => Region, (region) => region.deliveries)
  @JoinColumn({ name: 'destinyId' })
  destiny: Region;

  @ManyToOne(() => Truck, (truck) => truck.deliveries)
  @JoinColumn({ name: 'truckId' })
  truck: Truck;

  @ManyToOne(() => Driver, (driver) => driver.deliveries)
  @JoinColumn({ name: 'driverId' })
  driver: Driver;

  @OneToOne(() => Cargo, (cargo) => cargo.delivery, { cascade: true })
  @JoinColumn({ name: 'cargoId' })
  cargo: Cargo;
}
