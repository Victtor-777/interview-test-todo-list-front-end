export interface ApiErrorResponse {
  message: string;
  statusCode: number;
  error?: string;
}

export interface ApiError {
  response?: {
    data: ApiErrorResponse;
    status: number;
  };
  message: string;
}
