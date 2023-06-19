import { RequestData, RequestParams } from '../interfaces/request';
import { AxiosInstance, AxiosError, AxiosResponse, CreateAxiosDefaults, AxiosRequestConfig } from 'axios';
import { SuccessResponse, ErrorResponse, AllResponse } from '../interfaces/response';
import { baseURL } from '../static/variables';
import { createAxiosInstance } from '../utils/utils';

class Integration {
  private paystackClient: AxiosInstance = createAxiosInstance(this.axiosConfig);
  constructor(private axiosConfig: CreateAxiosDefaults) {
    this.paystackClient.defaults.baseURL = baseURL + 'integration';
  }

  private apiRequest = async (requestConfig: AxiosRequestConfig) => {
    try {
      const result = await this.paystackClient(requestConfig);
      return result.data; // The data in the axios response
    } catch (error: any | AxiosError) {
      // console.log(error)
      let errorData = error.response?.data || (error.cause as AllResponse);
      error.response?.data === undefined
        ? (errorData = { error: 'Data not received', cause: error.cause })
        : (errorData.httpStatus = { statusCode: error.response?.status, statusMessage: error.response?.statusText });
      return errorData; // The data in the response of the axios error
    }
  };

  fetchTimeout = () => {
    return this.apiRequest({ method: 'GET', url: `payment_session_timeout` });
  };

  updateTimeout = (data: { timeout: number }) => {
    return this.apiRequest({ method: 'PUT', url: `payment_session_timeout`, data });
  };
}

export default Integration;
