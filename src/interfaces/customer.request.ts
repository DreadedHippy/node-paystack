interface BaseRequest {
  [key: string]: string | number | undefined | string[] | boolean | object;
}
export interface CustomerCreateRequestData {
  /** Customer's email address */
  email: string;
  /** Customer's first name */
  first_name: string;
  /** Customer's last name */
  last_name: string;
  /** Customer's phone number */
  phone?: string;
  /** A set of key/value pairs that you can attach to the customer. It can be used to store additional information in a structured format. */
  metadata?: object;
}

export interface CustomerListRequestParams {
  /** Specify how many records you want to retrieve per page. If not specify we use a default value of 50. */
  perPage?: number;
  /** Specify exactly what page you want to retrieve. If not specify we use a default value of 1. */
  page?: number;
  /** A timestamp from which to start listing customers e.g. 2016-09-24T00:00:05.000Z */
  from?: string;
  /** A timestamp at which to stop listing customers e.g. 2016-09-24T00:00:05.000Z */
  to?: string;
}

export type CustomerUpdateRequestData = Partial<Omit<CustomerCreateRequestData, "email">>;

export interface CustomerValidateRequestData {
  /** Customer's first name */
  first_name: string;
  /** Customer's last name */
  last_name: string;
  /** Predefined types of identification. Only bank_account is supported at the moment */
  type: "bank_account" | string;
  /** Customer's identification number */
  value: string;
  /** 2 letter country code of identification issuer */
  country: string;
  /** Customer's Bank Verification Number */
  bvn: string;
  /** You can get the list of Bank Codes by calling the List Banks endpoint. (required if type is bank_account) */
  bank_code: string;
  /** Customer's bank account number (required if type is bank_account) */
  account_number: string;
  /** Customer's middle name */
  middle_name?: string;
}

export interface CustomerSetRiskActionRequestData {
  /** Customer's code, or email address */
  customer: string;
  /** One of the possible risk actions [ default, allow, deny ]. allow to whitelist. deny to blacklist. Customers start with a default risk action. */
  risk_action?: "default" | "allow" | "deny";
}

export interface CustomerDeactivateAuthorizationRequestData {
  /** Authorization code to be deactivated */
  authorization_code: string;
}
