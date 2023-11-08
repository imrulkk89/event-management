import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from './event.entity/event.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EventsService {
    constructor(
        @InjectRepository(Event) private eventRepository: Repository<Event>
        ){}

    async getEvents(event: Event): Promise<Event[]> {
        return await this.eventRepository.find();
    }
}
