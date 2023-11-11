// workshop.dto.ts
import { IsString, IsNotEmpty, IsDate } from '@nestjs/class-validator';

export class WorkshopDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsDate()
  start_at: Date;

  @IsNotEmpty()
  @IsDate()
  end_at: Date;

  @IsNotEmpty()
  eventId: number; // Assuming we need to associate the workshop with an event
}
