import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { BatchControllers } from './batch.controller';
import { BatchValidations } from './batch.validation';

const router = express.Router();

router.post(
  '/create-batch',
  auth('ADMIN'),
  validateRequest(BatchValidations.createBatchValidationSchema),
  BatchControllers.createBatch,
);

router.get(
  '/:id',
  auth('STUDENT', 'FACULTY', 'ADMIN'),
  BatchControllers.getSingleBatch,
);

router.patch(
  '/:id',
  auth('ADMIN'),
  validateRequest(BatchValidations.updateBatchValidationSchema),
  BatchControllers.updateBatch,
);

router.delete('/:id', auth('ADMIN'), BatchControllers.deleteBatch);

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
