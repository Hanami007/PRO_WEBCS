import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { AllConfigType } from './config/config.types';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { RoleSerializerInterceptor } from './utils/role-serializer.interceptor';
import { UnauthorizedFilter } from './utils/unauthorized-filter';
import redoc from 'redoc-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger:
      process.env.NODE_ENV === 'production'
        ? ['error', 'warn', 'log']
        : ['log', 'error', 'warn', 'debug', 'verbose'],
  });
  const configService = app.get(ConfigService<AllConfigType>);
  app.use(cookieParser());
  const frontendDomain = configService.getOrThrow('app.frontendDomain', { infer: true });
  const corsOptions: CorsOptions = {
    origin: frontendDomain ? frontendDomain.split(',').map((domain) => domain.trim()) : [],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
    maxAge: 86400,
  };

  // swagger
  const config = new DocumentBuilder()
    .setTitle('API')
    .setDescription('API Docs')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  // redoc setup
  app.use(
    '/docs',
    redoc({
      title: 'CS-MJU API Documentation',
      specUrl: '/api-docs-json',
      redocOptions: {
        theme: {
          colors: {
            primary: {
              main: '#328C4C',
            },
          },
        },
      },
    }),
  );

  app.setGlobalPrefix(
    configService.getOrThrow('app.apiPrefix', { infer: true }),
    {
      exclude: ['/'],
    },
  );

  app.enableCors(corsOptions);

  app.useGlobalInterceptors(
    // ResolvePromisesInterceptor is used to resolve promises in responses because class-transformer can't do it
    // https://github.com/typestack/class-transformer/issues/549
    // new ResolvePromisesInterceptor(),
    new RoleSerializerInterceptor(app.get(Reflector)),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.useGlobalFilters(new UnauthorizedFilter());

  app.useStaticAssets(
    join(
      __dirname,
      '..',
      configService.getOrThrow('file.path', { infer: true }),
    ),
    {
      prefix: `/${configService.getOrThrow('file.path', { infer: true })}`,
    },
  );

  await app.listen(configService.getOrThrow('app.port', { infer: true }));
}

bootstrap();
