import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateSettingsDTO {
  @IsNotEmpty()
  @IsNumber()
  driverLimitPerTruck: number;

  @IsNotEmpty()
  @IsNumber()
  truckLimitPerMonth: number;
}

export class UpdateSettingsDTO {
  @IsNotEmpty()
  @IsNumber()
  driverLimitPerTruck: number;

  @IsNotEmpty()
  @IsNumber()
  truckLimitPerMonth: number;
}
