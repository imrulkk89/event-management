// workshop.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Event } from '../../events/event.entity/event.entity';

@Entity('workshops') // Specify the table name in your database
export class Workshop {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'datetime' })
  start_at: Date;

  @Column({ type: 'datetime' })
  end_at: Date;

  @ManyToOne(() => Event, (event) => event.workshops)
  @JoinColumn({ name: 'event_id' })
  event: Event; // Many-to-one relationship with Event entity
  
  reservations: any;
}

