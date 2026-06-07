import { SkillCategory } from '../../../generated/prisma/client';
import { prisma } from '../../shared/prisma';

export const getAllMaterials = async (gradeLevel?: number, skillCategory?: SkillCategory) => {
  const whereClause: any = { deleted_at: null };
  if (gradeLevel) whereClause.gradeLevel = gradeLevel;
  if (skillCategory) whereClause.skillCategory = skillCategory;

  return prisma.material.findMany({
    where: whereClause,
    orderBy: [{ gradeLevel: 'asc' }, { chapter: 'asc' }],
  });
};

export const createMaterial = async (data: {
  chapter: number;
  gradeLevel: number;
  skillCategory: SkillCategory;
  content?: string;
  mediaUrl?: string;
}) => {
  return prisma.material.create({ data });
};

export const updateMaterial = async (
  id: number,
  data: {
    chapter?: number;
    gradeLevel?: number;
    skillCategory?: SkillCategory;
    content?: string;
    mediaUrl?: string;
  }
) => {
  return prisma.material.update({
    where: { id },
    data,
  });
};

export const deleteMaterial = async (id: number) => {
  return prisma.material.update({
    where: { id },
    data: { deleted_at: new Date() },
  });
};
