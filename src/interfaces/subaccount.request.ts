export interface SubaccountCreateRequestData {
  /** Name of business for subaccount */
  business_name: string;
  /** Bank Code for the bank. You can get the list of Bank Codes by calling the [List Banks](https://paystack.com/docs/api/miscellaneous/#bank) endpoint. */
  settlement_bank: string;
  /** Bank Account Number */
  account_number: string;
  /** The default percentage charged when receiving on behalf of this subaccount */
  percentage_charge: number;
  /** A description for this subaccount */
  description?: string;
  /** A contact email for the subaccount */
  primary_contact_email?: string;
  /** A name for the contact person for this subaccount */
  primary_contact_name?: string;
  /** A phone number to call for this subaccount */
  primary_contact_phone?: string;
  /** Stringified JSON object. Add a custom_fields attribute which has an array of objects if you would like the fields to be added to your transaction when displayed on the dashboard. Sample: {"custom_fields":[{"display_name":"Cart ID","variable_name": "cart_id","value": "8393"}]}` */
  metadata?: any;
}

export interface SubaccountListRequestParams {
  /** Specify how many records you want to retrieve per page. If not specify we use a default value of 50. */
  perPage?: number;
  /** Specify exactly what page you want to retrieve. If not specify we use a default value of 1. */
  page?: number;
  /** A timestamp from which to start listing subaccounts e.g. `2016-09-24T00:00:05.000Z`, `2016-09-21` */
  from?: string;
  /** A timestamp at which to stop listing subaccounts e.g. `2016-09-24T00:00:05.000Z`, 2016-09-21` */
  to?: string;
}

export interface SubaccountUpdateRequestData extends Partial<SubaccountCreateRequestData> {
  /** Activate or deactivate a subaccount. Set value to `true` to activate subaccount or `false` to deactivate the subaccount. */
  active: boolean;
  /** Any of `auto`, `weekly`, `monthly`, `manual`. `auto` means payout is T+1 and `manual` means payout to the subaccount should only be made when requested. Defaults to `auto` */
  settlement_schedule?: `auto` | `weekly` | `monthly` | `manual`;
}
