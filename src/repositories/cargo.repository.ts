import { AppDataSource } from '../data-source';
import { Cargo } from '../entities/cargo.entity';

export const cargoRepository = AppDataSource.getRepository(Cargo);
