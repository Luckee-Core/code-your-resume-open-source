export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
  warnings?: string[];
};

export type ApiResult<T> = ApiResponse<T> & { httpStatus: number };
