

import { Response } from "express";

type TMeta = {
  page: number;
  limit: number;
  total: number;
};

type TResponseData<T> = {
  success: boolean;
  statusCode: number;
  message: string;
  data?: T;
  meta?: TMeta;
};

export const sendResponse = <T>(
  res: Response,
  { success, statusCode, message, data, meta }: TResponseData<T>
) => {
  return res.status(statusCode).json({
    success,
    statusCode,
    message,
    data,
    meta,
  });
};