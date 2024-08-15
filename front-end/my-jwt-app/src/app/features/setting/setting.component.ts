import { Component, inject, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { BaseComponent } from '../../bases/base-component.component';
import { SettingService } from '../../services/setting.service';

@Component({
  selector: '',
  template: ` <h1>Setting</h1> `,
  standalone: true,
})
export class SettingComponent extends BaseComponent implements OnInit {
  private readonly settingService = inject(SettingService);
  constructor() {
    super();
  }

  ngOnInit(): void {
    this.settingService
      .getSetting()
      .pipe(
        tap((res) => {
          console.log(res);
        })
      )
      .subscribe();
  }
}
