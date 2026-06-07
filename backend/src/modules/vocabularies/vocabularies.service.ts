import { prisma } from '../../shared/prisma';

export const getAllVocabularies = async (gradeLevel?: number) => {
  const whereClause: any = { deleted_at: null };
  if (gradeLevel) {
    whereClause.gradeLevel = gradeLevel;
  }
  return prisma.vocabulary.findMany({
    where: whereClause,
    orderBy: { created_at: 'desc' },
  });
};

export const createVocabulary = async (data: {
  english: string;
  indonesian: string;
  gradeLevel: number;
  voice_path?: string;
  image_path?: string;
}) => {
  return prisma.vocabulary.create({
    data: data,
  });
};

export const updateVocabulary = async (
  id: number,
  data: {
    english?: string;
    indonesian?: string;
    gradeLevel?: number;
    voice_path?: string;
    image_path?: string;
  }
) => {
  return prisma.vocabulary.update({
    where: { id },
    data: data,
  });
};

export const deleteVocabulary = async (id: number) => {
  return prisma.vocabulary.update({
    where: { id },
    data: { deleted_at: new Date() },
  });
};
