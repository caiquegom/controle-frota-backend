import { validate } from 'class-validator';
import { Request, Response } from 'express';
import { CreateRegionDTO } from '../dto/region.dto';
import { regionRepository } from '../repositories/region.repository';
import { formatValidatorErrors } from '../utils/dataValidation';

class RegionController {
  async index(req: Request, res: Response) {
    try {
      const regionList = await regionRepository.find({ withDeleted: false });
      return res.status(200).json({
        status: 'success',
        data: regionList,
      });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
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
        message: 'Internal Server Error',
      });
    }
  }

  async store(req: Request, res: Response) {
    const { name, tax } = req.body;
    const createRegionDTO = new CreateRegionDTO();
    createRegionDTO.name = name;
    createRegionDTO.tax = tax;

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
      });
      regionRepository.save(newRegion);
      return res.status(201).json({
        status: 'success',
        data: newRegion,
      });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
      });
    }
  }

  async update(req: Request, res: Response) {
    const regionId = req.params.id;
    const { name, tax } = req.body;

    const createRegionDTO = new CreateRegionDTO();
    createRegionDTO.name = name;
    createRegionDTO.tax = tax;

    const errors = await validate(createRegionDTO);
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
      });
      return res.status(201).json({
        status: 'success',
        data: editedRegion,
      });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
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
        message: 'Internal Server Error',
      });
    }
  }
}

export default new RegionController();
