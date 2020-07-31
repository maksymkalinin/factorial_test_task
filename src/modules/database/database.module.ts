import { Module } from '@nestjs/common';
import { databaseProvider } from './database.provider';
import { ConfigModule } from '../config/config.module';

@Module({
  imports: [ConfigModule],
  providers: [databaseProvider],
  exports: [databaseProvider],
})
export class DatabaseModule {}
