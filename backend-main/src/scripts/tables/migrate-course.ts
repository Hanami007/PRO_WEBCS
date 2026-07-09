import { Course } from 'src/courses/entities/course.entity';
import { DataSource } from 'typeorm';

export async function migrateCourse(oldDb: DataSource, newDb: DataSource) {
  console.log('Starting Course Migration');
  const oldSubjects = await oldDb.query('SELECT * FROM subjects');
  const newCourseRepo = newDb.getRepository(Course);

  for (const oldSubject of oldSubjects) {
    const existingCourse = await newCourseRepo.findOne({
      where: { code: oldSubject.subject_code },
    });

    const courseData = {
      code: oldSubject.subject_code,
      titleTh: oldSubject.name_th,
      titleEn: oldSubject.name_en,
      description: oldSubject.detail,
      credits: oldSubject.credit,
      lectureHours: oldSubject.theory_hour,
      labHours: oldSubject.practical_hour,
      selfStudyHours: oldSubject.self_hour,
      createdAt: oldSubject.created_at || new Date(),
      updatedAt: oldSubject.updated_at || undefined,
      deletedAt: parseInt(oldSubject.is_del) ? new Date() : undefined,
    };

    if (existingCourse) {
      console.log(`Updating existing course: ${oldSubject.subject_code}`);
      const updatedCourse = newCourseRepo.merge(existingCourse, courseData);
      await newCourseRepo.save(updatedCourse);
    } else {
      const newCourse = newCourseRepo.create(courseData);
      await newCourseRepo.save(newCourse);
    }
  }
  console.log('Course Migration Complete');
}
