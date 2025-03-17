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
exports.BatchServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = __importDefault(require("mongoose"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const batch_model_1 = require("./batch.model");
const batch_constant_1 = require("./batch.constant");
const createBatchIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield batch_model_1.Batch.create(payload);
    return result;
});
const getAllBatchesFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const courseQuery = new QueryBuilder_1.default(batch_model_1.Batch.find(), 
    // .populate('course'),  // Uncomment if you need to populate course
    query)
        .search(batch_constant_1.BatchSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield courseQuery.modelQuery;
    return result;
});
const getSingleBatchFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield batch_model_1.Batch.findById(id).populate('course'); // Populates course data
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Batch not found');
    }
    return result;
});
const updateBatchIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const updatedBatch = yield batch_model_1.Batch.findByIdAndUpdate(id, payload, {
            new: true,
            runValidators: true,
            session,
        }).populate('course');
        if (!updatedBatch) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to update batch!');
        }
        yield session.commitTransaction();
        return updatedBatch;
    }
    catch (err) {
        yield session.abortTransaction();
        console.error('Batch update error:', err);
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to update batch');
    }
    finally {
        session.endSession();
    }
});
const deleteBatchFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield batch_model_1.Batch.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Batch not found');
    }
    return result;
});
const assignStudentsToBatch = (batchId, studentIds) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield batch_model_1.Batch.findByIdAndUpdate(batchId, { $addToSet: { students: { $each: studentIds } } }, { new: true }).populate('students');
    if (!result)
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to assign students');
    return result;
});
const removeStudentsFromBatch = (batchId, studentIds) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield batch_model_1.Batch.findByIdAndUpdate(batchId, { $pull: { students: { $in: studentIds } } }, { new: true }).populate('students');
    if (!result)
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to remove students');
    return result;
});
exports.BatchServices = {
    createBatchIntoDB,
    getAllBatchesFromDB,
    getSingleBatchFromDB,
    updateBatchIntoDB,
    deleteBatchFromDB,
    assignStudentsToBatch,
    removeStudentsFromBatch,
};
