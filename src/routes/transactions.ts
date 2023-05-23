import { RequestData } from '../interfaces/request';
import { AxiosInstance } from './../../node_modules/axios/index.d';

class Transaction {
  constructor(private options: AxiosInstance) {
    this.options = options;
    this.options.defaults.baseURL = 'https://api.paystack.co/transaction';
  }

  initialize = async (data: RequestData): Promise<any> => {
    const result = await this.options({ method: 'POST', data, url: `initialize` });
    return result.data;
  };

  verify = async (reference: string): Promise<any> => {
    const result = await this.options({ method: 'GET', url: `verify/${reference}` });
    return result.data;
  };

  list = () => {
    return 'list';
  };

  get = () => {
    return 'get';
  };

  chargeAuthorization = () => {
    return 'charge_authorization';
  };

  timeline = () => {
    return 'timeline';
  };

  total = () => {
    return 'total';
  };

  export = () => {
    return 'export';
  };

  partialDebit = () => {
    return 'partial_debit';
  };
}

export default Transaction;
