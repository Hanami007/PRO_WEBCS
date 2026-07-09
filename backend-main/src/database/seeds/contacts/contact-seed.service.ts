import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact, ContactType } from 'src/contacts/entities/contact.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ContactSeedService {
  constructor(
    @InjectRepository(Contact)
    private repository: Repository<Contact>,
  ) {}

  async run() {
    const contacts = [
      {
        title: 'อีเมล',
        description: 'อีเมลติดต่อสอบถาม',
        type: ContactType.EMAIL,
        value: 'cs@mju.ac.th',
        label: 'cs@mju.ac.th',
        isActive: true,
        sortOrder: 1,
      },
      {
        title: 'เบอร์โทรศัพท์',
        description: 'เบอร์โทรศัพท์สำนักงาน',
        type: ContactType.PHONE,
        value: '(+66) 053 873890-3',
        label: '',
        isActive: true,
        sortOrder: 2,
      },
      {
        title: 'Facebook',
        description: 'แฟนเพจสาขาวิชาวิทยาการคอมพิวเตอร์',
        type: ContactType.URL,
        value: 'https://www.facebook.com/computersciencemju',
        label: 'Computer Science MJU',
        isActive: true,
        sortOrder: 3,
      },
      {
        title: 'Line',
        description: 'Line Official Account',
        type: ContactType.URL,
        value: 'https://line.me/R/ti/p/%40053vfccm',
        label: '@csmju',
        isActive: true,
        sortOrder: 4,
      },
    ];

    for (const contact of contacts) {
      const existing = await this.repository.findOne({
        where: { value: contact.value },
      });

      if (!existing) {
        const newContact = this.repository.create(contact);
        await this.repository.save(newContact);
        console.log(`Seeded contact: ${contact.title}`);
      } else {
        console.log(`Contact already exists: ${contact.title}`);
      }
    }
  }
}
