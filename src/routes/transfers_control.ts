import { AxiosInstance, AxiosError, CreateAxiosDefaults, AxiosRequestConfig } from 'axios';
import { baseURL } from '../static/variables';
import { RequestData, RequestParams } from '../interfaces/request';
import { AllResponse } from '../interfaces/response';
import { createAxiosInstance } from '../utils/utils';
import { ClientConfig } from '../interfaces/global';

class TransfersControl {
  private paystackClient: AxiosInstance = createAxiosInstance(this.axiosConfig);
  constructor(
    private axiosConfig: CreateAxiosDefaults,
    private clientConfig: ClientConfig
  ) {
    this.paystackClient.defaults.baseURL = baseURL;
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

  checkBalance = async () => {
    return this.apiRequest({ method: 'GET', url: 'balance' });
  };

  fetchBalanceLedger = async () => {
    return this.apiRequest({ method: 'GET', url: 'balance/ledger' });
  };

  resendOTP = async (data: RequestData) => {
    return this.apiRequest({ method: 'POST', url: 'transfer/resend_otp', data });
  };

  disableOTP = async () => {
    return this.apiRequest({ method: 'POST', url: 'transfer/disable_otp' });
  };

  finalizeDisableOTP = async (data: { otp: string }) => {
    return this.apiRequest({ method: 'POST', url: 'transfer/disable_otp_finalize', data });
  };

  enableOTP = async () => {
    return this.apiRequest({ method: 'POST', url: 'transfer/enable_otp' });
  };
}

export default TransfersControl;
