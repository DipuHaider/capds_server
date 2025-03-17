import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { BatchControllers } from './batch.controller';
import { BatchValidations } from './batch.validation';

const router = express.Router();

router.post(
  '/create-batch',
  auth('admin'),
  validateRequest(BatchValidations.createBatchValidationSchema),
  BatchControllers.createBatch,
);

router.get(
  '/:id',
  auth('student', 'faculty', 'admin'),
  BatchControllers.getSingleBatch,
);

router.patch(
  '/:id',
  auth('admin'),
  validateRequest(BatchValidations.updateBatchValidationSchema),
  BatchControllers.updateBatch,
);

router.delete('/:id', auth('admin'), BatchControllers.deleteBatch);

router.put(
  '/:batchId/assign-students',
  validateRequest(BatchValidations.assignStudentsToBatchValidationSchema),
  BatchControllers.assignStudentsToBatch,
);

router.delete(
  '/:batchId/remove-students',
  validateRequest(BatchValidations.assignStudentsToBatchValidationSchema),
  BatchControllers.removeStudentsFromBatch,
);

router.get('/', BatchControllers.getAllBatches);

export const BatchRoutes = router;
