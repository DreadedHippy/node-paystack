import { RequestData } from '../interfaces/request';
import { AxiosInstance, AxiosError, CreateAxiosDefaults, AxiosRequestConfig } from 'axios';
import { AllResponse } from '../interfaces/response';
import { baseURL } from '../static/variables';
import { createAxiosInstance } from '../utils/utils';

class Charge {
  private paystackClient: AxiosInstance = createAxiosInstance(this.axiosConfig);
  constructor(private axiosConfig: CreateAxiosDefaults) {
    this.paystackClient.defaults.baseURL = baseURL + 'charge';
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

  create = (data: RequestData) => {
    return this.apiRequest({ method: 'POST', data });
  };

  submitPin = (data: { pin: string; reference: string }) => {
    return this.apiRequest({ method: 'POST', data, url: `submit_pin` });
  };

  submitOTP = (data: { otp: string; reference: string }) => {
    return this.apiRequest({ method: 'POST', data, url: `submit_otp` });
  };

  submitPhone = (data: { phone: string; reference: string }) => {
    return this.apiRequest({ method: 'POST', data, url: `submit_phone` });
  };

  submitBirthday = (data: {
    birthday: `${number}${number}${number}${number}-${number}${number}-${number}${number}`;
    reference: string;
  }) => {
    return this.apiRequest({ method: 'POST', data, url: `submit_birthday` });
  };

  submitAddress = (data: { address: string; city: string; state: string; zip_code: string; reference: string }) => {
    return this.apiRequest({ method: 'POST', data, url: `submit_address` });
  };

  checkPending = (reference: string) => {
    return this.apiRequest({ method: 'GET', url: `${reference}` });
  };
}

export default Charge;
