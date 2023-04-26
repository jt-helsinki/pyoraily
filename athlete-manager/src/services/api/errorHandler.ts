/*
 *
 * MIT License.
 *
 */
import { ErrorResponseData } from '@src/services/api/ErrorResponseData';
import { AxiosError } from 'axios';

export const handleError = (error: AxiosError<ErrorResponseData>): Promise<never> => {
  let errorMessage = '';
  if (error.response) {
    // Recieved a response with a status code other than 2xx
    errorMessage = error.response.data?.message || error.message;
  } else if (error.request) {
    // The request was made but no response was recieved
    errorMessage = 'Error: no response received';
  } else {
    // Error occurred before sending the request
    errorMessage = error.message;
  }
  return Promise.reject(errorMessage);
};
