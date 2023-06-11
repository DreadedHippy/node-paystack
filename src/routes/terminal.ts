import { AxiosInstance, AxiosError, CreateAxiosDefaults } from 'axios';
import { baseURL } from '../static/variables';
import { RequestData } from '../interfaces/request';
import { AllResponse } from '../interfaces/response';
import { createAxiosInstance } from '../utils/utils';

class Terminal {
	paystackClient: AxiosInstance = createAxiosInstance(this.axiosConfig);
  constructor(private axiosConfig: CreateAxiosDefaults) {
    this.paystackClient.defaults.baseURL = baseURL + 'terminal';
  }

	sendEvent = async (terminalId: string, data: RequestData) => {
    try {
      const result = await this.paystackClient({ method: 'POST', data, url: `${terminalId}/event` });
      return result.data; // The data in the axios response
    } catch (error: any | AxiosError) {
      return error.response.data as AllResponse; // The data in the response of the axios error
    }

	}

	fetchEventStatus = async (terminalId: string, eventId: string) => {
    try {
      const result = await this.paystackClient({ method: 'GET', url: `${terminalId}/event/${eventId}` });
      return result.data; // The data in the axios response
    } catch (error: any | AxiosError) {
      return error.response.data as AllResponse; // The data in the response of the axios error
    }
	}

	fetchTerminalStatus = async (terminalId: string) => {
    try {
      const result = await this.paystackClient({ method: 'GET', url: `${terminalId}/presence` });
      return result.data; // The data in the axios response
    } catch (error: any | AxiosError) {
      return error.response.data as AllResponse; // The data in the response of the axios error
    }
	}

	list = async () => {
    try {
      const result = await this.paystackClient({ method: 'GET'});
      return result.data; // The data in the axios response
    } catch (error: any | AxiosError) {
      return error.response.data as AllResponse; // The data in the response of the axios error
    }
	}

	fetch = async (terminalId: string) => {
    try {
      const result = await this.paystackClient({ method: 'GET', url: `${terminalId}`});
      return result.data; // The data in the axios response
    } catch (error: any | AxiosError) {
      return error.response.data as AllResponse; // The data in the response of the axios error
    }
	}

	update = async (terminalId: string, data: RequestData) => {
    try {
      const result = await this.paystackClient({ method: 'PUT', url: `${terminalId}`});
      return result.data; // The data in the axios response
    } catch (error: any | AxiosError) {
      return error.response.data as AllResponse; // The data in the response of the axios error
    }
	}

	commission = async (data: RequestData) => {
    try {
      const result = await this.paystackClient({ method: 'POST', url: `commission_device`});
      return result.data; // The data in the axios response
    } catch (error: any | AxiosError) {
      return error.response.data as AllResponse; // The data in the response of the axios error
    }
	}

	decommission = async (data: RequestData) => {
    try {
      const result = await this.paystackClient({ method: 'POST', url: `decommission_device`});
      return result.data; // The data in the axios response
    } catch (error: any | AxiosError) {
      return error.response.data as AllResponse; // The data in the response of the axios error
    }
	}


}

export default Terminal;