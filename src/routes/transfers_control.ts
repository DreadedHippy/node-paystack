import { AxiosInstance, AxiosError, CreateAxiosDefaults, AxiosRequestConfig } from 'axios';
import { baseURL } from '../static/variables';
import { createAxiosInstance } from '../utils/utils';
import { ClientConfig } from '../interfaces/global';
import { TransfersControlFinalizeDisableOTPRequestData, TransfersControlResendOTPRequestData } from '../interfaces/transfers_control.request';

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
        ? errorData = errorData
        : (errorData.httpStatus = { statusCode: error.response?.status, statusMessage: error.response?.statusText });
      return this.clientConfig.showRaw ? error : errorData; // The data in the response of the axios error
    }
  };

  checkBalance = () => {
    return this.apiRequest({ method: 'GET', url: 'balance' });
  };

  fetchBalanceLedger = () => {
    return this.apiRequest({ method: 'GET', url: 'balance/ledger' });
  };

  resendOTP = (data: TransfersControlResendOTPRequestData) => {
    return this.apiRequest({ method: 'POST', url: 'transfer/resend_otp', data });
  };

  disableOTP = () => {
    return this.apiRequest({ method: 'POST', url: 'transfer/disable_otp' });
  };

  finalizeDisableOTP = (data: TransfersControlFinalizeDisableOTPRequestData) => {
    return this.apiRequest({ method: 'POST', url: 'transfer/disable_otp_finalize', data });
  };

  enableOTP = () => {
    return this.apiRequest({ method: 'POST', url: 'transfer/enable_otp' });
  };
}

export default TransfersControl;
