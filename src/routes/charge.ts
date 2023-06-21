import { AxiosInstance, AxiosError, CreateAxiosDefaults, AxiosRequestConfig } from 'axios';
import { baseURL } from '../static/variables';
import { createAxiosInstance } from '../utils/utils';
import { ClientConfig } from '../interfaces/global';
import { ChargeCreateRequestData, ChargeSubmitAddressRequestData, ChargeSubmitBirthdayRequestData, ChargeSubmitOTPRequestData, ChargeSubmitPhoneRequestData, ChargeSubmitPinRequestData } from '../interfaces/charge.request';

class Charge {
  private paystackClient: AxiosInstance = createAxiosInstance(this.axiosConfig);
  constructor(
    private axiosConfig: CreateAxiosDefaults,
    private clientConfig: ClientConfig
  ) {
    this.paystackClient.defaults.baseURL = baseURL + 'charge';
  }

  private apiRequest = async (requestConfig: AxiosRequestConfig) => {
    try {
      const result = await this.paystackClient(requestConfig);
      return this.clientConfig.showRaw ? result : result.data; // The data in the axios response
    } catch (error: any | AxiosError) {
      // console.log(error)
      let errorData = error.response?.data || error.cause;
      error.response?.data === undefined
        ? (errorData = { error: 'Data not received', cause: error.cause })
        : this.clientConfig.hideHttpErrorStatus
        ? errorData
        : (errorData.httpStatus = { statusCode: error.response?.status, statusMessage: error.response?.statusText });
      return this.clientConfig.showRaw ? error : errorData; // The data in the response of the axios error
    }
  };

  create = (data: ChargeCreateRequestData) => {
    return this.apiRequest({ method: 'POST', data });
  };

  submitPin = (data: ChargeSubmitPinRequestData) => {
    return this.apiRequest({ method: 'POST', data, url: `submit_pin` });
  };

  submitOTP = (data: ChargeSubmitOTPRequestData) => {
    return this.apiRequest({ method: 'POST', data, url: `submit_otp` });
  };

  submitPhone = (data: ChargeSubmitPhoneRequestData) => {
    return this.apiRequest({ method: 'POST', data, url: `submit_phone` });
  };
  
  submitBirthday = (data: ChargeSubmitBirthdayRequestData) => {
    return this.apiRequest({ method: 'POST', data, url: `submit_birthday` });
  };

  submitAddress = (data: ChargeSubmitAddressRequestData) => {
    return this.apiRequest({ method: 'POST', data, url: `submit_address` });
  };

  checkPending = (reference: string) => {
    return this.apiRequest({ method: 'GET', url: `${reference}` });
  };
}

export default Charge;
