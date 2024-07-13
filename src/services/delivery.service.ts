import { getMonth, getYear, lastDayOfMonth } from 'date-fns';
import { Between, MoreThan } from 'typeorm';
import { CreateDeliveryDTO } from '../dto/delivery.dto';
import { CargoType } from '../entities/cargo.entity';
import { cargoRepository } from '../repositories/cargo.repository';
import { deliveryRepository } from '../repositories/delivery.repository';
import { regionRepository } from '../repositories/region.repository';
import { settingsRepository } from '../repositories/settings.repository';
import { formatTimeForDatabase } from '../utils/dateFormatDatabase';

class DeliveryService {
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

  async verifyTruckSurpassedMonthTrips(
    truckId: number,
    deliveryDate: Date,
  ): Promise<boolean> {
    const deliveryMonth = getMonth(deliveryDate);
    const deliveryYear = getYear(deliveryDate);
    const lastMonthDay = formatTimeForDatabase(lastDayOfMonth(deliveryDate));
    const firstMonthDay = formatTimeForDatabase(
      new Date(deliveryYear, deliveryMonth, 1, 0, 0, 0, 0),
    );

    const { truckLimitPerMonth } = await settingsRepository.findOne({
      where: { id: 1 },
    });

    if (truckLimitPerMonth === 0) return false;

    const truckMonthTripsAmount = await deliveryRepository.count({
      where: {
        truck: {
          id: truckId,
        },
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        deliveryDate: Between(firstMonthDay, lastMonthDay),
      },
      withDeleted: false,
    });

    return truckMonthTripsAmount >= truckLimitPerMonth;
  }

  async verifyIfTruckIsOnDelivery(truckId: number): Promise<boolean> {
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

  async verifyDriverSurpassedDeliveriesToRegion(
    driverId: number,
    destinyId: number,
    deliveryDate: Date,
  ): Promise<boolean> {
    const deliveryMonth = getMonth(deliveryDate);
    const deliveryYear = getYear(deliveryDate);
    const lastMonthDay = formatTimeForDatabase(lastDayOfMonth(deliveryDate));
    const firstMonthDay = formatTimeForDatabase(
      new Date(deliveryYear, deliveryMonth, 1, 0, 0, 0, 0),
    );

    const { driverLimitPerMonth } = await regionRepository.findOne({
      where: {
        id: destinyId,
      },
    });

    if (driverLimitPerMonth === 0) return false;

    const driverTripsToRegionAmount = await deliveryRepository.count({
      where: {
        driver: {
          id: driverId,
        },
        destiny: {
          id: destinyId,
        },
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        deliveryDate: Between(firstMonthDay, lastMonthDay),
      },
      withDeleted: false,
    });

    return driverTripsToRegionAmount >= driverLimitPerMonth;
  }

  async verifyIfDriverSurpassedDeliveriesWithTruck(
    driverId: number,
    truckId: number,
    deliveryDate: Date,
  ): Promise<boolean> {
    const deliveryMonth = getMonth(deliveryDate);
    const deliveryYear = getYear(deliveryDate);
    const lastMonthDay = formatTimeForDatabase(lastDayOfMonth(deliveryDate));
    const firstMonthDay = formatTimeForDatabase(
      new Date(deliveryYear, deliveryMonth, 1, 0, 0, 0, 0),
    );

    const { driverLimitPerTruck } = await settingsRepository.findOne({
      where: {
        id: 1,
      },
    });

    if (driverLimitPerTruck === 0) return false;

    const driverTripsWithTruckMonthAmount = await deliveryRepository.count({
      where: {
        driver: {
          id: driverId,
        },
        truck: {
          id: truckId,
        },
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        deliveryDate: Between(firstMonthDay, lastMonthDay),
      },
      withDeleted: false,
    });

    return driverTripsWithTruckMonthAmount >= driverLimitPerTruck;
  }

  async validateDriverAndTruck(
    driverId: number,
    truckId: number,
    destinyId: number,
    deliveryDate: Date,
  ): Promise<string> {
    const isTruckOnAnotherDelivery =
      await this.verifyIfTruckIsOnDelivery(truckId);
    const canTruckDeliverThisMonth = await this.verifyTruckSurpassedMonthTrips(
      truckId,
      deliveryDate,
    );
    const canDriverDeliverToRegion =
      await this.verifyDriverSurpassedDeliveriesToRegion(
        driverId,
        destinyId,
        deliveryDate,
      );
    const canDriverDeliverWithTruck =
      await this.verifyIfDriverSurpassedDeliveriesWithTruck(
        driverId,
        truckId,
        deliveryDate,
      );

    if (isTruckOnAnotherDelivery)
      return 'Caminhão já está cadastrado em uma entrega';
    if (canTruckDeliverThisMonth)
      return 'Caminhão já atingiu o limite de entregas do mês';
    if (canDriverDeliverToRegion)
      return 'Motorista já atingiu o limite de entregas do mês para a região';
    if (canDriverDeliverWithTruck)
      return 'Motorista já atingiu o limite de entregas do mês com o caminhão';

    return '';
  }
}

export default new DeliveryService();
