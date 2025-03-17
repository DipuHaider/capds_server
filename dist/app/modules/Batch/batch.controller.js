"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BatchControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const batch_service_1 = require("./batch.service");
const createBatch = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield batch_service_1.BatchServices.createBatchIntoDB(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED, // 201 is better for creation
        success: true,
        message: 'Batch created successfully',
        data: result,
    });
}));
const getAllBatches = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield batch_service_1.BatchServices.getAllBatchesFromDB(req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Batches retrieved successfully',
        data: result,
    });
}));
const getSingleBatch = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield batch_service_1.BatchServices.getSingleBatchFromDB(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Batch retrieved successfully',
        data: result,
    });
}));
const updateBatch = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield batch_service_1.BatchServices.updateBatchIntoDB(id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Batch updated successfully', // Fixed message
        data: result,
    });
}));
const deleteBatch = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield batch_service_1.BatchServices.deleteBatchFromDB(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Batch deleted successfully',
        data: result,
    });
}));
const assignStudentsToBatch = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { batchId } = req.params;
    const { studentIds } = req.body;
    const result = yield batch_service_1.BatchServices.assignStudentsToBatch(batchId, studentIds);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Students assigned successfully',
        data: result,
    });
}));
const removeStudentsFromBatch = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { batchId } = req.params;
    const { studentIds } = req.body;
    const result = yield batch_service_1.BatchServices.removeStudentsFromBatch(batchId, studentIds);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Students removed successfully',
        data: result,
    });
}));
exports.BatchControllers = {
    createBatch,
    getAllBatches,
    getSingleBatch,
    updateBatch,
    deleteBatch,
    assignStudentsToBatch,
    removeStudentsFromBatch,
};
