import { Types } from 'mongoose';

export type TDays =
  | 'Friday'
  | 'Saturday'
  | 'Sunday'
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday';

export type TBatch = {
  course: Types.ObjectId;
  title: string;
  prefix: string;
  code: number;
  days: [TDays];
  startTime: string;
  isActive?: boolean;
  isDeleted?: boolean;
};
