import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek.js';
import weekday from 'dayjs/plugin/weekday.js';
import localizedFormat from 'dayjs/plugin/localizedFormat.js';
import customParseFormat from 'dayjs/plugin/customParseFormat.js';
import 'dayjs/locale/ru';

dayjs.extend(isoWeek);
dayjs.extend(weekday);
dayjs.extend(localizedFormat);
dayjs.extend(customParseFormat);
dayjs.locale('ru');

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
