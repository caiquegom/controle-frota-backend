import { MoreThan } from 'typeorm';
import { CreateDeliveryDTO } from '../dto/delivery.dto';
import { CargoType } from '../entities/cargo.entity';
import { cargoRepository } from '../repositories/cargo.repository';
import { deliveryRepository } from '../repositories/delivery.repository';
import { regionRepository } from '../repositories/region.repository';
import { settingsRepository } from '../repositories/settings.repository';

class DeliveryService {
  async verifyTruckMonthTrips(id: number) {
    let isAvailable = true;

    const { truckLimitPerMonth } = await settingsRepository.findOne({
      where: { id: 1 },
    });
    const deliveries = await deliveryRepository.find({
      order: {
        createdAt: 'DESC',
      },
      where: {
        truck: {
          id: id,
        },
      },
      withDeleted: false,
    });

    const monthReference = new Date(deliveries[0].deliveryDate).getMonth();

    for (let i = 0; i < truckLimitPerMonth - 1; i++) {
      const deliveryMonth = new Date(deliveries[i].deliveryDate).getMonth();

      if (deliveryMonth !== monthReference) {
        isAvailable = false;
      }
    }

    return isAvailable;
  }

  async verifyIfTruckIsOnDelivery(truckId: number) {
    const deliveriesWithTruck = await deliveryRepository.findOne({
      where: {
        deliveryDate: MoreThan(new Date()),
        truck: {
          id: truckId,
        },
      },
    });

    return !!deliveriesWithTruck;
  }

  async verifyDriverDeliveryToRegion(driverId: number, destinyId: number) {
    let isAvailable = true;

    const { driverLimitPerMonth } = await regionRepository.findOne({
      where: {
        id: destinyId,
      },
    });
    const deliveriesToRegion = await deliveryRepository.find({
      order: {
        deliveryDate: 'DESC',
      },
      where: {
        driver: {
          id: driverId,
        },
        destiny: {
          id: destinyId,
        },
      },
    });

    const monthReference = new Date(
      deliveriesToRegion[0].deliveryDate,
    ).getMonth();

    for (let i = 0; i < driverLimitPerMonth - 1; i++) {
      const deliveryMonth = new Date(
        deliveriesToRegion[i].deliveryDate,
      ).getMonth();

      if (deliveryMonth !== monthReference) {
        isAvailable = false;
      }
    }

    return isAvailable;
  }

  async createNewDeliveryObject(data: CreateDeliveryDTO) {
    const { cargoId, driverId, truckId, destinyId } = data;
    const { tax } = await regionRepository.findOne({
      where: { id: data.destinyId },
    });
    const { type: cargoType } = await cargoRepository.findOne({
      where: { id: data.cargoId },
    });

    const totalValue = data.value * (1 + tax);
    const isValuable = totalValue > 30000;
    const isDangerous = cargoType === CargoType.FUEL;

    return {
      ...data,
      tax,
      cargo: { id: cargoId },
      driver: { id: driverId },
      truck: { id: truckId },
      destiny: { id: destinyId },
      totalValue,
      isValuable,
      isDangerous,
    };
  }
}

export default new DeliveryService();
