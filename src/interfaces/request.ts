interface BaseRequest {
  [key: string]: string | number | undefined | string[] | boolean;
}
export interface RequestData extends BaseRequest {
  email?: string;
  amount?: string;
  invoice_limit?: number;
  channels?: string[];
  authorization_code?: string;
  reference?: string;
  currency?: string;
  metadata?: string;
  subaccount?: string;
  transaction_charge?: number;
  bearer?: string;
  queue?: boolean;
  name?: string;
  type?: string;
  subaccounts?: string[];
  bearerType?: string;
  bearerSubaccount?: string;
}

export interface RequestParams extends BaseRequest {
  perPage?: number;
  page?: number;
  from?: string;
  to?: string;
  customer?: number;
  status?: string;
  currency?: string;
  amount?: number;
  settled?: boolean;
  settlement?: number;
  payment_page?: number;
  name?: string;
  active?: boolean;
  sortBy?: string;
}
