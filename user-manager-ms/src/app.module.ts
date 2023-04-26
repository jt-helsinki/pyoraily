/*
 *
 * MIT License.
 *
 */
import { Logger, MiddlewareConsumer, Module, NestMiddleware, NestModule } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from '@src/controllers/AuthController';
import { UserController } from '@src/controllers/UserController';
import { UserRoleController } from '@src/controllers/UserRoleController';
import { Auth0DaoImpl } from '@src/dao/Auth0DaoImpl';
import { AuthDao } from '@src/dao/AuthDao';
import { Auth0Service } from '@src/services/Auth0Service';
import { UserRoleService } from '@src/services/UserRoleService';
import { UserService } from '@src/services/UserService';
import { JwtStrategy } from 'pyoraily-shared-backend/strategies/JwtStrategy';
import { getEnvBoolean } from 'pyoraily-shared-backend/utils/config';

const IS_OFFLINE = getEnvBoolean('IS_OFFLINE', false);

class LoggerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: any) {
    console.log('Request', req.method, req.originalUrl /*...*/);
    next();
    console.log('Response', res.statusCode, res.statusMessage /*...*/);
  }
}

@Module({
  controllers: [AuthController, UserController, UserRoleController],
  imports: [PassportModule],
  exports: [Auth0Service, UserService, UserRoleService],
  providers: [
    Auth0Service,
    UserService,
    {
      provide: AuthDao,
      useClass: Auth0DaoImpl,
    },
    UserRoleService,
    JwtStrategy,
    Logger,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    if (IS_OFFLINE) {
      consumer.apply(LoggerMiddleware).forRoutes('*');
    }
  }
}
