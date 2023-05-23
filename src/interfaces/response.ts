import { AxiosResponse, AxiosError } from './../../node_modules/axios/index.d';
interface SuccessResponse {
  status: boolean;
  message: string;
  data: string;
  meta?: object;
}

interface NewAxiosResponse extends AxiosResponse {
  data: SuccessResponse;
}

interface ErrorResponse {
  status: boolean;
  message: string;
}

type AllResponse = SuccessResponse & ErrorResponse;

export { SuccessResponse, ErrorResponse, NewAxiosResponse, AllResponse };
