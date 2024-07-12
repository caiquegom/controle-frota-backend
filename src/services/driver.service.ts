import { MoreThanOrEqual } from 'typeorm';
import { deliveryRepository } from '../repositories/delivery.repository';

class DriverService {
  async canDelete(id: number): Promise<boolean> {
    const deliveryWithDriver = await deliveryRepository.findOne({
      relations: ['driver'],
      where: {
        driver: {
          id,
        },
        deliveryDate: MoreThanOrEqual(new Date()),
      },
      withDeleted: false,
    });

    return !deliveryWithDriver;
  }
}

export default new DriverService();
