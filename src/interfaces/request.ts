interface BaseRequest {
  [key: string]: string | number | undefined | string[] | boolean | object;
}


//For "POST", "PUSH" and other non-GET requests
export interface RequestData extends BaseRequest {
  email?: string;
  amount?: string;
  invoice_limit?: number;
  channels?: string[];
  authorization_code?: string;
  reference?: string;
  currency?: string;
  metadata?: string | object;
  subaccount?: string;
  transaction_charge?: number;
  bearer?: string;
  queue?: boolean;
  name?: string;
  type?: string;
  subaccounts?: string[];
  bearer_type?: 'subaccount' | 'account' | 'all-proportional' | 'all';
  bearer_subaccount?: string;
  active?: boolean;
  share?: number;
  action?: 'process' | 'view' | 'print'
  data?: {
    id?: string;
    reference?: string
  }
  address?: string;
  serial_number?: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  value?: string;
  country?: string;
  bvn?: string;
  bank_code?: string;
  account_number?: string;
  middle_name?: string
  customer?: string;
  risk_action?: 'default' | 'allow' | 'deny';
  business_name?: string;
  settlement_bank?: string;
  percentage_charge?: number;
  description?: string;
  primary_contact_email?: string;
  primary_contact_name?: string;
  primary_contact_phone?: string;
}

//For GET requests
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
