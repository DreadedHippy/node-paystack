interface BaseRequest {
  [key: string]: string | number | undefined | boolean | object;
}

// For "POST", "PUSH" and other non-GET requests
export interface RequestData extends BaseRequest {
  email?: string;
  amount?: number;
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
  action?: 'process' | 'view' | 'print';
  data?: {
    id?: string;
    reference?: string;
  };
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
  middle_name?: string;
  customer?: string;
  risk_action?: 'default' | 'allow' | 'deny';
  business_name?: string;
  settlement_bank?: string;
  percentage_charge?: number;
  description?: string;
  primary_contact_email?: string;
  primary_contact_name?: string;
  primary_contact_phone?: string;
  preferred_bank?: string;
  split_code?: string;
  provider_slug?: string;
  bank_id?: string;
  plan?: string;
  authorization?: string;
  start_date?: string;
  code?: string;
  token?: string;
  price?: number;
  unlimited?: boolean;
  quantity?: number;
  redirect_url?: string;
  custom_fields?: string;
  due_date?: string;
  line_items?: object[];
  send_notification?: boolean;
  draft?: boolean;
  has_invoice?: boolean;
  invoice_number?: string;
  batch?: object[];
  source?: 'balance';
  recipient?: string;
  reason?: string;
  transfer_code?: string;
  otp?: string;
  transfers?: object[];
  customer_email?: string;
  customer_name?: string;
  customer_phone?: string;
  service_details?: string;
  delivery_address?: string;
  delivery_date?: Date;
  resolution?: string;
  message?: string;
  refund_amount?: string;
  uploaded_filename?: string;
  evidence?: string;
  transaction?: string;
  customer_note?: string;
  merchant_note?: string;
}

// For GET requests
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
  provider_slug?: string;
  bank_id?: string;
  include_archive?: boolean;
  upload_filename?: string;
  reference?: string;
}
