import { AxiosResponse, AxiosError } from './../../node_modules/axios/index.d';
interface SuccessResponse {
  status: boolean;
  message: string;
  data: string;
  meta?: object;
}

interface ErrorResponse {
  status: boolean;
  message: string;
}

type AllResponse = SuccessResponse & ErrorResponse;

export { SuccessResponse, ErrorResponse, AllResponse };
