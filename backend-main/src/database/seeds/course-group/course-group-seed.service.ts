import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { CourseGroup } from 'src/course-group/entities/course-group.entity';

interface CourseGroupData {
  name: string;
  credits: number;
  children?: CourseGroupData[];
}

@Injectable()
export class CourseGroupSeedService {
  constructor(
    @InjectRepository(CourseGroup)
    private repository: Repository<CourseGroup>,
  ) {}

  async run() {
    console.log('Starting CourseGroup seeding...');
    const data: CourseGroupData[] = [
      {
        name: 'หมวดวิชาศึกษาทั่วไป',
        credits: 30,
        children: [
          { name: 'กลุ่มสังคมและวัฒนธรรม (ELO 1)', credits: 6 },
          {
            name: 'กลุ่มคุณค่าความเป็นมนุษย์และการใช้ชีวิต (ELO 2)',
            credits: 3,
          },
          {
            name: 'กลุ่มภาษาและการสื่อสาร (ELO 3)',
            credits: 12,
            children: [
              { name: 'รายวิชาภาษาไทย', credits: 3 },
              { name: 'รายวิชาภาษาต่างประเทศ', credits: 9 },
            ],
          },
          {
            name: 'กลุ่มการคิดคำนวณ การใช้เหตุผลและเทคโนโลยี(ELO 4)',
            credits: 6,
          },
          { name: 'กลุ่มการเป็นผู้ประกอบการ (ELO 5)', credits: 3 },
        ],
      },
      {
        name: 'หมวดวิชาเฉพาะ',
        credits: 84,
        children: [
          { name: 'กลุ่มวิชาแกน', credits: 18 },
          { name: 'กลุ่มวิชาเอกบังคับ', credits: 45 },
          {
            name: 'กลุ่มวิชาเอกเลือก',
            credits: 21,
            children: [
              {
                name: 'กลุ่มวิชาความรู้พื้นฐานทางวิทยาการคอมพิวเตอร์(Fundamental Computer Science)',
                credits: 12,
              },
              {
                name: 'กลุ่มวิชาการพัฒนาระบบแอปพลิเคชัน (Application Development)',
                credits: 18,
              },
              {
                name: 'กลุ่มวิชาระบบเครือข่าย (Network System)',
                credits: 21,
              },
              {
                name: 'กลุ่มวิชาวิทยาการข้อมูล (Data Science)',
                credits: 32,
              },
              {
                name: 'กลุ่มวิชาอินเทอร์เน็ตในทุกสิ่ง (Internet of Things)',
                credits: 21,
              },
              {
                name: 'กลุ่มวิชาปัญญาประดิษฐ์ (Artificial Intelligence)',
                credits: 27,
              },
              {
                name: 'กลุ่มวิชาการประยุกต์งานด้านธุรกิจ (Computer Science for Business)',
                credits: 15,
              },
              {
                name: 'กลุ่มวิชาหัวข้อพิเศษ (Special Topics)',
                credits: 6,
              },
            ],
          },
        ],
      },
      { name: 'หมวดวิชาเลือกเสรี', credits: 6 },

      // กลุ่มวิชาของหลักสูตรปี 2559
      { name: 'รายวิชาที่ไม่นับหน่วยกิต', credits: 7 },
      { name: 'วิชาเอกบังคับ', credits: 9 },
      {
        name: 'วิชาเอกเลือก',
        credits: 15,
        children: [
          {
            name: 'กลุ่มวิชาพัฒนาระบบสารสนเทศอัจฉริยะ (Smart Information System Development)',
            credits: 15,
          },
          {
            name: 'กลุ่มวิชานวัตกรรมดิจิทัลเพื่อการเรียนรู้ (Digital Innovation for Learning)',
            credits: 15,
          },
          {
            name: 'กลุ่มวิชาบริหารจัดการนวัตกรรม (Innovation Management)',
            credits: 15,
          },
        ],
      },
      { name: 'วิทยานิพนธ์', credits: 36 },

      // กลุ่มวิชาสำหรับหลักสูตรปี 2560
      // เฉพาะกลุ่มที่ไม่ตรงกับของปี 2565

      { name: 'กลุ่มวิชาวิทยาศาสตร์และคณิตศาสตร์', credits: 6 },
      { name: 'กลุ่มมนุษยศาสตร์', credits: 6 },
      { name: 'กลุ่มสังคมศาสตร์', credits: 6 },

      // กลุ่มวิชาของหลักสูตรปี 2570
      {
        name: 'หมวดวิชาศึกษาทั่วไป (2570)',
        credits: 30,
        children: [
          {
            name: 'สมรรถนะด้านภาษาและการสื่อสาร',
            credits: 12,
            children: [
              { name: 'รายวิชาภาษาไทย (2570)', credits: 3 },
              { name: 'รายวิชาภาษาต่างประเทศ (2570)', credits: 9 },
            ],
          },
          { name: 'สมรรถนะด้านสังคมและความเป็นมนุษย์', credits: 3 },
          {
            name: 'สมรรถนะด้านการคิดคำนวณ การใช้เหตุผล และการใช้เทคโนโลยี',
            credits: 3,
          },
          { name: 'สมรรถนะด้านการเป็นผู้ประกอบการ', credits: 6 },
          { name: 'สมรรถนะด้านการทำงานและการเรียนรู้ตลอดชีวิต', credits: 6 },
        ],
      },
      {
        name: 'หมวดวิชาเฉพาะ (2570)',
        credits: 84,
        children: [
          { name: 'กลุ่มวิชาแกน (2570)', credits: 18 },
          { name: 'กลุ่มวิชาเฉพาะด้าน (2570)', credits: 45 },
          {
            name: 'กลุ่มวิชาพื้นฐานวิชาชีพและวิชาชีพ (2570)',
            credits: 21,
            children: [
              {
                name: 'กลุ่มวิชาปัญญาประดิษฐ์และวิทยาการข้อมูล (Artificial Intelligence & Data Science)',
                credits: 27,
              },
              {
                name: 'กลุ่มวิชาวิศวกรรมซอฟต์แวร์และนวัตกรรมดิจิทัล (Software Engineering & Digital Innovation)',
                credits: 27,
              },
              {
                name: 'กลุ่มวิชาโครงสร้างพื้นฐานดิจิทัลและเทคโนโลยีล้ำสมัย (Digital Infrastructure & Emerging Technologies)',
                credits: 21,
              },
              {
                name: 'กลุ่มวิชาหัวข้อพิเศษ (Special Topics) (2570)',
                credits: 6,
              },
            ],
          },
        ],
      },
      { name: 'หมวดวิชาเลือกเสรี (2570)', credits: 6 },
    ];

    for (const groupData of data) {
      await this.seedRecursive(groupData, null);
    }
    console.log('CourseGroup seeding completed.');
  }

  private async seedRecursive(
    data: CourseGroupData,
    parent: CourseGroup | null,
  ) {
    // Check if exists by name AND parent (to avoid duplicates if names are reused in different sub-groups)
    // If parent is null, we check where parent IS NULL.
    const existing = await this.repository.findOne({
      where: {
        name: data.name,
        parent: parent ? { id: parent.id } : IsNull(),
      },
    });

    let currentGroup = existing;

    if (!currentGroup) {
      currentGroup = this.repository.create({
        name: data.name,
        credits: data.credits,
        parent: parent || undefined,
      });
      try {
        currentGroup = await this.repository.save(currentGroup);
        console.log(
          `Created: ${currentGroup.name} (Parent: ${parent ? parent.name : 'None'})`,
        );
      } catch (error) {
        console.error(
          `Error saving ${data.name}:`,
          error instanceof Error ? error.message : error,
        );
        // Stop processing children if parent failed
        return;
      }
    } else {
      console.log(
        `Exists: ${currentGroup.name} (Parent: ${parent ? parent.name : 'None'})`,
      );
    }

    if (data.children && data.children.length > 0) {
      for (const childData of data.children) {
        await this.seedRecursive(childData, currentGroup);
      }
    }
  }
}
