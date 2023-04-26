/*
 *
 * MIT License.
 *
 */

import { Logger, MiddlewareConsumer, Module, NestMiddleware, NestModule } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { ATHLETE_PROFILE_SCHEMA_NAME, AthleteProfileSchema } from '@src/model/AthleteProfile';
import { EVENT_SCHEMA_NAME, EventSchema } from '@src/model/Event';
import { RESULT_SCHEMA_NAME, ResultSchema } from '@src/model/Result';
import { RoleGuard } from 'pyoraily-shared-backend/guards/RoleGuard';
import { JwtStrategy } from 'pyoraily-shared-backend/strategies/JwtStrategy';
import { getEnv, getEnvBoolean } from 'pyoraily-shared-backend/utils/config';
import { AthleteProfileController } from '@src/controllers/AthleteProfileController';
import { AthleteProfileService } from '@src/services/AthleteProfileService';

const IS_OFFLINE = getEnvBoolean('IS_OFFLINE', false);

const MONGODB_PROTOCOL = IS_OFFLINE ? 'mongodb' : 'mongodb+srv';
const MONGODB_ENDPOINT = getEnv('MONGODB_ENDPOINT');
const MONGODB_USERNAME = getEnv('MONGODB_USERNAME');
const MONGODB_PASSWORD = getEnv('MONGODB_PASSWORD');
const MONGO_DB_URL = `${MONGODB_PROTOCOL}://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@${MONGODB_ENDPOINT}`;
const MONGO_CREATE_SCHEMA: boolean = getEnvBoolean('MONGO_CREATE_SCHEMA', false);

class LoggerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: any) {
    console.log('Request', req.method, req.originalUrl);
    next();
    console.log('Response', res.statusCode, res.statusMessage);
  }
}

@Module({
  controllers: [AthleteProfileController],
  imports: [
    PassportModule,
    MongooseModule.forRoot(MONGO_DB_URL, {
      autoIndex: MONGO_CREATE_SCHEMA,
      autoCreate: MONGO_CREATE_SCHEMA,
    } as any),
    MongooseModule.forFeature([
      { name: ATHLETE_PROFILE_SCHEMA_NAME, schema: AthleteProfileSchema },
      { name: EVENT_SCHEMA_NAME, schema: EventSchema },
      { name: RESULT_SCHEMA_NAME, schema: ResultSchema },
    ]),
  ],
  exports: [AthleteProfileService],
  providers: [Reflector, RoleGuard, AthleteProfileService, JwtStrategy, Logger],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    if (IS_OFFLINE) {
      consumer.apply(LoggerMiddleware).forRoutes('*');
    }
  }
}
