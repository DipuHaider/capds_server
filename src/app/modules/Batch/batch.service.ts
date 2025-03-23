import httpStatus from 'http-status';
import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { TBatch } from './batch.interface';
import { Batch } from './batch.model';
import { BatchSearchableFields } from './batch.constant';

const createBatchIntoDB = async (payload: TBatch) => {
  const result = await Batch.create(payload);
  return result;
};

const getAllBatchesFromDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    Batch.find().populate('course'),
    // .populate('course'),  // Uncomment if you need to populate course
    query,
  )
    .search(BatchSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await courseQuery.modelQuery;
  return result;
};

const getSingleBatchFromDB = async (id: string) => {
  const result = await Batch.findById(id).populate('course'); // Populates course data
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Batch not found');
  }
  return result;
};

const updateBatchIntoDB = async (id: string, payload: Partial<TBatch>) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const updatedBatch = await Batch.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
      session,
    }).populate('course');

    if (!updatedBatch) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update batch!');
    }

    await session.commitTransaction();
    return updatedBatch;
  } catch (err) {
    await session.abortTransaction();
    console.error('Batch update error:', err);
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update batch');
  } finally {
    session.endSession();
  }
};

const deleteBatchFromDB = async (id: string) => {
  const result = await Batch.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Batch not found');
  }
  return result;
};

const assignStudentsToBatch = async (batchId: string, studentIds: string[]) => {
  const result = await Batch.findByIdAndUpdate(
    batchId,
    { $addToSet: { students: { $each: studentIds } } },
    { new: true },
  ).populate('students');

  if (!result)
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to assign students');
  return result;
};

const removeStudentsFromBatch = async (
  batchId: string,
  studentIds: string[],
) => {
  const result = await Batch.findByIdAndUpdate(
    batchId,
    { $pull: { students: { $in: studentIds } } },
    { new: true },
  ).populate('students');

  if (!result)
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to remove students');
  return result;
};

export const BatchServices = {
  createBatchIntoDB,
  getAllBatchesFromDB,
  getSingleBatchFromDB,
  updateBatchIntoDB,
  deleteBatchFromDB,
  assignStudentsToBatch,
  removeStudentsFromBatch,
};
