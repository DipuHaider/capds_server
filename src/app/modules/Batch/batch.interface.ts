import { Types } from 'mongoose';

export type TDays =
  | 'Friday'
  | 'Saturday'
  | 'Sunday'
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday';

export type TBatchDay = {
  day: TDays;
  time: string;
};

export type TBatch = {
  _id?: Types.ObjectId;
  course: Types.ObjectId;
  title: string;
  prefix?: string; // Made optional
  code: number;
  days: TBatchDay[]; // Array of objects with day and time
  students: Types.ObjectId[]; // Array of student IDs
  isActive?: boolean;
  isDeleted?: boolean;
};
