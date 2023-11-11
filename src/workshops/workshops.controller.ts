import { Body, Controller, Get, Param, Post, Query, ValidationPipe } from '@nestjs/common';
import { WorkshopsService } from './workshops.service';
import { WorkshopDto } from './dto/workshop.dto';
import { PaginationDto } from 'src/events/dto/event-list.dto';
import { Workshop } from './workshop.entity/workshop.entity';

@Controller('workshops')
export class WorkshopsController {
    constructor(private readonly workshopsService: WorkshopsService) {}

    @Get()
    async getActiveWorkshops(
      @Query('eventId') eventId: number,
      @Query('pageNum') pageNum: number,
      @Query('perPage') perPage: number
    ): Promise<{workshops: Workshop[], pagination: PaginationDto}>{
        const {workshops, pagination}  = await this.workshopsService.getActiveWorkshops(eventId, pageNum, perPage);
        return {workshops, pagination};
    }

    @Get(':id')
    async getWorkshopDetails(@Param('id') id: number): Promise<Workshop>{
      return await this.workshopsService.getWorkshopDetails(id)
    }

    @Post()
    createWorkshop(@Body() workshopDto: WorkshopDto): Promise<any> {
      return this.workshopsService.createWorkshop(workshopDto);
    }
}
