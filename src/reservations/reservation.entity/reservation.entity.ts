// reservation.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Workshop } from '../../workshops/workshop.entity/workshop.entity';

@Entity('reservations') // Specify the table name in your database
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @ManyToOne(() => Workshop, (workshop) => workshop.reservations)
  @JoinColumn({ name: 'workshop_id' })
  workshop: Workshop; // Many-to-one relationship with Workshop entity
}

