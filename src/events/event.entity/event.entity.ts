import { Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import { Workshop } from '../../workshops/workshop.entity/workshop.entity';
@Entity('events')
export class Event {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 15})
    title: string;

    @Column('date')
    start_at: Date;

    @Column('date')
    end_at: Date;

    @OneToMany(() => Workshop, (workshop) => workshop.event)
    workshops: Workshop[];
}
