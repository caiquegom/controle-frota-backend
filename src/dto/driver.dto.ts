import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateDriverDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(11, 11)
  phone: string;
}

export class UpdateDriverDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(11, 11)
  phone: string;
}
