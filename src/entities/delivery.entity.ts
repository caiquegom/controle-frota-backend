import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Driver,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Cargo } from './cargo.entity';
import { Region } from './region.entity';
import { Truck } from './truck.entity';
import { User } from './user.entity';

enum DeliveryStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  CANCELED = 'CANCELED',
}

@Entity('deliveries')
export class Delivery {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Region, (region) => region.deliveries)
  @JoinColumn({ name: 'destiny_id' })
  destiny: Region;

  @ManyToOne(() => Truck, (truck) => truck.deliveries)
  @JoinColumn({ name: 'truck_id' })
  truck: Truck;

  @ManyToOne(() => User, (user) => user.deliveries)
  @JoinColumn({ name: 'driver_id' })
  driver: Driver;

  @OneToOne(() => Cargo, (cargo) => cargo.deliveries)
  @JoinColumn({ name: 'cargo_id' })
  cargo: Cargo;

  @Column({
    type: 'enum',
    enum: DeliveryStatus,
    default: DeliveryStatus.PENDING,
  })
  status: string;

  @Column({ type: 'float' })
  value: number;

  @Column({ type: 'float' })
  tax: number;

  @Column({ type: 'float' })
  totalValue: number;

  @Column({ type: 'boolean' })
  isValuable: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'timestamp' })
  startedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @Column({ type: 'timestamp' })
  finishedAt: Date;
}
