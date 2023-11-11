// events.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThanOrEqual } from 'typeorm';
import { Event } from './event.entity/event.entity';
import { EventListDto, PaginationDto } from './dto/event-list.dto';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
  ) {}

  async getActiveEvents(page: number = 1, perPage: number = 10): Promise<{ events: EventListDto[], pagination: PaginationDto }> {
    const [events, total] = await this.eventRepository.findAndCount({
      where: {
        start_at: MoreThanOrEqual(new Date()), // Filter active events
      },
      take: perPage, // Number of events per page
      skip: (page - 1) * perPage, // Calculate the offset based on the page
    });

    const pagination: PaginationDto = {
      total,
      per_page: perPage,
      total_pages: Math.ceil(total / perPage),
      current_page: page,
    };

    const eventList: EventListDto[] = events.map(event => ({
      id: event.id,
      title: event.title,
      start_at: event.start_at,
      end_at: event.end_at,
    }));

    return { events: eventList, pagination };
  }

  async getEventDetails(id: number): Promise<any> {
    const event = await this.eventRepository
                            .createQueryBuilder('event')
                            .leftJoinAndSelect('event.workshops', 'workshop')
                            .where('event.id = :id', { id })
                            .getOne();


    if (!event) {
      throw new NotFoundException('Event not found');
    }

    // calculate total_workshops here
    const totalWorkshops = event.workshops ? event.workshops.length : 0;

    return {
      id: event.id,
      title: event.title,
      start_at: event.start_at,
      end_at: event.end_at,
      total_workshops: totalWorkshops,
    };
  } 
}
