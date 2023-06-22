import { AxiosInstance, AxiosError, CreateAxiosDefaults, AxiosRequestConfig } from 'axios';
import { createAxiosInstance } from '../utils/utils';
import { baseURL } from '../static/variables';;
import { ClientConfig } from '../interfaces/global';
import { SubaccountCreateRequestData } from '../interfaces/subaccount.request';
import { SubscriptionDisableRequestData, SubscriptionEnableRequestData, SubscriptionListRequestParams } from '../interfaces/subscription.request';

class Subscription {
  private paystackClient: AxiosInstance = createAxiosInstance(this.axiosConfig);
  constructor(
    private axiosConfig: CreateAxiosDefaults,
    private clientConfig: ClientConfig
  ) {
    this.paystackClient.defaults.baseURL = baseURL + 'subscription';
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

  create = (data: SubaccountCreateRequestData) => {
    return this.apiRequest({ method: 'POST', data });
  };

  list = (params?: SubscriptionListRequestParams) => {
    return this.apiRequest({ method: 'GET', params });
  };

  fetch = (subscriptionIdOrCode: string) => {
    return this.apiRequest({ method: 'GET', url: `${subscriptionIdOrCode}` });
  };

  enable = (data: SubscriptionEnableRequestData) => {
    return this.apiRequest({ method: 'POST', url: `enable`, data });
  };

  disable = (data: SubscriptionDisableRequestData) => {
    return this.apiRequest({ method: 'POST', url: `disable`, data });
  };

  generateUpdateLink = (code: string) => {
    return this.apiRequest({ method: 'GET', url: `${code}/manage/link` });
  };

  sendUpdateLink = (code: string) => {
    return this.apiRequest({ method: 'POST', url: `${code}/manage/email` });
  };
}

export default Subscription;
