// workshops.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThanOrEqual } from 'typeorm';
import { Workshop } from './workshop.entity/workshop.entity'; // Import Workshop entity
import { WorkshopDto } from './dto/workshop.dto';
import { PaginationDto } from 'src/events/dto/event-list.dto';

@Injectable()
export class WorkshopsService {
  constructor(
    @InjectRepository(Workshop)
    private workshopRepository: Repository<Workshop>,
  ) {}

  async getActiveWorkshops( 
    eventId: number, 
    page: number = 1, 
    perPage: number = 10): Promise<{ workshops: Workshop[], pagination: PaginationDto }> {
    const [workshops, total] = await this.workshopRepository.findAndCount({
      where: {
        event: { id: eventId },
        start_at: MoreThanOrEqual(new Date()), // Filter active workshops
      },
      take: perPage, // Number of workshops per page
      skip: (page - 1) * perPage, // Calculate the offset based on the page
    });

    const pagination: PaginationDto = {
      total,
      per_page: perPage,
      total_pages: Math.ceil(total / perPage),
      current_page: page,
    };

    const workshopList: Workshop[] = workshops.map(workshop => ({

      id: workshop.id,
      title: workshop.title,
      description: workshop.description,
      start_at: workshop.start_at,
      end_at: workshop.end_at,
      event: workshop.event,
      reservations: workshop.reservations
    }))

    return { workshops: workshopList, pagination};
  }

  async getWorkshopDetails(id: any): Promise<Workshop | any> {
    const workshop = await this.workshopRepository.findOne(id);

    if (!workshop) {
      throw new NotFoundException('Workshop not found');
    }

    // You can calculate total_reservations here
    const totalReservations = workshop.reservations ? workshop.reservations.length : 0;

    return { ...workshop, total_reservations: totalReservations };
  }

  async createWorkshop(workshopDto: WorkshopDto): Promise<Workshop> {
    const newWorkshop = this.workshopRepository.create(workshopDto);
    await this.workshopRepository.save(newWorkshop);

    return newWorkshop;
  }
}

