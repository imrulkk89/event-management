// reservations.controller.ts
import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationDto } from './dto/reservation.dto';
import { Reservation } from './reservation.entity/reservation.entity';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Post()
  createReservation(@Body() reservationDto: ReservationDto): Promise<Reservation> {
    return this.reservationsService.createReservation(reservationDto);
  }
}

