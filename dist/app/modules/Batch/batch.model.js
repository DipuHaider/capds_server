"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Batch = void 0;
const mongoose_1 = require("mongoose");
const batchSchema = new mongoose_1.Schema({
    course: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Course',
        required: true, // Ensuring a valid course is always selected
    },
    title: {
        type: String,
        required: true,
    },
    prefix: {
        type: String,
        required: false, // Optional prefix
    },
    code: {
        type: Number,
        required: true,
    },
    days: [
        {
            day: {
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
                required: true,
            },
            time: {
                type: String,
                required: true, // Ensures time is given for each selected day
            },
        },
    ],
    students: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'User' }],
    isActive: {
        type: Boolean,
        default: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
exports.Batch = (0, mongoose_1.model)('Batch', batchSchema);
