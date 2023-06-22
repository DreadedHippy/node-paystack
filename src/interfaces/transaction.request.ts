export interface TransactionInitializeRequestData {
	/** Amount should be in **kobo** if currency is `NGN`, **pesewas**, if currency is `GHS`, and **cents**, if currency is `ZAR` */
	amount: number;
	/** Customer's email address */
	email: string;
	/** The transaction currency (`NGN`, `GHS`, `ZAR` or `USD`). Defaults to your integration currency. */
	currency?: `NGN` | `GHS` | `ZAR` | `USD`;
	/** Unique transaction reference. Only `-`, `.`, `=` and alphanumeric characters allowed. */
	reference?: string;
	/** Fully qualified url, e.g. https://example.com/ . Use this to override the callback url provided on the dashboard for this transaction */
	callback_url?: string;
	/** If transaction is to create a subscription to a predefined plan, provide plan code here. This would invalidate the value provided in `amount` */
	plan?: string;
	/** Number of times to charge customer during subscription to plan */
	invoice_limit?: number;
	/** Stringified JSON object of custom data. Kindly check the [Metadata](https://paystack.com/docs/payments/metadata) page for more information. */
	metadata?: string | object;
	/** An array of payment channels to control what channels you want to make available to the user to make a payment with. Available channels include: `["card", "bank", "ussd", "qr", "mobile_money", "bank_transfer", "eft"] */
	channels?: Array<"card" | "bank" | "ussd" | "qr" | "mobile_money" | "bank_transfer" | "eft">;
	/** The split code of the transaction split. e.g. `SPL_98WF13Eb3w` */
	split_code?: string;
	/** The code for the subaccount that owns the payment. e.g. `ACCT_8f4s1eq7ml6rlzj` */
	subaccount?: string;
	/** An amount used to override the split configuration for a single split payment. If set, the amount specified goes to the main account regardless of the split configuration. */
	transaction_charge?: number;
	/** Who bears Paystack charges? account or subaccount (defaults to account). */
	bearer?: `account` | `subaccount`;
}

export interface TransactionListRequestParams {
	/** Specify how many records you want to retrieve per page. If not specify we use a default value of 50. */
	perPage?: number;
	/** Specify exactly what page you want to retrieve. If not specify we use a default value of 1. */
	page?: number;
	/** Specify an ID for the customer whose transactions you want to retrieve */
	customer?: number;
	/** The Terminal ID for the transactions you want to retrieve */
	terminalid?: string;
	/** Filter transactions by status ('failed', 'success', 'abandoned') */
	status?: `failed` | `success` | `abandoned`;
	/** A timestamp from which to start listing transaction e.g. `2016-09-24T00:00:05.000Z`, `2016-09-21` */
	from?: string;
	/** A timestamp at which to stop listing transaction e.g. `2016-09-24T00:00:05.000Z`, `2016-09-21` */
	to?: string;
	/** Filter transactions by amount. Specify the amount (in **kobo** if currency is `NGN`, **pesewas**, if currency is `GHS`, and **cents**, if currency is `ZAR`) */
	amount?: string;
}

export interface TransactionChargeAuthorizationRequestData {
	/** Amount should be in **kobo** if currency is `NGN`, **pesewas**, if currency is `GHS`, and **cents**, if currency is `ZAR` */
	amount: number;
	/** Customer's email address */
	email: string;
	/** Valid authorization code to charge */
	authorization_code: string;
	/** Currency in which amount should be charged. Allowed values are: `NGN`, `GHS`, `ZAR` or `USD` */
	currency?: `NGN` | `GHS` | `ZAR` | `USD`;
	/** Unique transaction reference. Only `-`, `.`, `=` and alphanumeric characters allowed. */
	reference?: string;
	/** Stringified JSON object. Add a `custom_fields` attribute which has an array of objects if you would like the fields to be added to your transaction when displayed on the dashboard. Sample: `{"custom_fields":[{"display_name":"Cart ID","variable_name": "cart_id","value": "8393"}]}` */
	metadata?: string | object;
	/** Send us ``card`` or ``bank`` or `'card','bank'` as an array to specify what options to show the user paying */
	channels?: Array<string>;
	/** The code for the subaccount that owns the payment. e.g. `ACCT_8f4s1eq7ml6rlzj` */
	subaccount?: string;
	/** A flat fee to charge the subaccount for this transaction (in **kobo** if currency is `NGN`, **pesewas**, if currency is `GHS`, and **cents**, if currency is `ZAR`). This overrides the split percentage set when the subaccount was created. Ideally, you will need to use this if you are splitting in flat rates (since subaccount creation only allows for percentage split). e.g. 7000 for a 70 naira flat fee. */
	transaction_charge?: number;
	/** Who bears Paystack charges? account or subaccount (defaults to account). */
	bearer?: `account` | `subaccount`;
	/** If you are making a scheduled charge call, it is a good idea to queue them so the processing system does not get overloaded causing transaction processing errors. Send `queue:true` to take advantage of our queued charging. */
	queue?: boolean;
}

export interface TransactionTotalsRequestParams {
	/** Specify how many records you want to retrieve per page. If not specify we use a default value of 50. */
	perPage?: number;
	/** Specify exactly what page you want to retrieve. If not specify we use a default value of 1. */
	page?: number;
	/** A timestamp from which to start listing transaction e.g. `2016-09-24T00:00:05.000Z`, `2016-09-21` */
	from?: string;
	/** A timestamp at which to stop listing transaction e.g. `2016-09-24T00:00:05.000Z`, `2016-09-21` */
	to?: string;
}

export interface TransactionExportRequestParams {
	/** Specify how many records you want to retrieve per page. If not specify we use a default value of 50. */
	perPage?: number;
	/** Specify exactly what page you want to retrieve. If not specify we use a default value of 1. */
	page?: number;
	/** A timestamp from which to start listing transaction e.g. `2016-09-24T00:00:05.000Z`, `2016-09-21` */
	from?: string;
	/** A timestamp at which to stop listing transaction e.g. `2016-09-24T00:00:05.000Z`, `2016-09-21` */
	to?: string;
	/** Specify an ID for the customer whose transactions you want to retrieve */
	customer?: number;
	/** Filter transactions by status ('failed', 'success', 'abandoned') */
	status?: `failed` | `success` | `abandoned`;
	/** Specify the transaction currency to export. Allowed values are `NGN`, `GHS`, `ZAR` */
	currency?: `NGN` | `GHS` | `ZAR`;
	/** Filter transactions by amount. Specify the amount, in **kobo** if currency is `NGN`, **pesewas**, if currency is `GHS`, and **cents**, if currency is `ZAR` */
	amount?: number;
	/** Set to `true` to export only settled transactions. `false` for only pending transactions. Leave undefined to export all transactions */
	settled?: boolean;
	/** An ID for the settlement whose transactions we should export */
	settlement?: number;
	/** Specify a payment page's id to export only transactions conducted on said page */
	payment_page?: number;
}

export interface TransactionPartialDebitRequestData {
	/** Authorization Code */
	authorization_code: string;
	/** Specify the currency you want to debit. Allowed values are `NGN`, `GHS`, `ZAR` or `USD`. */
	currency: `NGN` | `GHS` | `ZAR` | `USD`;
	/** Amount should be in **kobo** if currency is `NGN`, **pesewas**, if currency is `GHS`, and **cents**, if currency is `ZAR` */
	amount: string;
	/** Customer's email address (attached to the authorization code) */
	email: string;
	/** Unique transaction reference. Only `-`, `.`, `=` and alphanumeric characters allowed. */
	reference?: string;
	/** Minimum amount to charge */
	at_least?: string;
}
