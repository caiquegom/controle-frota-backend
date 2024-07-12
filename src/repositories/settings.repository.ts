import { AppDataSource } from '../data-source';
import { Settings } from '../entities/settings.entity';

export const settingsRepository = AppDataSource.getRepository(Settings);
