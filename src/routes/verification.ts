import { AxiosInstance, AxiosError, CreateAxiosDefaults, AxiosRequestConfig } from 'axios';
import { baseURL } from '../static/variables';
import { AllResponse } from '../interfaces/response';
import { VerificationRouteRequestData } from '../interfaces/verification.request';
import { createAxiosInstance } from '../utils/utils';
import { ClientConfig } from '../interfaces/global';

class Verification {
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

  resolveAccount = async (params: { account_number: string; bank_code: string }) => {
    return this.apiRequest({
      method: 'GET',
      url: `bank/resolve?account_number=${params.account_number}&bank_code=${params.bank_code}`,
    });
  };

  validateAccount = async (data: VerificationRouteRequestData) => {
    return this.apiRequest({ method: 'POST', url: `bank/validate`, data });
  };

  resolveCardBin = async (bin: string) => {
    return this.apiRequest({ method: 'GET', url: `decision/bin/${bin}` });
  };
}

export default Verification;
