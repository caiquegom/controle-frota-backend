import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Delivery } from './Delivery';

@Entity('regions')
export class Region {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'float' })
  tax: number;

  @OneToMany(() => Delivery, (delivery) => delivery.destiny)
  deliveries: Delivery[];
}
