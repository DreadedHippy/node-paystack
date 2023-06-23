import { AxiosInstance, AxiosError, CreateAxiosDefaults, AxiosRequestConfig } from 'axios';
import { baseURL } from '../static/variables';
import { createAxiosInstance } from '../utils/utils';
import { ClientConfig } from '../interfaces/global';
import { PageAddProductsRequestData, PageCreateRequestData, PageListRequestParams, PageUpdateRequestData } from '../interfaces/page.request';

class Page {
  private paystackClient: AxiosInstance = createAxiosInstance(this.axiosConfig);
  constructor(
    private axiosConfig: CreateAxiosDefaults,
    private clientConfig: ClientConfig
  ) {
    this.paystackClient.defaults.baseURL = baseURL + 'page';
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

  create = (data: PageCreateRequestData) => {
    return this.apiRequest({ method: 'POST', data });
  };

  list = (params?: PageListRequestParams) => {
    return this.apiRequest({ method: 'GET', params });
  };

  fetch = (idOrSlug: string) => {
    return this.apiRequest({ method: 'GET', url: `${idOrSlug}` });
  };

  update = (idOrSlug: string, data: PageUpdateRequestData) => {
    return this.apiRequest({ method: 'PUT', url: `${idOrSlug}`, data });
  };

  checkSlugAvailability = (slug: string) => {
    return this.apiRequest({ method: 'GET', url: `check_slug_availability/${slug}` });
  };

  addProducts = (pageId: string, data: PageAddProductsRequestData) => {
    return this.apiRequest({ method: 'POST', url: `${pageId}/product`, data });
  };
}

export default Page;
