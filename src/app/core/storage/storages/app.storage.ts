import { AbstractStorage } from '@storage/abstract.storage';
import { Injectable } from '@angular/core';

export const enum Theme {
  LIGHT = 'winter',
  DARK = 'business'
}

interface AppState {
  theme: Theme;
}

@Injectable({
  providedIn: 'root'
})
export class AppStorage extends AbstractStorage<AppState> {
  constructor() {
    super('app');
    this.updateTheme();
  }

  setTheme(theme: Theme) {
    this.set('theme', theme);
    this.updateTheme();
  }

  getTheme() {
    return this.get('theme');
  }

  private updateTheme() {
    const theme = this.get('theme');
    if (theme) {
      document.documentElement.setAttribute('data-theme', theme);
    }
  }
}
