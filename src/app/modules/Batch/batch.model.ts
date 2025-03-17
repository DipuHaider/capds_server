import { Schema, model } from 'mongoose';
import { TBatch } from './batch.interface';

const batchSchema = new Schema<TBatch>(
  {
    course: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
      required: true, // Ensuring a valid course is always selected
    },
    title: {
      type: String,
      required: true,
    },
    prefix: {
      type: String,
      required: false, // Optional prefix
    },
    code: {
      type: Number,
      required: true,
    },
    days: [
      {
        day: {
          type: String,
          enum: [
            'Friday',
            'Saturday',
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
          ],
          required: true,
        },
        time: {
          type: String,
          required: true, // Ensures time is given for each selected day
        },
      },
    ],
    students: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    isActive: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export const Batch = model<TBatch>('Batch', batchSchema);
