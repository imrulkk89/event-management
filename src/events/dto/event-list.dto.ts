// event-list.dto.ts

export class EventListDto {
    id: number;
    title: string;
    start_at: Date;
    end_at: Date;
  }
  
  export class PaginationDto {
    total: number;
    per_page: number;
    total_pages: number;
    current_page: number;
  }
  