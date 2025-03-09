"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleDuplicateError = (err) => {
    // Extract duplicate field value from error message using regex
    const match = err.message.match(/"([^"]*)"/);
    const extractedMessage = match ? match[1] : 'Duplicate value';
    const errorSources = [
        {
            path: '',
            message: `${extractedMessage} already exists`,
        },
    ];
    const statusCode = 400;
    return {
        statusCode,
        message: 'Duplicate key error',
        errorSources,
    };
};
exports.default = handleDuplicateError;
