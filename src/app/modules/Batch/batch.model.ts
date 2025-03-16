import { Schema, model } from 'mongoose';
import { TBatch } from './batch.interface';

const batchSchema = new Schema<TBatch>(
  {
    course: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
    },
    title: {
      type: String,
      required: true,
    },
    prefix: {
      type: String,
      required: true,
    },
    code: {
      type: Number,
      required: true,
    },
    days: [
      {
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
      },
    ],
    startTime: {
      type: String,
      required: true,
    },
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
