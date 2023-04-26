/*
 *
 * MIT License.
 *
 */
import * as Env from '@src/config/Env';
import { ObjMap, StringNumberBooleanType } from 'pyoraily-shared-frontend/utils/types';
import axios from '@src/services/api/axios';
import { AxiosRequestConfig, AxiosResponse, Method } from 'axios';

const requestConfig = (
  uri: string,
  method: Method,
  body: any = {},
  params: ObjMap<string, StringNumberBooleanType> = {}
): AxiosRequestConfig => {
  const headers = {
    Accept: 'application/json',
    Pragma: 'no-cache',
    Expires: 'Sat, 01 Jan 2000 00:00:00 GMT',
    // 'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
  };
  return {
    headers,
    data: body,
    params,
    method,
    baseURL: Env.REACT_APP_ATHLETE_MANAGER_DOMAIN,
    url: uri,
    withCredentials: true,
  };
};

// eslint-disable-next-line consistent-return
export const handleRequest = async <T>(
  uri: string,
  method: Method,
  body: any = {},
  params: ObjMap<string, StringNumberBooleanType> = {}
): Promise<AxiosResponse<T>> => axios(requestConfig(uri, method, body, params)) as Promise<AxiosResponse<T>>;

export const httpGet = <T>(
  uri: string,
  params: ObjMap<string, StringNumberBooleanType> = {}
): Promise<AxiosResponse<T>> => handleRequest<T>(uri, 'GET', {}, params);

export const httpPost = <T>(
  uri: string,
  body: any,
  params: ObjMap<string, StringNumberBooleanType> = {}
): Promise<AxiosResponse<T>> => handleRequest<T>(uri, 'POST', body, params);

export const httpPut = <T>(
  uri: string,
  body: any,
  params: ObjMap<string, StringNumberBooleanType> = {}
): Promise<AxiosResponse<T>> => handleRequest<T>(uri, 'PUT', body, params);

export const httpDelete = <T>(
  uri: string,
  params: ObjMap<string, StringNumberBooleanType> = {}
): Promise<AxiosResponse<T>> => handleRequest<T>(uri, 'DELETE', null, params);

export const httpPatch = <T>(
  uri: string,
  body: any,
  params: ObjMap<string, StringNumberBooleanType> = {}
): Promise<AxiosResponse<T>> => handleRequest<T>(uri, 'PATCH', body, params);
