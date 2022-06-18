import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AppStorage, Theme } from '@storage/storages';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  themes = {
    dark: Theme.DARK,
    light: Theme.LIGHT
  };

  get theme() {
    return this.appStorage.getTheme();
  }

  constructor(
    private appStorage: AppStorage
  ) { }

  ngOnInit(): void {
  }

  setTheme(theme: Theme) {
    this.appStorage.setTheme(theme);
  }
}
