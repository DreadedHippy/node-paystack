export interface TransferRecipientCreateRequestData {
	/** Recipient Type. It could be one of: `nuban`, `mobile_money` or `basa` */
	type: `nuban` | `mobile_money` | `basa`;
	/** A name for the recipient */
	name: string;
	/** Required if type is `nuban` or `basa` */
	account_number: string;
	/** Required if type is `nuban` or `basa`. You can get the list of Bank Codes by calling the [List Banks](https://paystack.com/docs/api/miscellaneous#bank) endpoint. */
	bank_code: string;
	/** A description for this recipient */
	description?: string;
	/** Currency for the account receiving the transfer */
	currency?: string;
	/** An authorization code from a previous transaction */
	authorization_code?: string;
	/** Store additional information about your recipient in a structured format, JSON */
	metadata?: string | object;
}

export interface TransferRecipientBulkCreateRequestData {
	batch: TransferRecipientCreateRequestData[] | {
		/** Recipient Type. It could be one of: `nuban`, `mobile_money` or `basa` */
		type: `nuban` | `mobile_money` | `basa`;
		/** A name for the recipient */
		name: string;
		/** Required if type is `nuban` or `basa`. You can get the list of Bank Codes by calling the [List Banks](https://paystack.com/docs/api/miscellaneous#bank) endpoint. */
		bank_code: string;
	};
	
}

export interface TransferRecipientListRequestParams {
	/** Specify how many records you want to retrieve per page. If not specify we use a default value of 50. */
	perPage?: number;
	/** Specify exactly what page you want to retrieve. If not specify we use a default value of 1. */
	page?: number;
	/** A timestamp from which to start listing transfer recipients e.g. `2016-09-24T00:00:05.000Z`, `2016-09-21` */
	from?: string;
	/** A timestamp at which to stop listing transfer recipients e.g. `2016-09-24T00:00:05.000Z`, `2016-09-21` */
	to?: string;
}

export interface TransferRecipientUpdateRequestData {
	/** A name for the recipient */
	name?: string;
	/** Email address of the recipient */
	email?: string;
}
	
