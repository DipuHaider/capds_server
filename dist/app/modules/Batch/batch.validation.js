"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BatchValidations = void 0;
const zod_1 = require("zod");
const daysEnum = [
    'Friday',
    'Saturday',
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
];
const timeStringSchema = zod_1.z.string().refine((time) => {
    const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/; // 00-09 10-19 20-23
    return regex.test(time);
}, {
    message: 'Invalid time format , expected "HH:MM" in 24 hours format',
});
const batchDaySchema = zod_1.z.object({
    day: zod_1.z.enum(daysEnum),
    time: timeStringSchema,
});
const createBatchValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        course: zod_1.z.string().min(1, { message: 'Course ID is required' }),
        title: zod_1.z.string().min(1, { message: 'Title is required' }),
        prefix: zod_1.z.string().optional(),
        code: zod_1.z.number().positive({ message: 'Code must be a positive number' }),
        days: zod_1.z
            .array(batchDaySchema)
            .min(1, { message: 'At least one day must be scheduled' }),
        students: zod_1.z.array(zod_1.z.string()).optional(),
        isActive: zod_1.z.boolean().optional(),
        isDeleted: zod_1.z.boolean().optional(),
    }),
});
const updateBatchValidationSchema = createBatchValidationSchema.partial();
const assignStudentsToBatchValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        studentIds: zod_1.z
            .array(zod_1.z.string())
            .min(1, { message: 'At least one student ID is required' }),
    }),
});
exports.BatchValidations = {
    createBatchValidationSchema,
    updateBatchValidationSchema,
    assignStudentsToBatchValidationSchema,
};
