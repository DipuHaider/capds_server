import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BatchServices } from './batch.service';

const createBatch = catchAsync(async (req, res) => {
  const result = await BatchServices.createBatchIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED, // 201 is better for creation
    success: true,
    message: 'Batch created successfully',
    data: result,
  });
});

const getAllBatches = catchAsync(async (req, res) => {
  const result = await BatchServices.getAllBatchesFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Batches retrieved successfully',
    data: result,
  });
});

const getSingleBatch = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BatchServices.getSingleBatchFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Batch retrieved successfully',
    data: result,
  });
});

const updateBatch = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BatchServices.updateBatchIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Batch updated successfully', // Fixed message
    data: result,
  });
});

const deleteBatch = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BatchServices.deleteBatchFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Batch deleted successfully',
    data: result,
  });
});

const assignStudentsToBatch = catchAsync(async (req, res) => {
  const { batchId } = req.params;
  const { studentIds } = req.body;
  const result = await BatchServices.assignStudentsToBatch(batchId, studentIds);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Students assigned successfully',
    data: result,
  });
});

const removeStudentsFromBatch = catchAsync(async (req, res) => {
  const { batchId } = req.params;
  const { studentIds } = req.body;
  const result = await BatchServices.removeStudentsFromBatch(
    batchId,
    studentIds,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Students removed successfully',
    data: result,
  });
});

export const BatchControllers = {
  createBatch,
  getAllBatches,
  getSingleBatch,
  updateBatch,
  deleteBatch,
  assignStudentsToBatch,
  removeStudentsFromBatch,
};
