export interface TerminalSendEventRequestData {
	/** The type of event to push. We currently support `invoice` and `transaction` */
	type: `invoice` | `transaction`;
	/** The action the Terminal needs to perform. For the `invoice` type, the action can either be `process` or `view`. For the `transaction` type, the action can either be `process` or `print`. */
	action: `process` | `view` | `print`;
	/** The parameters needed to perform the specified action. For the `invoice` type, you need to pass the invoice id and offline reference like so: `{id: invoice_id, reference: offline_reference}`. For the `transaction` type, you can pass the transaction id: `{id: transaction_id}` */
	data: {id: string; reference?: string};
}

export interface TerminalListRequestParams {
	/** Specify how many records you want to retrieve per page. If not specify we use a default value of 50. */
	perPage?: number;
	/** A cursor that indicates your place in the list. It can be used to fetch the next page of the list */
	next?: string;
	/** A cursor that indicates your place in the list. It should be used to fetch the previous page of the list after an initial next request */
	previous?: string;
}

export interface TerminalUpdateRequestData {
	/** Name of the terminal */
	name?: string;
	/** The address of the terminal */
	address?: string;
}