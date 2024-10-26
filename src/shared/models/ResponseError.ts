export interface ResponseError {
  statusCode: number;
  message: string;
  errors: {
    code: string;
    message: string;
  }[];
  error: string;
  error_description: string;
}
