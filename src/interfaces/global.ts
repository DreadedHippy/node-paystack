export interface ClientConfig {
	/** Display the raw output from Axios. Useful for debugging. Defaults to `false` */
	showRaw?: boolean;
	/** Hides the HTTP status codes of received errors. Defaults to `false` */
	hideHttpErrorStatus?: boolean
}