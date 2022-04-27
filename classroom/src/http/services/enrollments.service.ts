import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service';

interface GetEnrollmentByStudentIdAndCourseIdParams {
  courseId: string;
  studentId: string;
}

@Injectable()
export class EnrollmentsService {
  constructor(private prisma: PrismaService) {}

  getEnrollmentByStudentIdAndCourseId({
    courseId,
    studentId,
  }: GetEnrollmentByStudentIdAndCourseIdParams) {
    return this.prisma.enrollment.findFirst({
      where: {
        courseId,
        studentId,
        canceledAt: null,
      },
    });
  }

  listAllEnrollments() {
    return this.prisma.enrollment.findMany({
      where: {
        canceledAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  listEnrollmentsByStudentId(studentId: string) {
    return this.prisma.enrollment.findMany({
      where: {
        studentId,
        canceledAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
