import { DynamicModule } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Environment } from 'src/common/enum';
import { DataSourceOptions } from 'typeorm';

export const DatabaseProvider: DynamicModule = TypeOrmModule.forRootAsync({
  inject: [ConfigService],
  useFactory: (config: ConfigService) => {
    const isDevEnv = config.get('NODE_ENV') !== Environment.Production;
    return {
      /* ssl: {
        rejectUnauthorized: false,
      }, */
      type: config.get('DB_DRIVER'),
      host: config.get('DB_HOST'),
      port: Number(config.get('DB_PORT')),
      username: config.get('DB_USER'),
      password: config.get('DB_PASSWORD'),
      database: config.get('DB_NAME'),
      autoLoadEntities: true,
      synchronize: isDevEnv,
      logging: config.get('DB_LOGGING'),
    } as DataSourceOptions;
  },
});
