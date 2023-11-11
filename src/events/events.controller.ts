import { Controller, Get, Param, Query } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventListDto, PaginationDto } from './dto/event-list.dto';

@Controller('events')
export class EventsController {
    constructor(private readonly eventService: EventsService){}

    @Get()
    async getActiveEvents( 
        @Query('pageNum') pageNum: number, 
        @Query('perPage') perPage: number): Promise<{events: EventListDto[], pagination: PaginationDto}> {
            const {events, pagination} = await this.eventService.getActiveEvents(pageNum, perPage);
        return {events, pagination};
    }

    @Get(':id')
    getEventDetails(@Param('id') id: number): any {
        return this.eventService.getEventDetails(id)
    }
}
