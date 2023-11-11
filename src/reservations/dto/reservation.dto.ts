// reservation.dto.ts
import { IsString, IsNotEmpty, IsEmail } from '@nestjs/class-validator';

export class ReservationDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  workshopId: number;
}
