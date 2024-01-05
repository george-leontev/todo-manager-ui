import axios from 'axios';
import { handleDates } from './helpers';

export const httpClient = axios.create();

httpClient.interceptors.response.use(originalResponse => {
    handleDates(originalResponse.data);

    return originalResponse;
});
