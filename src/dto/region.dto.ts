import { IsNotEmpty, IsString, Max, Min } from 'class-validator';

export class CreateRegionDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @Min(0)
  @Max(1)
  tax: number;

  @IsNotEmpty()
  @Min(0)
  driverLimitPerMonth: number;
}

export class UpdateRegionDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @Min(0)
  @Max(1)
  tax: number;

  @IsNotEmpty()
  @Min(0)
  driverLimitPerMonth: number;
}
