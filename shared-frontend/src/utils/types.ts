/*
 *
 * MIT License.
 *
 */
export type AnyObject = Record<string, unknown>;

export type StringNumberBooleanType = string | number | boolean;

export interface NavState {
  error?: string;
}

type KeyType = string | symbol | number;

export type ObjMap<K extends KeyType, T> = {
  [key in K]: T;
} & object;

export interface PaginatedData<T> {
  total: number;
  limit: number;
  page: number;
  data: T[];
}

export enum GlobalNotificationType {
  // NOTE: the key does not match the value. Value is passed to the @carbon/react library.
  // The Key is a clearer description of what it is used for.
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info',
}

export interface GlobalNotification {
  id: string;
  autoClose: boolean;
  content: string;
  timeout: number;
  type: GlobalNotificationType;
}

export enum SortDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}
