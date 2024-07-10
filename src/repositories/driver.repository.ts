import { AppDataSource } from '../data-source';
import { Driver } from '../entities/driver.entity';

export const driverRepository = AppDataSource.getRepository(Driver);
