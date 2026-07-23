import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Program } from 'src/programs/entities/program.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProgramSeedService {
  constructor(
    @InjectRepository(Program)
    private repository: Repository<Program>,
  ) { }

  async run() {
    const programs = [
      {
        code: '25490131103057',
        nameTh: 'หลักสูตรวิทยาศาสตรบัณฑิต สาขาวิชาวิทยาการคอมพิวเตอร์',
        nameEn: 'Bachelor of Science Program in Computer Science',
        degreeThFull: 'วิทยาศาสตรบัณฑิต (วิทยาการคอมพิวเตอร์)',
        degreeEnFull: 'Bachelor of Science (Computer Science)',
        degreeTh: 'วท.บ. (วิทยาการคอมพิวเตอร์)',
        degreeEn: 'B.Sc. (Computer Science)',
        credits: 120,
        revision: '2565',
        duration: '4 ปี',
        languages: 'ภาษาไทย/ภาษาอังกฤษ',
        isActive: true,
        isCurrent: true,
      },
      // หลักสูตร 2559
      {
        code: '25590136000307',
        nameTh: 'หลักสูตรวิทยาศาสตรมหาบัณฑิต สาขาวิชานวัตกรรมเทคโนโลยีดิจิทัล',
        nameEn: 'Master of Science Program in Digital Technology Innovation',
        degreeThFull: 'วิทยาศาสตรมหาบัณฑิต (นวัตกรรมเทคโนโลยีดิจิทัล)',
        degreeEnFull: 'Master of Science (Digital Technology Innovation)',
        degreeTh: 'วท.ม. (นวัตกรรมเทคโนโลยีดิจิทัล)',
        degreeEn: 'M.Sc. (Digital Technology Innovation)',
        credits: 36,
        revision: '2559',
        duration: '2 ปี',
        languages: 'ภาษาไทยหรือภาษาอังกฤษ',
        isActive: true,
        isCurrent: false,
      },
      // หลักสูตร 2560
      {
        code: '25600131103057',
        nameTh: 'หลักสูตรวิทยาศาสตรบัณฑิต สาขาวิชาวิทยาการคอมพิวเตอร์',
        nameEn: 'Bachelor of Science Program in Computer Science',
        degreeThFull: 'วิทยาศาสตรบัณฑิต (วิทยาการคอมพิวเตอร์)',
        degreeEnFull: 'Bachelor of Science (Computer Science)',
        degreeTh: 'วท.บ. (วิทยาการคอมพิวเตอร์)',
        degreeEn: 'B.Sc. (Computer Science)',
        credits: 129,
        revision: '2560',
        duration: '4 ปี',
        languages: 'ภาษาไทย',
        isActive: true,
        isCurrent: false,
      },
      // หลักสูตร 2570
      {
        code: '25700131103057',
        nameTh: 'หลักสูตรวิทยาศาสตรบัณฑิต สาขาวิชาวิทยาการคอมพิวเตอร์',
        nameEn: 'Bachelor of Science Program in Computer Science',
        degreeThFull: 'วิทยาศาสตรบัณฑิต (วิทยาการคอมพิวเตอร์)',
        degreeEnFull: 'Bachelor of Science (Computer Science)',
        degreeTh: 'วท.บ. (วิทยาการคอมพิวเตอร์)',
        degreeEn: 'B.Sc. (Computer Science)',
        credits: 120,
        revision: '2570',
        duration: '4 ปี',
        languages: 'ภาษาไทย/ภาษาอังกฤษ',
        isActive: true,
        isCurrent: true,
      },
    ];

    for (const program of programs) {
      const existing = await this.repository.findOne({
        where: { code: program.code },
      });

      if (!existing) {
        const newProgram = this.repository.create({
          code: program.code,
          nameTh: program.nameTh,
          nameEn: program.nameEn,
          degreeThFull: program.degreeThFull,
          degreeEnFull: program.degreeEnFull,
          degreeTh: program.degreeTh,
          degreeEn: program.degreeEn,
          credits: program.credits,
          revision: program.revision,
          duration: program.duration,
          languages: program.languages,
          isActive: program.isActive,
          isCurrent: program.isCurrent,
        });
        await this.repository.save(newProgram);
        console.log(`Seeded program: ${program.nameEn}`);
      } else {
        console.log(`Program already exists: ${program.nameEn}`);
      }
    }
  }
}
