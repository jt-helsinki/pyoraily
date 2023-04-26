/*
 *
 * MIT License.
 *
 */
import * as dotenv from 'dotenv';

export class ConfigError extends Error {}

dotenv.config();

function getEnvValue<T>(variable: string, defaultValue?: T): string | T {
  const value = process.env[variable] || defaultValue;
  if (value === undefined) {
    throw new ConfigError(`Environment variable "${variable}" is not defined`);
  }
  return value;
}

export function getEnv(variable: string, defaultValue?: string): string {
  return getEnvValue(variable, defaultValue);
}

export function getEnvBoolean(variable: string, defaultValue?: boolean): boolean {
  const value = getEnvValue(variable, defaultValue);
  const trueValues = ['true', '1'];
  return typeof value === 'string' ? trueValues.includes(value.toLowerCase()) : value;
}

export function getEnvArray(variable: string, defaultValue?: string[]): string[] {
  const value = getEnvValue(variable, defaultValue);
  return typeof value === 'string' ? value.split(',') : value;
}
