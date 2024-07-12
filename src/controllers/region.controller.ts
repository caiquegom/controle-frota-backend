import { validate } from 'class-validator';
import { Request, Response } from 'express';
import { CreateRegionDTO, UpdateRegionDTO } from '../dto/region.dto';
import { regionRepository } from '../repositories/region.repository';
import { formatValidatorErrors } from '../utils/dataValidation';

class RegionController {
  async index(req: Request, res: Response) {
    try {
      const regionList = await regionRepository.find({
        order: {
          createdAt: 'ASC',
        },
        withDeleted: false,
      });
      return res.status(200).json({
        status: 'success',
        data: regionList,
      });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        message: 'Erro interno no servidor',
      });
    }
  }

  async show(req: Request, res: Response) {
    const regionId = req.params.id;

    try {
      const region = await regionRepository.findOne({
        where: {
          id: Number(regionId),
        },
        withDeleted: false,
      });

      if (!region) {
        return res.status(404).json({
          status: 'error',
          message: 'Region not found',
        });
      }

      return res.status(200).json({
        status: 'success',
        data: region,
      });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        message: 'Erro interno no servidor',
      });
    }
  }

  async store(req: Request, res: Response) {
    const { name, tax, driverLimitPerMonth } = req.body;
    const createRegionDTO = new CreateRegionDTO();
    createRegionDTO.name = name;
    createRegionDTO.tax = tax;
    createRegionDTO.driverLimitPerMonth = driverLimitPerMonth;

    const errors = await validate(createRegionDTO);
    if (errors.length >= 1) {
      return res.status(404).json({
        status: 'error',
        message: formatValidatorErrors(errors),
      });
    }

    try {
      const newRegion = regionRepository.create({
        name,
        tax,
        driverLimitPerMonth,
      });
      await regionRepository.save(newRegion);
      return res.status(201).json({
        status: 'success',
        data: newRegion,
      });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        message: 'Erro interno no servidor',
      });
    }
  }

  async update(req: Request, res: Response) {
    const regionId = req.params.id;
    const { name, tax, driverLimitPerMonth } = req.body;

    const updateRegionDTO = new UpdateRegionDTO();
    updateRegionDTO.name = name;
    updateRegionDTO.tax = tax;
    updateRegionDTO.driverLimitPerMonth = driverLimitPerMonth;

    const errors = await validate(updateRegionDTO);
    if (errors.length >= 1) {
      return res.status(404).json({
        status: 'error',
        message: formatValidatorErrors(errors),
      });
    }

    try {
      const region = await regionRepository.findOne({
        where: { id: Number(regionId) },
        withDeleted: false,
      });

      if (!region) {
        return res.status(404).json({
          status: 'error',
          message: 'Region not found',
        });
      }

      const editedRegion = await regionRepository.save({
        id: Number(regionId),
        name,
        tax,
        driverLimitPerMonth,
      });
      return res.status(201).json({
        status: 'success',
        data: editedRegion,
      });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        message: 'Erro interno no servidor',
      });
    }
  }

  async delete(req: Request, res: Response) {
    const regionId = req.params.id;

    try {
      const region = await regionRepository.findOne({
        where: {
          id: Number(regionId),
        },
        withDeleted: false,
      });

      if (!region) {
        return res.status(404).json({
          status: 'error',
          message: 'Region not found',
        });
      }

      await regionRepository.softDelete({ id: Number(regionId) });
      return res.status(200).json({
        status: 'success',
        data: 'Region deleted',
      });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        message: 'Erro interno no servidor',
      });
    }
  }
}

export default new RegionController();
