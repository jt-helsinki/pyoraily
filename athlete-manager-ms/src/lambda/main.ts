/*
 *
 * MIT License.
 *
 */
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { LogLevel } from '@nestjs/common/services/logger.service';
import { NestFactory } from '@nestjs/core';
import { getEnv, getEnvArray, getEnvBoolean } from 'pyoraily-shared-backend/utils/config';
import { AppModule } from '@src/app.module';
import { configure as serverlessExpress } from '@vendia/serverless-express';
import { APIGatewayEvent, Callback, Context, Handler } from 'aws-lambda';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';

const IS_OFFLINE = getEnvBoolean('IS_OFFLINE', false);
const TOKEN: string = getEnv('TOKEN', 'token');
const LOG_LEVEL: LogLevel[] = getEnvArray('LOG_LEVEL', ['warn', 'error']) as LogLevel[];

let server: Handler<APIGatewayEvent, void> | undefined;

async function bootstrap(): Promise<Handler<APIGatewayEvent, void>> {
  const app: INestApplication = await NestFactory.create(AppModule, {
    logger: console,
  });
  app.use(helmet());
  if (!IS_OFFLINE) {
    app.enableCors({
      origin: [getEnv('CORS_ALLOWED_ORIGINS')],
      credentials: true,
      optionsSuccessStatus: 200,
    } as CorsOptions);
  }
  app.setGlobalPrefix('athlete-manager');
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

  if (IS_OFFLINE && TOKEN) {
    // this mocks the cookie header that is normally sent by the UI when inside the Shell application.
    // event.multiValueHeaders['Cookies'] = [`token=${token}`];
    event.multiValueHeaders['token'] = [TOKEN];
  }

  return server(event, context, callback);
};
