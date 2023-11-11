import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { EventsModule } from './events/events.module';
import { WorkshopsModule } from './workshops/workshops.module';
import { ReservationsModule } from './reservations/reservations.module';





@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "db",
      port: 3306,
      username: "ten_min_school",
      password: "c1374A#h",
      database: "event_management_db",
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      synchronize: true
    }),
    EventsModule,
    WorkshopsModule,
    ReservationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
