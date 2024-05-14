import { browser } from '@wdio/globals';

export const BrowserSingleton = {
    getBrowserInstance: () => browser
};