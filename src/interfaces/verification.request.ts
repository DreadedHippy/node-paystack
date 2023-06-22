export interface VerificationResolveAccountRequestParams {
  /** Account Number */
  account_number: string;
  /** You can get the list of bank codes by calling the [List Banks](https://paystack.com/docs/api/miscellaneous#bank) endpoint */
  bank_code: string;
}
export interface VerificationValidateAccountRequestData {
  /** Customer's first and last name registered with their bank */
  account_name: string;
  /** Customer’s account number */
  account_number: string;
  /** This can take either `personal`  or `business` */
  account_type: string;
  /** The bank code of the customer’s bank. You can fetch the bank codes by using our [List Banks](https://paystack.com/docs/api/miscellaneous#bank) endpoint */
  bank_code: string;
  /** The two digit ISO code of the customer’s bank */
  country_code: string;
  /** Customer’s mode of identity. This could be one of: [ `identityNumber`, `passportNumber`, `businessRegistrationNumber` ] */
  document_type: string;
  /** Customer’s mode of identity number */
  document_number?: string;
}