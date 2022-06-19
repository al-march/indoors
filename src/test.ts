// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'zone.js/testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek.js';
import weekday from 'dayjs/plugin/weekday.js';
import localizedFormat from 'dayjs/plugin/localizedFormat.js';
import isBetween from 'dayjs/plugin/isBetween';
import 'dayjs/locale/ru'

dayjs.extend(isoWeek);
dayjs.extend(weekday);
dayjs.extend(localizedFormat);
dayjs.extend(isBetween);
dayjs.locale('ru')

declare const require: {
  context(path: string, deep?: boolean, filter?: RegExp): {
    <T>(id: string): T;
    keys(): string[];
  };
};

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting(),
);

// Then we find all the tests.
const context = require.context('./', true, /\.spec\.ts$/);
// And load the modules.
context.keys().forEach(context);
