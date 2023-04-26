/*
 *
 * MIT License.
 *
 */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-var */
/* eslint-disable vars-on-top */
/* eslint-disable import/no-extraneous-dependencies */
import 'webpack/module';

export {};

// Define missing types for globals here

declare global {
  interface Window {
    get: (s: string) => Promise<() => any>;
    init: (defaultScope: any) => any;
    [index: number | string]: Window;
  }
}
