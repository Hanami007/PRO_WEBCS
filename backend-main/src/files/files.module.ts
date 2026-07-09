import {
  HttpStatus,
  Module,
  UnprocessableEntityException,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from './entities/file.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AllConfigType } from 'src/config/config.types';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

@Module({
  imports: [
    TypeOrmModule.forFeature([File]),
    MulterModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<AllConfigType>) => {
        return {
          fileFilter: (request, file, callback) => {
            if (
              !file.originalname.match(/\.(jpg|jpeg|png|gif|pdf|doc|docx)$/i)
            ) {
              return callback(
                new UnprocessableEntityException({
                  status: HttpStatus.UNPROCESSABLE_ENTITY,
                  errors: {
                    file: `cantUploadFileType`,
                  },
                }),
                false,
              );
            }
            callback(null, true);
          },
          storage: diskStorage({
            destination: async (req, file, callback) => {
              try {
                const baseFilesPath =
                  configService.getOrThrow('file.path', { infer: true }) ||
                  './files';
                let prefix = 'no-prefix';
                if (typeof req.params.prefix === 'string') {
                  prefix = req.params.prefix;
                } else {
                  const url = req.originalUrl || req.url || '';
                  if (url.includes('/articles')) {
                    prefix = 'articles';
                  } else if (url.includes('/testimonials')) {
                    prefix = 'testimonials';
                  } else if (url.includes('/rooms')) {
                    prefix = 'rooms';
                  } else if (url.includes('/features')) {
                    prefix = 'features';
                  } else if (url.includes('/personnels') || url.includes('/personnel')) {
                    prefix = 'personnel';
                  } else if (url.includes('/users')) {
                    prefix = 'users';
                  }
                }

                const now = new Date();
                const year = now.getUTCFullYear().toString();
                const month = (now.getUTCMonth() + 1)
                  .toString()
                  .padStart(2, '0');

                const finalPath = path.join(baseFilesPath, prefix, year, month);

                await fs.promises.mkdir(finalPath, { recursive: true });

                callback(null, finalPath);
              } catch (error) {
                callback(error, '');
              }
            },
            filename: (request, file, callback) => {
              const fileExt = file.originalname
                .split('.')
                .pop()
                ?.toLocaleLowerCase();
              const timestamp = Date.now();
              const random = uuidv4();

              callback(null, `${timestamp}-${random}.${fileExt}`);
            },
          }),
          limits: {
            fileSize: 10 * 1024 * 1024,
          },
        };
      },
    }),
  ],
  controllers: [FilesController],
  providers: [FilesService],
  exports: [FilesService, MulterModule],
})
export class FilesModule {}
