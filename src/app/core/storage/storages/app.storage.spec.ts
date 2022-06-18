import { AppStorage, Theme } from './app.storage';

describe('AppStorage', () => {
  let storage: AppStorage;
  beforeEach(() => {
    localStorage.clear();
    storage = new AppStorage();
  })
  it('should create an instance', () => {
    expect(storage).toBeTruthy();
  });
  it('should set theme after init', () => {
    const html = document.documentElement;
    expect(html.dataset['theme']).toBeFalsy();
    localStorage.setItem('app', JSON.stringify({theme: Theme.DARK}));
    new AppStorage();
    expect(html.dataset['theme']).toEqual(Theme.DARK);
  });
  it('should set light theme', () => {
    storage.setTheme(Theme.LIGHT);
    const html = document.documentElement;
    expect(html.dataset['theme']).toEqual(Theme.LIGHT)
  });
  it('should set dark theme', () => {
    storage.setTheme(Theme.DARK);
    const html = document.documentElement;
    expect(html.dataset['theme']).toEqual(Theme.DARK)
  })
});
