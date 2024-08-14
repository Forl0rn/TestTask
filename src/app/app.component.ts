import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'element-manager';
  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('ru'); // язык по умолчанию
  }

  switchLanguage(language: string) {
    this.translate.use(language); // Переключение языка
  }
}

