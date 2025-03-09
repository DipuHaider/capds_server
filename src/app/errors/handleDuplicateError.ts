import { TErrorSources, TGenericErrorResponse } from '../interface/error';

// Define a specific type for MongoDB duplicate key errors
interface MongoDuplicateError extends Error {
  code: number;
  keyValue?: Record<string, unknown>;
  message: string;
}

const handleDuplicateError = (
  err: MongoDuplicateError,
): TGenericErrorResponse => {
  // Extract duplicate field value from error message using regex
  const match = err.message.match(/"([^"]*)"/);
  const extractedMessage = match ? match[1] : 'Duplicate value';

  const errorSources: TErrorSources = [
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

export default handleDuplicateError;
