import { MoreThanOrEqual } from 'typeorm';
import { deliveryRepository } from '../repositories/delivery.repository';

class TruckService {
  async canDelete(id: number): Promise<boolean> {
    const deliveryWithTruck = await deliveryRepository.findOne({
      relations: ['truck'],
      where: {
        truck: {
          id,
        },
        deliveryDate: MoreThanOrEqual(new Date()),
      },
      withDeleted: false,
    });

    return !deliveryWithTruck;
  }
}

export default new TruckService();
