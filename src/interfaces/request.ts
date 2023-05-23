interface BaseRequestData {
  [key: string]: string | number | undefined | string[];
}

export interface RequestData extends BaseRequestData {
  email?: string;
  invoice_limit?: number;
  channels?: string[];
}
