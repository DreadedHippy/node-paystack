export interface SubscriptionCreateRequestData {
	/** Customer's email address or customer code */
	customer: string;
	/** Plan code */
	plan: string;
	/** If customer has multiple authorizations, you can set the desired authorization you wish to use for this subscription here. If this is not supplied, the customer's most recent authorization would be used */
	authorization: string;
	/** Set the date for the first debit. (ISO 8601 format) e.g. `2017-05-16T00:30:13+01:00` */
	start_date?: string;
}

export interface SubscriptionListRequestParams {
	/** Specify how many records you want to retrieve per page. If not specify we use a default value of 50. */
	perPage?: number;
	/** Specify exactly what page you want to retrieve. If not specify we use a default value of 1. */
	page?: number;
	/** Filter by Customer ID */
	customer?: number;
	/** Filter by plan ID */
	plan?: string;
	from?: string;
	to?: string;
}

export interface SubscriptionEnableRequestData {
	/** Subscription code */
	code: string;
	/** Email token */
	token: string;
}

export interface SubscriptionDisableRequestData {
	/** Subscription code */
	code: string;
	/** Email token */
	token: string;
}