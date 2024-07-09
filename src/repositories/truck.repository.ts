import { AppDataSource } from '../data-source';
import { Truck } from '../entities/truck.entity';

export const truckRepository = AppDataSource.getRepository(Truck);
