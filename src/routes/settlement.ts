import { AxiosInstance, AxiosError, CreateAxiosDefaults, AxiosRequestConfig } from 'axios';
import { baseURL } from '../static/variables';
import { createAxiosInstance } from '../utils/utils';
import { ClientConfig } from '../interfaces/global';
import { SettlementListRequestParams, SettlementListTransactionsRequestParams } from '../interfaces/settlement.request';

class Settlement {
  private paystackClient: AxiosInstance = createAxiosInstance(this.axiosConfig);
  constructor(private axiosConfig: CreateAxiosDefaults, private clientConfig: ClientConfig) {
    this.paystackClient.defaults.baseURL = baseURL + 'settlement';
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
   * @description List settlements made to your settlement accounts
   * @param {SettlementListRequestParams} params - The query parameters of the API request
   * @example
   * Example usage of `list` method
   * ```js
   * settlement.list()
   * .then(result => console.log(result))
   * .catch(error => console.log(error))
   * ```
   * ***
   * Sample default response:
   * ```json
   * {
   *   "status": true,
   *   "message": "Settlements retrieved",
   *   "data": [
   *     {
   *       "id": 1319048,
   *       "domain": "live",
   *       "status": "success",
   *       "currency": "NGN",
   *       "integration": 463433,
   *       "total_amount": 4925,
   *       "effective_amount": 4925,
   *       "total_fees": 75,
   *       "total_processed": 5000,
   *       "deductions": null,
   *       "settlement_date": "2021-02-10T00:00:00.000Z",
   *       "settled_by": null,
   *       "createdAt": "2021-02-10T01:03:25.000Z",
   *       "updatedAt": "2021-06-22T17:00:36.000Z"
   *     },
   *     {
   *       "id": 1060807,
   *       "domain": "live",
   *       "status": "success",
   *       "currency": "NGN",
   *       "integration": 463433,
   *       "total_amount": 19700,
   *       "effective_amount": 19700,
   *       "total_fees": 300,
   *       "total_processed": 20000,
   *       "deductions": null,
   *       "settlement_date": "2020-09-30T00:00:00.000Z",
   *       "settled_by": null,
   *       "createdAt": "2020-09-30T01:12:49.000Z",
   *       "updatedAt": "2020-09-30T09:23:02.000Z"
   *     }
   *   ],
   *   "meta": {
   *     "total": 2,
   *     "skipped": 0,
   *     "perPage": 50,
   *     "page": 1,
   *     "pageCount": 1
   *   }
   * }
   * ```
   * @returns {Promise<any>}
   */
  list = (params?: SettlementListRequestParams) => {
    return this.apiRequest({ method: 'GET', params });
  };

  /**
   * @description Get the transactions that make up a particular settlement
   * @param {string | number} settlementId - The ID of the settlement whose transactions you want to fetch
   * @param {SettlementListTransactionsRequestParams} params - The query parameters of the API request
   * @example
   * Example usage of `listTransactions` method
   * ```js
   * settlement.listTransactions(2067030515)
   * .then(result => console.log(result))
   * .catch(error => console.log(error))
   * ```
   * ***
   * Sample default response:
   * ```json
   * {
   *   "status": true,
   *   "message": "Transactions retrieved",
   *   "data": [
   *     {
   *       "id": 2067030515,
   *       "domain": "live",
   *       "status": "success",
   *       "reference": "da8ed5u8sz6yn95",
   *       "amount": 10000,
   *       "message": "",
   *       "gateway_response": "Approved",
   *       "paid_at": "2022-09-01T10:36:37.000Z",
   *       "created_at": "2022-09-01T10:26:02.000Z",
   *       "channel": "card",
   *       "currency": "NGN",
   *       "ip_address": "172.31.63.124",
   *       "metadata": {
   *         "custom_fields": [
   *           {
   *             "value": "makurdi",
   *             "display_name": "Donation for",
   *             "variable_name": "donation_for"
   *           }
   *         ]
   *       },
   *       "log": null,
   *       "fees": 390,
   *       "fees_split": null,
   *       "customer": {
   *         "id": 44100000,
   *         "first_name": null,
   *         "last_name": null,
   *         "email": "some@body.com",
   *         "phone": null,
   *         "metadata": null,
   *         "customer_code": "CUS_38uvy1ksasyupp",
   *         "risk_action": "default"
   *       },
   *       "authorization": {
   *         "authorization_code": "AUTH_whyjj12345",
   *         "bin": "460000",
   *         "last4": "1234",
   *         "exp_month": "11",
   *         "exp_year": "2022",
   *         "channel": "card",
   *         "card_type": "visa debit",
   *         "bank": "",
   *         "country_code": "KE",
   *         "brand": "visa",
   *         "reusable": true,
   *         "signature": "SIG_0Rof76ERZlJMnXm9090",
   *         "account_name": null
   *       },
   *       "plan": {},
   *       "split": {},
   *       "subaccount": {},
   *       "order_id": null,
   *       "paidAt": "2022-09-01T10:36:37.000Z",
   *       "createdAt": "2022-09-01T10:26:02.000Z",
   *       "requested_amount": 10000,
   *       "source": {
   *         "source": "merchant_api",
   *         "type": "api",
   *         "identifier": null,
   *         "entry_point": "transaction_initialize"
   *       },
   *       "pos_transaction_data": null
   *     }
   *   ],
   *   "meta": {
   *     "total": 1,
   *     "total_volume": 100,
   *     "skipped": 0,
   *     "perPage": 50,
   *     "page": 1,
   *     "pageCount": 1
   *   }
   * }
   * ```
   * @returns {Promise<any>}
   */
  listTransactions = (settlementId: string | number, params?: SettlementListTransactionsRequestParams) => {
    return this.apiRequest({ method: 'GET', url: `${settlementId}/transactions`, params });
  };
}

export default Settlement;
