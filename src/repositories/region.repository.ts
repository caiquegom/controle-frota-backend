import { AppDataSource } from '../data-source';
import { Region } from '../entities/region.entity';

export const regionRepository = AppDataSource.getRepository(Region);
