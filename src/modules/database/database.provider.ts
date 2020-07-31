import { ConfigService } from '../config/config.service';
import { createConnection, Connection } from 'typeorm';

export const databaseProvider = {
  provide: 'DATABASE_CONNECTION',
  useFactory: async (configService: ConfigService): Promise<Connection> => {
    return createConnection(configService.getDBConfig());
  },
  inject: [ConfigService]
};
