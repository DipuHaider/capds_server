import { z } from 'zod';

const daysEnum = [
  'Friday',
  'Saturday',
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
] as const;

const timeStringSchema = z.string().refine(
  (time) => {
    const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/; // 00-09 10-19 20-23
    return regex.test(time);
  },
  {
    message: 'Invalid time format , expected "HH:MM" in 24 hours format',
  },
);

const batchDaySchema = z.object({
  day: z.enum(daysEnum),
  time: timeStringSchema,
});

const createBatchValidationSchema = z.object({
  body: z.object({
    course: z.string().min(1, { message: 'Course ID is required' }),
    title: z.string().min(1, { message: 'Title is required' }),
    prefix: z.string().optional(),
    code: z.number().positive({ message: 'Code must be a positive number' }),
    days: z
      .array(batchDaySchema)
      .min(1, { message: 'At least one day must be scheduled' }),
    students: z.array(z.string()).optional(),
    isActive: z.boolean().optional(),
    isDeleted: z.boolean().optional(),
  }),
});

const updateBatchValidationSchema = createBatchValidationSchema.partial();

const assignStudentsToBatchValidationSchema = z.object({
  body: z.object({
    studentIds: z
      .array(z.string())
      .min(1, { message: 'At least one student ID is required' }),
  }),
});

export const BatchValidations = {
  createBatchValidationSchema,
  updateBatchValidationSchema,
  assignStudentsToBatchValidationSchema,
};
