import { AxiosInstance, AxiosError, CreateAxiosDefaults, AxiosRequestConfig } from 'axios';
import { baseURL } from '../static/variables';
import { createAxiosInstance } from '../utils/utils';
import { ClientConfig } from '../interfaces/global';
import {
  DisputeAddEvidenceRequestData,
  DisputeGetUploadURLRequestParams,
  DisputeListRequestParams,
  DisputeResolveRequestData,
  DisputeUpdateRequestData,
} from '../interfaces/dispute.request';

class Dispute {
  private paystackClient: AxiosInstance = createAxiosInstance(this.axiosConfig);
  constructor(private axiosConfig: CreateAxiosDefaults, private clientConfig: ClientConfig) {
    this.paystackClient.defaults.baseURL = baseURL + 'dispute';
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

  list = (params?: DisputeListRequestParams) => {
    return this.apiRequest({ method: 'GET', params });
  };

  fetch = (disputeId: string) => {
    return this.apiRequest({ method: 'GET', url: `${disputeId}` });
  };

  listTransactionDisputes = (transactionId: string) => {
    return this.apiRequest({ method: 'GET', url: `transaction/${transactionId}` });
  };

  update = (disputeId: string, data: DisputeUpdateRequestData) => {
    return this.apiRequest({ method: 'PUT', url: `${disputeId}`, data });
  };

  addEvidence = (disputeId: string, data: DisputeAddEvidenceRequestData) => {
    return this.apiRequest({ method: 'POST', url: `${disputeId}/evidence`, data });
  };

  getUploadURL = (disputeId: string, params: DisputeGetUploadURLRequestParams) => {
    return this.apiRequest({ method: 'GET', url: `${disputeId}/upload_url`, params });
  };

  resolve = (disputeId: string, data: DisputeResolveRequestData) => {
    return this.apiRequest({ method: 'PUT', url: `${disputeId}/resolve`, data });
  };

  export = (params?: DisputeListRequestParams) => {
    return this.apiRequest({ method: 'GET', url: `export`, params });
  };
}

export default Dispute;
