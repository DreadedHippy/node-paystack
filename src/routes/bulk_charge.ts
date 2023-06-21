import { AxiosInstance, AxiosError, CreateAxiosDefaults, AxiosRequestConfig } from 'axios';
import { baseURL } from '../static/variables';
import { createAxiosInstance } from '../utils/utils';
import { ClientConfig } from '../interfaces/global';
import { BulkChargeFetchChargeRequestParams, BulkChargeInitiateRequestData, BulkChargeListRequestParams } from '../interfaces/bulk_charge.request';

class BulkCharge {
  private paystackClient: AxiosInstance = createAxiosInstance(this.axiosConfig);
  constructor(
    private axiosConfig: CreateAxiosDefaults,
    private clientConfig: ClientConfig
  ) {
    this.paystackClient.defaults.baseURL = baseURL + 'bulkcharge';
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

  initiate = (data: BulkChargeInitiateRequestData[]) => {
    return this.apiRequest({ method: 'POST', data });
  };

  list = (params?: BulkChargeListRequestParams) => {
    return this.apiRequest({ method: 'GET', params });
  };

  fetch = (batchIdOrCode: string) => {
    return this.apiRequest({ method: 'GET', url: `${batchIdOrCode}` });
  };

  fetchCharges = (batchIdOrCode: string, params?: BulkChargeFetchChargeRequestParams) => {
    return this.apiRequest({ method: 'GET', url: `${batchIdOrCode}/charges`, params });
  };

  pause = (batchCode: string) => {
    return this.apiRequest({ method: 'GET', url: `pause/${batchCode}` });
  };

  resume = (batchCode: string) => {
    return this.apiRequest({ method: 'GET', url: `resume/${batchCode}` });
  };
}

export default BulkCharge;
