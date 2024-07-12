import { AppDataSource } from '../data-source';
import { Delivery } from '../entities/delivery.entity';

export const deliveryRepository = AppDataSource.getRepository(Delivery);
