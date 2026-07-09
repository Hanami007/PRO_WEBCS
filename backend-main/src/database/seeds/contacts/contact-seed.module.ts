import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from 'src/contacts/entities/contact.entity';
import { ContactSeedService } from './contact-seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([Contact])],
  providers: [ContactSeedService],
  exports: [ContactSeedService],
})
export class ContactSeedModule {}
