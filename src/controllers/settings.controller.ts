import { validate } from 'class-validator';
import { Request, Response } from 'express';
import { CreateSettingsDTO } from '../dto/settings.dto';
import { settingsRepository } from '../repositories/settings.repository';
import { formatValidatorErrors } from '../utils/dataValidation';

class SettingsController {
  async show(req: Request, res: Response) {
    try {
      const settings = await settingsRepository.findOne({ where: { id: 1 } });
      return res.status(200).json({
        status: 'success',
        data: settings,
      });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        message: 'Erro interno no servidor',
      });
    }
  }

  async update(req: Request, res: Response) {
    const { driverLimitPerTruck, truckLimitPerMonth } = req.body;

    const createSettingsDTO = new CreateSettingsDTO();
    createSettingsDTO.driverLimitPerTruck = driverLimitPerTruck;
    createSettingsDTO.truckLimitPerMonth = truckLimitPerMonth;

    const errors = await validate(createSettingsDTO);
    if (errors.length >= 1) {
      return res.status(404).json({
        status: 'error',
        message: formatValidatorErrors(errors),
      });
    }

    try {
      const editedSettings = await settingsRepository.save({
        id: 1,
        driverLimitPerTruck,
        truckLimitPerMonth,
      });

      return res.status(201).json({
        status: 'success',
        data: editedSettings,
      });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        message: 'Erro interno no servidor',
      });
    }
  }
}

export default new SettingsController();
