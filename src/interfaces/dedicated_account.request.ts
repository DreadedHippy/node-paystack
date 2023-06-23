// interface BaseRequest {
//   [key: string]: string | number | undefined | string[] | boolean | object;
// }

export interface DedicatedAccountCreateRequestData {
  /** Customer ID or code */
  customer: string;
  /** Customer's first name */
  first_name?: string;
  /** Customer's last name */
  last_name?: string;
  /** The bank slug for preferred bank. To get a list of available banks, use the List Banks endpoint, passing pay_with_bank_transfer=true query parameter */
  preferred_bank?: string;
  /** Subaccount code of the account you want to split the transaction with */
  subaccount?: string;
  /** Split code consisting of the lists of accounts you want to split the transaction with */
  split_code?: string;
  /** Customer's phone number */
  phone?: string;
}

export interface DedicatedAccountAssignRequestData {
  /** Customer's email address */
  email: string;
  /** Customer's first name */
  first_name: string;
  /** Customer's last name */
  last_name: string;
  /** Customer's phone number */
  phone: string;
  /** The bank slug for preferred bank. To get a list of available banks, use the `List Banks` endpoint, passing `pay_with_bank_transfer=tru`e query parameter */
  preferred_bank: string;
  /** Customer's country: Currently accepts NG only */
  country: 'NG';
  /** Customer's account number */
  account_number?: string;
  /** Customer's Bank Verification Number */
  bvn?: string;
  /** Customer's bank code */
  bank_code?: string;
  /** Subaccount code of the account you want to split the transaction with */
  subaccount?: string;
  /** Split code consisting of the lists of accounts you want to split the transaction with */
  split_code?: string;
}

export interface DedicatedAccountListRequestParams {
  /** Status of the dedicated virtual account */
  active?: boolean;
  /** The currency of the dedicated virtual account. Only `NGN` is currently allowed */
  currency?: string;
  /** The bank's slug in lowercase, without spaces e.g. `wema-bank` */
  provider_slug?: string;
  /** The bank's ID e.g. 035 */
  bank_id?: string;
  /** The customer's ID */
  customer?: string;
}

export interface DedicatedAccountRequeryRequestParams {
  /** Virtual account number to requery */
  account_number: string;
  /** The bank's slug in lowercase, without spaces e.g. `wema-bank` */
  provider_slug: string;
  /** The day the transfer was made in YYYY-MM-DD format */
  date?: string;
}

export interface DedicatedAccountSplitAccountTransactionRequestData {
  /** Customer ID or Code */
  customer: string;
  /** Subaccount code of the account you want to split the transaction with */
  subaccount?: string;
  /** Split code consisting of the lists of accounts you want to split the transaction with */
  split_code?: string;
  /** The bank slug for preferred bank. To get a list of available banks, use the `List Providers` endpoint */
  preferred_bank?: string;
}

export interface DedicatedAccountRemoveSplitRequestData {
  /** Dedicated virtual account number */
  account_number: string;
}
