import { Response } from 'express';
import { Parser, AsyncParser } from 'json2csv';
import { IUserRequest } from '../models/common/IUserRequest';

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
    status: "error",
    message: `${name.toUpperCase()}: ${message}`,
  });
}

interface IField {
  label: string,
  value: string
}

export const downloadReports = (res: Response, fileName: string, fields: IField[] , data: IUserRequest[]) => {
  const json2csv = new Parser ({ fields });
  const csv = json2csv.parse(data);

  res.header('Content-Type', 'text/csv');
  res.attachment(fileName);
  return res.send(csv);
}
