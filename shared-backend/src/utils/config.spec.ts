import { ConfigError, getEnv, getEnvArray, getEnvBoolean } from './config';

describe('config', () => {
  const { env } = process;

  beforeEach(() => {
    process.env = {
      ...env,
      EXAMPLE_VARIABLE: 'example-value',
      BOOLEAN_VARIABLE_TRUE_1: 'true',
      BOOLEAN_VARIABLE_TRUE_2: 'TRUE',
      BOOLEAN_VARIABLE_TRUE_3: '1',
      BOOLEAN_VARIABLE_FALSE: 'false',
      ARRAY_VARIABLE: 'value1,value2',
    };
  });

  afterEach(() => {
    process.env = env;
  });

  it('getEnv should return value for defined environment variable', () => {
    expect(getEnv('EXAMPLE_VARIABLE')).toBe('example-value');
  });

  it('getEnv should return default value for undefined environment variable', () => {
    expect(getEnv('UNDEFINED_VARIABLE', 'default-value')).toBe('default-value');
  });

  it('getEnv should throw an error for undefined environment variable', () => {
    expect(() => getEnv('UNDEFINED_VARIABLE')).toThrow(ConfigError);
    expect(() => getEnv('UNDEFINED_VARIABLE')).toThrow('Environment variable "UNDEFINED_VARIABLE" is not defined');
  });

  it('getEnvBoolean should return boolean values', () => {
    expect(getEnvBoolean('BOOLEAN_VARIABLE_TRUE_1')).toBeTruthy();
    expect(getEnvBoolean('BOOLEAN_VARIABLE_TRUE_2')).toBeTruthy();
    expect(getEnvBoolean('BOOLEAN_VARIABLE_TRUE_3')).toBeTruthy();
    expect(getEnvBoolean('BOOLEAN_VARIABLE_FALSE')).toBeFalsy();
  });

  it('getEnvArray should return an array of string values', () => {
    expect(getEnvArray('ARRAY_VARIABLE')).toEqual(['value1', 'value2']);
  });
});
