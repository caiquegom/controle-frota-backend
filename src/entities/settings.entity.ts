import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('settings')
export class Settings {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  driverLimitPerTruck: number;

  @Column({ type: 'int' })
  truckLimitPerMonth: number;

  @UpdateDateColumn()
  updatedAt: Date;
}
