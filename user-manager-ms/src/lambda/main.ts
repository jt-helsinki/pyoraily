/*
 *
 * MIT License.
 *
 */
import { INestApplication, LogLevel, ValidationPipe } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '@src/app.module';
import { getEnv, getEnvArray, getEnvBoolean } from 'pyoraily-shared-backend/utils/config';
import { configure as serverlessExpress } from '@vendia/serverless-express';
import { APIGatewayEvent, Callback, Context, Handler } from 'aws-lambda';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';

let server: Handler<APIGatewayEvent, void> | undefined;

const IS_OFFLINE = getEnvBoolean('IS_OFFLINE', false);
const LOG_LEVEL: LogLevel[] = getEnvArray('LOG_LEVEL', ['warn', 'error']) as LogLevel[];

async function bootstrap(): Promise<Handler<APIGatewayEvent, void>> {
  const app: INestApplication = await NestFactory.create(AppModule, {
    logger: LOG_LEVEL
  });
  app.use(helmet());
  if (!IS_OFFLINE) {
    app.enableCors({
      origin: [getEnv('CORS_ALLOWED_ORIGINS')],
      credentials: true,
      optionsSuccessStatus: 200,
    } as CorsOptions);
  }
  app.setGlobalPrefix('user-manager');
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  await app.init();
  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress({ app: expressApp });
}

export const handler: Handler<APIGatewayEvent, void> = async (
  event: APIGatewayEvent,
  context: Context,
  callback: Callback
): Promise<void> => {
  if (!server) {
    console.debug('Bootstrapping a new server');
    server = await bootstrap();
  }

  return server(event, context, callback);
};
