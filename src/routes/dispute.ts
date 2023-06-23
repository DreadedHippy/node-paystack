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

  /**
   * @description List disputes filed against you
   * @param {DisputeListRequestParams} params - The query parameters of the API request
   * @example
   * Example usage of `list` method
   * ```js
   * dispute.list()
   * .then(result => console.log(result))
   * .catch(error => console.log(error))
   * ```
   * ***
   * Sample default response:
   * ```json
   * {
   *   status: true,
   *   message: "Disputes retrieved",
   *   data: [
   *     {
   *       id: 2867,
   *       refund_amount: null,
   *       currency: null,
   *       status: "archived",
   *       resolution: null,
   *       domain: "test",
   *       transaction: {
   *         id: 5991760,
   *         domain: "test",
   *         status: "success",
   *         reference: "asjck8gf76zd1dr",
   *         amount: 39100,
   *         message: null,
   *         gateway_response: "Successful",
   *         paid_at: "2017-11-09T00:01:56.000Z",
   *         created_at: "2017-11-09T00:01:36.000Z",
   *         channel: "card",
   *         currency: "NGN",
   *         ip_address: null,
   *         metadata: "",
   *         log": null,
   *         "fees": 587,
   *         fees_split: null,
   *         authorization: {},
   *         customer: null,
   *         plan: {},
   *         subaccount: {},
   *         split: {},
   *         order_id: null,
   *         paidAt: "2017-11-09T00:01:56.000Z",
   *         createdAt: "2017-11-09T00:01:36.000Z",
   *         pos_transaction_data: null
   *       },
   *       transaction_reference: null,
   *       category: null,
   *       customer: {
   *         id: 10207,
   *         first_name: null,
   *         last_name: null,
   *         email: "shola@baddest.com",
   *         customer_code: "CUS_unz4q52yjsd6064",
   *         phone: null,
   *         metadata: null,
   *         risk_action: "default",
   *         international_format_phone: null
   *       },
   *       bin: null,
   *       last4: null,
   *       dueAt: null,
   *       resolvedAt: null,
   *       evidence: null,
   *       attachments: "[]",
   *       note: null,
   *       history: [
   *         {
   *           status: "pending",
   *           by: "demo@test.co",
   *           createdAt: "2017-11-16T16:12:24.000Z"
   *         }
   *       ],
   *       messages: [
   *         {
   *           sender: "demo@test.co",
   *           body: "test this",
   *           createdAt: "2017-11-16T16:12:24.000Z"
   *         }
   *       ],
   *       createdAt: "2017-11-16T16:12:24.000Z",
   *       updatedAt: "2019-08-16T08:05:25.000Z"
   *     }
   *   ],
   *   meta: {
   *     total: 1,
   *     skipped: 0,
   *     perPage: 50,
   *     page: 1,
   *     pageCount: 1
   *   }
   * }
   * ```
   * @returns {Promise<any>}
   */
  list = (params?: DisputeListRequestParams) => {
    return this.apiRequest({ method: 'GET', params });
  };

  /**
   * @description Get more details about a dispute.
   * @param {string} disputeId - The ID of the dispute you want to fetch
   * @example
   * Example usage of `fetch` method
   * ```js
   * dispute.fetch("2867")
   * .then(result => console.log(result))
   * .catch(error => console.log(error))
   * ```
   * ***
   * Sample default response:
   * ```json
   * {
   *   "status": true,
   *   "message": "Dispute retrieved",
   *   "data": {
   *     "id": 2867,
   *     "refund_amount": null,
   *     "currency": null,
   *     "status": "archived",
   *     "resolution": null,
   *     "domain": "test",
   *     "transaction": {
   *       "id": 5991760,
   *       "domain": "test",
   *       "status": "success",
   *       "reference": "asjck8gf76zd1dr",
   *       "amount": 39100,
   *       "message": null,
   *       "gateway_response": "Successful",
   *       "paid_at": "2017-11-09T00:01:56.000Z",
   *       "created_at": "2017-11-09T00:01:36.000Z",
   *       "channel": "card",
   *       "currency": "NGN",
   *       "ip_address": null,
   *       "metadata": "",
   *       "log": null,
   *       "fees": 587,
   *       "fees_split": null,
   *       "authorization": {},
   *       "customer": {
   *         "international_format_phone": null
   *       },
   *       "plan": {},
   *       "subaccount": {},
   *       "split": {},
   *       "order_id": null,
   *       "paidAt": "2017-11-09T00:01:56.000Z",
   *       "createdAt": "2017-11-09T00:01:36.000Z",
   *       "requested_amount": null
   *     },
   *     "transaction_reference": null,
   *     "category": null,
   *     "customer": {
   *       "id": 10207,
   *       "first_name": null,
   *       "last_name": null,
   *       "email": "shola@baddest.com",
   *       "customer_code": "CUS_unz4q52yjsd6064",
   *       "phone": null,
   *       "metadata": null,
   *       "risk_action": "default",
   *       "international_format_phone": null
   *     },
   *     "bin": null,
   *     "last4": null,
   *     "dueAt": null,
   *     "resolvedAt": null,
   *     "evidence": null,
   *     "attachments": "[]",
   *     "note": null,
   *     "history": [
   *       {
   *         "status": "pending",
   *         "by": "demo@test.co",
   *         "createdAt": "2017-11-16T16:12:24.000Z"
   *       }
   *     ],
   *     "messages": [
   *       {
   *         "sender": "demo@test.co",
   *         "body": "test this",
   *         "createdAt": "2017-11-16T16:12:24.000Z"
   *       }
   *     ],
   *     "createdAt": "2017-11-16T16:12:24.000Z",
   *     "updatedAt": "2019-08-16T08:05:25.000Z"
   *   }
   * }
   * ```
   * @returns {Promise<any>}
   */
  fetch = (disputeId: string | number) => {
    return this.apiRequest({ method: 'GET', url: `${disputeId.toString()}` });
  };

  /**
   * @description This endpoint retrieves disputes for a particular transaction
   * @param {string} transactionId - The ID of the transaction whose disputes you want to fetch
   * @example
   * Example usage of `listTransactionDisputes` method
   * ```js
   * dispute.listTransactionDisputes(1413)
   * .then(result => console.log(result))
   * .catch(error => console.log(error))
   * ```
   * ***
   * Sample default response:
   * ```json
   * {
   *   "status": true,
   *   "message": "Dispute retrieved successfully",
   *   "data": {
   *     "history": [
   *       {
   *         "id": 6094,
   *         "dispute": 2867,
   *         "status": "pending",
   *         "by": "demo@test.co",
   *         "createdAt": "2017-11-16T16:12:24.000Z",
   *         "updatedAt": "2017-11-16T16:12:24.000Z"
   *       }
   *     ],
   *     "messages": [
   *       {
   *         "sender": "demo@test.co",
   *         "body": "test this",
   *         "dispute": 2867,
   *         "id": 148,
   *         "is_deleted": 0,
   *         "createdAt": "2017-11-16T16:12:24.000Z",
   *         "updatedAt": "2017-11-16T16:12:24.000Z"
   *       }
   *     ],
   *     "currency": null,
   *     "last4": null,
   *     "bin": null,
   *     "transaction_reference": null,
   *     "merchant_transaction_reference": null,
   *     "refund_amount": null,
   *     "status": "archived",
   *     "domain": "test",
   *     "resolution": null,
   *     "category": null,
   *     "note": null,
   *     "attachments": "[]",
   *     "id": 2867,
   *     "integration": 100043,
   *     "transaction": {
   *       "id": 5991760,
   *       "domain": "test",
   *       "status": "success",
   *       "reference": "asjck8gf76zd1dr",
   *       "amount": 39100,
   *       "message": null,
   *       "gateway_response": "Successful",
   *       "paid_at": "2017-11-09T00:01:56.000Z",
   *       "created_at": "2017-11-09T00:01:36.000Z",
   *       "channel": "card",
   *       "currency": "NGN",
   *       "ip_address": null,
   *       "metadata": "",
   *       "log": null,
   *       "fees": 587,
   *       "fees_split": null,
   *       "authorization": {},
   *       "customer": {
   *         "international_format_phone": null
   *       },
   *       "plan": {},
   *       "subaccount": {},
   *       "split": {},
   *       "order_id": null,
   *       "paidAt": "2017-11-09T00:01:56.000Z",
   *       "createdAt": "2017-11-09T00:01:36.000Z",
   *       "requested_amount": null
   *     },
   *     "created_by": null,
   *     "evidence": null,
   *     "resolvedAt": null,
   *     "createdAt": "2017-11-16T16:12:24.000Z",
   *     "updatedAt": "2019-08-16T08:05:25.000Z",
   *     "dueAt": null
   *   }
   * }
   * ```
   * @returns {Promise<any>}
   */
  listTransactionDisputes = (transactionId: string | number) => {
    return this.apiRequest({ method: 'GET', url: `transaction/${transactionId.toString()}` });
  };

  /**
   * @description Update details of a dispute on your integration
   * @param {string} disputeId - The ID of the dispute you would like to update
   * @param {DisputeUpdateRequestData} data - The body of the API request
   * @example
   * Example usage of `update` method
   * ```js
   * dispute.update("624", {
   *   "refund_amount": 1002
   * })
   * .then(result => console.log(result))
   * .catch(error => console.log(error))
   * ```
   * ***
   * Sample default response:
   * ```json
   * {
   *   "status": true,
   *   "message": "Dispute updated successfully",
   *   "data": [
   *     {
   *       "currency": "NGN",
   *       "last4": null,
   *       "bin": null,
   *       "transaction_reference": null,
   *       "merchant_transaction_reference": null,
   *       "refund_amount": 1002,
   *       "status": "resolved",
   *       "domain": "test",
   *       "resolution": "merchant-accepted",
   *       "source": "bank",
   *       "category": "general",
   *       "note": null,
   *       "attachments": "attachement",
   *       "id": 624,
   *       "transaction": {
   *         "id": 5991760,
   *         "domain": "test",
   *         "status": "success",
   *         "reference": "asjck8gf76zd1dr",
   *         "amount": 39100,
   *         "message": null,
   *         "gateway_response": "Successful",
   *         "paid_at": "2017-11-09T00:01:56.000Z",
   *         "created_at": "2017-11-09T00:01:36.000Z",
   *         "channel": "card",
   *         "currency": "NGN",
   *         "ip_address": null,
   *         "metadata": "",
   *         "log": null,
   *         "fees": 587,
   *         "fees_split": null,
   *         "authorization": {},
   *         "customer": {
   *           "international_format_phone": null
   *         },
   *         "plan": {},
   *         "subaccount": {},
   *         "split": {},
   *         "order_id": null,
   *         "paidAt": "2017-11-09T00:01:56.000Z",
   *         "createdAt": "2017-11-09T00:01:36.000Z",
   *         "requested_amount": null
   *       },
   *       "customer": {
   *         "id": 10207,
   *         "first_name": null,
   *         "last_name": null,
   *         "email": "shola@baddest.com",
   *         "customer_code": "CUS_unz4q52yjsd6064",
   *         "phone": null,
   *         "metadata": null,
   *         "risk_action": "default",
   *         "international_format_phone": null
   *       },
   *       "organization": 1,
   *       "evidence": null,
   *       "resolvedAt": "2019-08-28T14:14:41.000Z",
   *       "createdAt": "2019-08-28T14:14:41.000Z",
   *       "updatedAt": "2019-08-28T14:29:07.000Z",
   *       "dueAt": null
   *     }
   *   ]
   * }
   * ```
   * @returns {Promise<any>}
   */
  update = (disputeId: string | number, data: DisputeUpdateRequestData) => {
    return this.apiRequest({ method: 'PUT', url: `${disputeId.toString()}`, data });
  };

  /**
   * @description Provide evidence for a dispute
   * @param {string} disputeId - The id of the dispute you would like to provide evidence for
   * @param {DisputeAddEvidenceRequestData} data - The body of the API request
   * @example
   * Example usage of `addEvidence` method
   * ```js
   * dispute.addEvidence( "624", {
   *   customer_email: "cus@gmail.com",
   *   customer_name: "Mensah King",
   *   customer_phone: "0802345167",
   *   service_details: "claim for buying product",
   *   delivery_address: "3a ladoke street ogbomoso"
   * })
   * .then(result => console.log(result))
   * .catch(error => console.log(error))
   * ```
   * ***
   * Sample default response:
   * ```json
   * {
   *   "status": true,
   *   "message": "Evidence created",
   *   "data": {
   *     "customer_email": "cus@gmail.com",
   *     "customer_name": "Mensah King",
   *     "customer_phone": "0802345167",
   *     "service_details": "claim for buying product",
   *     "delivery_address": "3a ladoke street ogbomoso",
   *     "dispute": 624,
   *     "id": 21,
   *     "createdAt": "2019-08-28T15:36:13.783Z",
   *     "updatedAt": "2019-08-28T15:39:39.153Z"
   *   }
   * }
   * ```
   * @returns {Promise<any>}
   */
  addEvidence = (disputeId: string | number, data: DisputeAddEvidenceRequestData) => {
    return this.apiRequest({ method: 'POST', url: `${disputeId}/evidence`, data });
  };

  /**
   * @description This endpoint generates a URL for an uploaded file
   * @param {string} disputeId - The id of the dispute you would like to upload a file for
   * @param {DisputeGetUploadURLRequestParams} params - The query parameters of the API request
   * @example
   * Example usage of `getUploadURL` method
   * ```js
   * dispute.getUploadURL("624", {
   *  upload_filename: "file.pdf"
   * })
   * .then(result => console.log(result))
   * .catch(error => console.log(error))
   * ```
   * ***
   * Sample default response:
   * ```json
   * {
   *   "status": true,
   *   "message": "Upload url generated",
   *   "data": {
   *     "signedUrl": "https://s3.eu-west-1.amazonaws.com/files.paystack.co/qesp8a4df1xejihd9x5q?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAI7CL5IZL2DJHOPPA%2F20191009%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Date=20191009T220931Z&X-Amz-Expires=1800&X-Amz-Signature=f5cc387949f3520982886e70ab2e08721a82a9fa9e26b696b91471f36453867a&X-Amz-SignedHeaders=host",
   *     "fileName": "qesp8a4df1xejihd9x5q"
   *   }
   * }
   * ```
   * @returns {Promise<any>}
   */
  getUploadURL = (disputeId: string, params: DisputeGetUploadURLRequestParams) => {
    return this.apiRequest({ method: 'GET', url: `${disputeId}/upload_url`, params });
  };

  /**
   * @description Resolve a dispute on your integration
   * @param {string} disputeId - The id of the dispute you would like to resolve
   * @param {DisputeResolveRequestData} data - The body of the API request
   * @example
   * Example usage of `resolve` method
   * ```js
   * dispute.resolve("624", {
   *   "resolution": "merchant-accepted",
   *   "message": "Merchant accepted",
   *   "uploaded_filename": "qesp8a4df1xejihd9x5q",
   *   "refund_amount": 1002
   * })
   * .then(result => console.log(result))
   * .catch(error => console.log(error))
   * ```
   * ***
   * Sample default response:
   * ```json
   * {
   *   "status": true,
   *   "message": "Dispute successfully resolved",
   *   "data": {
   *     "currency": "NGN",
   *     "last4": null,
   *     "bin": null,
   *     "transaction_reference": null,
   *     "merchant_transaction_reference": null,
   *     "refund_amount": 1002,
   *     "status": "resolved",
   *     "domain": "test",
   *     "resolution": "merchant-accepted",
   *     "category": "general",
   *     "note": null,
   *     "attachments": "attachment",
   *     "id": 624,
   *     "transaction": {
   *       "id": 5991760,
   *       "domain": "test",
   *       "status": "success",
   *       "reference": "asjck8gf76zd1dr",
   *       "amount": 39100,
   *       "message": null,
   *       "gateway_response": "Successful",
   *       "paid_at": "2017-11-09T00:01:56.000Z",
   *       "created_at": "2017-11-09T00:01:36.000Z",
   *       "channel": "card",
   *       "currency": "NGN",
   *       "ip_address": null,
   *       "metadata": "",
   *       "log": null,
   *       "fees": 587,
   *       "fees_split": null,
   *       "authorization": {},
   *       "customer": {
   *         "international_format_phone": null
   *       },
   *       "plan": {},
   *       "subaccount": {},
   *       "split": {},
   *       "order_id": null,
   *       "paidAt": "2017-11-09T00:01:56.000Z",
   *       "createdAt": "2017-11-09T00:01:36.000Z",
   *       "requested_amount": null
   *     },
   *     "created_by": 30,
   *     "evidence": null,
   *     "resolvedAt": "2019-08-28T15:23:31.000Z",
   *     "createdAt": "2019-08-28T14:14:41.000Z",
   *     "updatedAt": "2019-08-28T15:23:31.000Z",
   *     "dueAt": null,
   *     "message": {
   *       "dispute": 624,
   *       "sender": "demo@test.co",
   *       "body": "Merchant accepted",
   *       "id": 718,
   *       "createdAt": "2019-08-28T15:23:31.418Z",
   *       "updatedAt": "2019-08-28T15:23:31.418Z"
   *     }
   *   }
   * }
   * ```
   * @returns {Promise<any>}
   */
  resolve = (disputeId: string | number, data: DisputeResolveRequestData) => {
    return this.apiRequest({ method: 'PUT', url: `${disputeId}/resolve`, data });
  };

  /**
   * @description Export disputes available on your integration
   * @param {DisputeListRequestParams} params - The body of the API request
   * @example
   * Example usage of `export` method
   * ```js
   * dispute.export()
   * .then(result => console.log(result))
   * .catch(error => console.log(error))
   * ```
   * ***
   * Sample default response:
   * ```json
   * {
   *   "status": true,
   *   "message": "Export successful",
   *   "data": {
   *     "path": "https://s3.eu-west-1.amazonaws.com/files.paystack.co/exports/100043/disputes/161834548008.csv?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIFGL5IZL2DJHOPPA%2F20210419%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Date=20210419T115718Z&X-Amz-Expires=60&X-Amz-Signature=8fc02bdf7f12411a6505559b4c35b069a8a478295b98c0587907777ef5e31bda&X-Amz-SignedHeaders=host",
   *     "expiresAt": "2021-04-19 11:58:18"
   *   }
   * }
   * ```
   * @returns {Promise<any>}
   */
  export = (params?: DisputeListRequestParams) => {
    return this.apiRequest({ method: 'GET', url: `export`, params });
  };
}

export default Dispute;
