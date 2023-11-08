import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

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
}
