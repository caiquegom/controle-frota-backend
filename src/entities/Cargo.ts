import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Delivery } from './Delivery';

enum CargoType {
  ELETRONIC = 'eletronic',
  FUEL = 'fuel',
  OTHER = 'other',
}

@Entity('cargos')
export class Cargo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: CargoType })
  type: string;

  @Column({ type: 'text' })
  description: string;

  @OneToOne(() => Delivery, (delivery) => delivery.destiny)
  deliveries: Delivery[];
}
