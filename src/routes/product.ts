import { AxiosInstance, AxiosError, CreateAxiosDefaults, AxiosRequestConfig } from 'axios';
import { baseURL } from '../static/variables';
import { RequestData, RequestParams } from '../interfaces/request';
import { AllResponse } from '../interfaces/response';
import { createAxiosInstance } from '../utils/utils';
import { ClientConfig } from '../interfaces/global';
import {
  ProductCreateRequestData,
  ProductListRequestParams,
  ProductUpdateRequestData,
} from '../interfaces/product.request';

class Product {
  private paystackClient: AxiosInstance = createAxiosInstance(this.axiosConfig);
  constructor(private axiosConfig: CreateAxiosDefaults, private clientConfig: ClientConfig) {
    this.paystackClient.defaults.baseURL = baseURL + 'product';
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

  /**
   * @description Create a product on your integration
   * @param {ProductCreateRequestData} data - The body of the API request
   * @example
   * Example usage of `create` method
   * ```js
   * product.create({
   *   "name": "Puff Puff",
   *   "description": "Crispy flour ball with fluffy interior",
   *   "price": "5000",
   *   "currency": "NGN",
   *   "unlimited": false,
   *   "quantity": 100
   * })
   * .then(result => console.log(result))
   * .catch(error => console.log(error))
   * ```
   * ***
   * Sample default response:
   * ```json
   * {
   *   "status": true,
   *   "message": "Product successfully created",
   *   "data": {
   *     "name": "Puff Puff",
   *     "description": "Crispy flour ball with fluffy interior",
   *     "currency": "NGN",
   *     "price": 5000,
   *     "quantity": 100,
   *     "is_shippable": true,
   *     "unlimited": false,
   *     "integration": 463433,
   *     "domain": "test",
   *     "metadata": {
   *       "background_color": "#F5F5F5"
   *     },
   *     "slug": "puff-puff-prqnxc",
   *     "product_code": "PROD_ddot3upakgl3ejt",
   *     "quantity_sold": 0,
   *     "type": "good",
   *     "shipping_fields": {
   *       "delivery_note": "disabled"
   *     },
   *     "active": true,
   *     "in_stock": true,
   *     "minimum_orderable": 1,
   *     "maximum_orderable": null,
   *     "low_stock_alert": false,
   *     "id": 489399,
   *     "createdAt": "2021-11-08T14:39:37.303Z",
   *     "updatedAt": "2021-11-08T14:39:37.303Z"
   *   }
   * }
   * ```
   * @returns {Promise<any>}
   */
  create = (data: ProductCreateRequestData) => {
    return this.apiRequest({ method: 'POST', data });
  };

  /**
   * @description List products available on your integration
   * @param {ProductListRequestParams} params - The query parameters of the API request
   * @example
   * Example usage of `list` method
   * ```js
   * product.list()
   * .then(result => console.log(result))
   * .catch(error => console.log(error))
   * ```
   * ***
   * Sample default response:
   * ```json
   * {
   *   "status": true,
   *   "message": "Products retrieved",
   *   "data": [
   *     {
   *       "id": 795638,
   *       "name": "Mimshack",
   *       "description": "Everything cars",
   *       "product_code": "PROD_22deobcvbht2dfe",
   *       "slug": "mimshack-yiuedh",
   *       "currency": "NGN",
   *       "price": 50000,
   *       "quantity": 10,
   *       "quantity_sold": 0,
   *       "active": true,
   *       "domain": "test",
   *       "type": "good",
   *       "in_stock": true,
   *       "unlimited": false,
   *       "metadata": {
   *         "background_color": "#F5F5F5"
   *       },
   *       "files": [],
   *       "success_message": null,
   *       "redirect_url": null,
   *       "split_code": null,
   *       "notification_emails": null,
   *       "minimum_orderable": 1,
   *       "maximum_orderable": null,
   *       "createdAt": "2022-04-12T11:21:43.000Z",
   *       "updatedAt": "2022-04-12T11:21:43.000Z",
   *       "digital_assets": [],
   *       "variant_options": [],
   *       "is_shippable": true,
   *       "shipping_fields": {
   *         "delivery_note": "disabled"
   *       },
   *       "integration": 463433,
   *       "low_stock_alert": 0
   *     }
   *   ],
   *   "meta": {
   *     "total": 1,
   *     "skipped": 0,
   *     "perPage": 50,
   *     "page": 1,
   *     "pageCount": 1
   *   }
   * }
   * ```
   * @returns {Promise<any>}
   */
  list = (params?: ProductListRequestParams) => {
    return this.apiRequest({ method: 'GET', params });
  };

  /**
   * @description Get details of a product on your integration
   * @param {string | number} productId - The ID of the product you want to fetch
   * @example
   * Example usage of `fetch` method
   * ```js
   * product.fetch(795638)
   * .then(result => console.log(result))
   * .catch(error => console.log(error))
   * ```
   * ***
   * Sample default response:
   * ```json
   * {
   *   "status": true,
   *   "message": "Product retrieved",
   *   "data": {
   *     "digital_assets": [],
   *     "integration": 463433,
   *     "name": "Mimshack",
   *     "description": "Everything cars",
   *     "product_code": "PROD_22deobcvbht2dfe",
   *     "price": 50000,
   *     "currency": "NGN",
   *     "quantity": 10,
   *     "quantity_sold": null,
   *     "type": "good",
   *     "files": null,
   *     "file_path": null,
   *     "is_shippable": true,
   *     "shipping_fields": {
   *       "delivery_note": "disabled"
   *     },
   *     "unlimited": false,
   *     "domain": "test",
   *     "active": true,
   *     "features": null,
   *     "in_stock": true,
   *     "metadata": {
   *       "background_color": "#F5F5F5"
   *     },
   *     "slug": "mimshack-yiuedh",
   *     "success_message": null,
   *     "redirect_url": null,
   *     "split_code": null,
   *     "notification_emails": null,
   *     "minimum_orderable": 1,
   *     "maximum_orderable": null,
   *     "low_stock_alert": false,
   *     "stock_threshold": null,
   *     "expires_in": null,
   *     "id": 795638,
   *     "createdAt": "2022-04-12T11:21:43.000Z",
   *     "updatedAt": "2022-04-12T11:21:43.000Z"
   *   }
   * }
   * ```
   * @returns {Promise<any>}
   */
  fetch = (productId: string | number) => {
    return this.apiRequest({ method: 'GET', url: `${productId}` });
  };

  /**
   * @description Update a product details on your integration
   * @param {string} productId - Product ID
   * @example
   * Example usage of `update` method
   * ```js
   * product.update(795638, {
   *   "description": "Product Six Description",
   *   "name": "Product Six",
   *   "price": 500000,
   *   "currency": "USD",
   *   "limited": false,
   *   "quantity": 100
   * })
   * .then(result => console.log(result))
   * .catch(error => console.log(error))
   * ```
   * ***
   * Sample default response:
   * ```json
   * {
   *   "status": true,
   *   "message": "Product successfully updated",
   *   "data": {
   *     "name": "Prod One",
   *     "description": "Prod 1",
   *     "product_code": "PROD_ohc0xq1ajpt2271",
   *     "price": 20000,
   *     "currency": "NGN",
   *     "quantity": 5,
   *     "quantity_sold": null,
   *     "type": "good",
   *     "image_path": "",
   *     "file_path": "",
   *     "is_shippable": false,
   *     "unlimited": false,
   *     "domain": "test",
   *     "active": true,
   *     "features": null,
   *     "in_stock": true,
   *     "metadata": null,
   *     "id": 526,
   *     "integration": 343288,
   *     "createdAt": "2019-06-29T14:46:52.000Z",
   *     "updatedAt": "2019-06-29T15:29:21.000Z"
   *   }
   * }
   * ```
   * @returns {Promise<any>}
   */
  update = (productId: string, data: ProductUpdateRequestData) => {
    return this.apiRequest({ method: 'PUT', url: `${productId}`, data });
  };
}

export default Product;
