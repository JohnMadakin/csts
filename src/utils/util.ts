import { Response } from 'express';


interface ICustomError extends Error {
  statusCode: number,
}

export const successResponse = (res: Response, message: string, code: number, data: any = null) => {
  if (!data) {
    return res.status(code).json({
      success: true,
      message,
    });
  }
  return res.status(code).json({
    success: true,
    message,
    data,
  });
}

export const errorObject = (status: string, message: string = 'Service Error Occured') => {
  return {
    status,
    message,
  }
}

export const sendErrorResponse = (error: ICustomError, res: Response) => {
  const { name, message, statusCode } = error;
  const code = statusCode || 500;

  res.status(code).json({
    success: false,
    message: `${name.toUpperCase()}: ${message}`,
  });
}
