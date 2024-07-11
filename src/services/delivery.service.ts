import { CreateDeliveryDTO } from '../dto/delivery.dto';
import { CargoType } from '../entities/cargo.entity';
import { cargoRepository } from '../repositories/cargo.repository';
import { deliveryRepository } from '../repositories/delivery.repository';
import { regionRepository } from '../repositories/region.repository';

class DeliveryService {
  async validateDriverTrips(id: number) {
    const lastDeliveriesToVerify = 4;
    let isAvailable = true;
    let monthReference = null;

    const deliveries = await deliveryRepository.find({
      order: {
        createdAt: 'DESC',
      },
      where: {
        driver: {
          id: id,
        },
      },
      withDeleted: false,
    });

    monthReference = new Date(deliveries[0].deliveryDate).getMonth();

    for (let i = 0; i < lastDeliveriesToVerify - 1; i++) {
      const deliveryMonth = new Date(deliveries[i].deliveryDate);

      if (deliveryMonth !== monthReference) {
        isAvailable = false;
      }
    }

    return isAvailable;
  }

  async createNewDeliveryObject(data: CreateDeliveryDTO) {
    const { tax } = await regionRepository.findOne({
      where: { id: data.destinyId },
    });
    const { type: cargoType } = await cargoRepository.findOne({
      where: { id: data.cargoId },
    });

    const totalValue = data.value * (1 + tax);
    const isValuable = totalValue > 30000;
    const isDangerous = cargoType === CargoType.FUEL;

    const newDelivery = {
      ...data,
      tax,
      totalValue,
      isValuable,
      isDangerous,
    };

    return newDelivery;
  }
}

export default new DeliveryService();
