import axios, {CreateAxiosDefaults, AxiosInstance} from 'axios';

export function createAxiosInstance(axiosInstance: CreateAxiosDefaults): AxiosInstance {
	return axios.create(axiosInstance)
}