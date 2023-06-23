import { AxiosInstance, AxiosError, CreateAxiosDefaults, AxiosRequestConfig } from 'axios';
import { baseURL } from '../static/variables';
import { createAxiosInstance } from '../utils/utils';
import { ClientConfig } from '../interfaces/global';
import {
  SplitCreateRequestData,
  SplitListRequestParams,
  SplitUpdateRequestData,
  SplitUpsertSubaccountRequestData,
  SplitRemoveSubaccountRequestData,
} from '../interfaces/split.request';

class Split {
  private paystackClient: AxiosInstance = createAxiosInstance(this.axiosConfig);
  constructor(private axiosConfig: CreateAxiosDefaults, private clientConfig: ClientConfig) {
    this.paystackClient.defaults.baseURL = baseURL + 'split';
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
        ? (errorData = errorData)
        : (errorData.httpStatus = { statusCode: error.response?.status, statusMessage: error.response?.statusText });
      return this.clientConfig.showRaw ? error : errorData; // The data in the response of the axios error
    }
  };

  create = (data: SplitCreateRequestData) => {
    return this.apiRequest({ method: 'POST', data });
  };

  list = (params?: SplitListRequestParams) => {
    return this.apiRequest({ method: 'GET', params });
  };

  fetch = (id: string | number) => {
    return this.apiRequest({ method: 'GET', url: `${id}` });
  };

  update = (id: string | number, data: SplitUpdateRequestData) => {
    return this.apiRequest({ method: 'PUT', url: `${id}`, data });
  };

  upsertSubaccount = (id: string | number, data: SplitUpsertSubaccountRequestData) => {
    return this.apiRequest({ method: 'POST', url: `${id}/subaccount/add`, data });
  };

  removeSubaccount = (id: string | number, data: SplitRemoveSubaccountRequestData) => {
    return this.apiRequest({ method: 'POST', url: `${id}/subaccount/remove`, data });
  };
}

export default Split;
