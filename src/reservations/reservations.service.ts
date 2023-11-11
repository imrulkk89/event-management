// reservations.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from './reservation.entity/reservation.entity';
import { ReservationDto } from './dto/reservation.dto';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Reservation)
    private reservationRepository: Repository<Reservation>,
  ) {}

  async createReservation(reservationDto: ReservationDto): Promise<Reservation> {

    const newReservation = this.reservationRepository.create(reservationDto);
    await this.reservationRepository.save(newReservation);

    return newReservation;
  }
}

