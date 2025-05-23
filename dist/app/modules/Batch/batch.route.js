"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BatchRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const batch_controller_1 = require("./batch.controller");
const batch_validation_1 = require("./batch.validation");
const router = express_1.default.Router();
router.post('/create-batch', (0, auth_1.default)('ADMIN'), (0, validateRequest_1.default)(batch_validation_1.BatchValidations.createBatchValidationSchema), batch_controller_1.BatchControllers.createBatch);
router.get('/:id', (0, auth_1.default)('STUDENT', 'FACULTY', 'ADMIN'), batch_controller_1.BatchControllers.getSingleBatch);
router.patch('/:id', (0, auth_1.default)('ADMIN'), (0, validateRequest_1.default)(batch_validation_1.BatchValidations.updateBatchValidationSchema), batch_controller_1.BatchControllers.updateBatch);
router.delete('/:id', (0, auth_1.default)('ADMIN'), batch_controller_1.BatchControllers.deleteBatch);
router.put('/:batchId/assign-students', (0, validateRequest_1.default)(batch_validation_1.BatchValidations.assignStudentsToBatchValidationSchema), batch_controller_1.BatchControllers.assignStudentsToBatch);
router.delete('/:batchId/remove-students', (0, validateRequest_1.default)(batch_validation_1.BatchValidations.assignStudentsToBatchValidationSchema), batch_controller_1.BatchControllers.removeStudentsFromBatch);
router.get('/', batch_controller_1.BatchControllers.getAllBatches);
exports.BatchRoutes = router;
