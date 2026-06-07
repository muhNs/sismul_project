import { prisma } from '../../shared/prisma';

export const saveScore = async (user_id: number, material_id: number, score: number) => {
  return prisma.studentScore.create({
    data: {
      user_id,
      material_id,
      score,
    },
  });
};

export const getStudentScores = async (user_id: number) => {
  return prisma.studentScore.findMany({
    where: { user_id },
    include: {
      material: true,
    },
    orderBy: { created_at: 'desc' }
  });
};

export const getScoresByMaterial = async (material_id: number) => {
  return prisma.studentScore.findMany({
    where: { material_id },
    include: {
      user: {
        select: { id: true, name: true, email: true }
      }
    },
    orderBy: { score: 'desc' }
  });
};
