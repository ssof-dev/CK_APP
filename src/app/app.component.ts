import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EnvService } from './shared/env.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
    <!-- <ExtContainer
      [viewport]="true"
      layout="vbox"
      padding="0 0 0 0"
    >
        <ExtPanel  [flex]="1">
          <router-outlet></router-outlet>
        </ExtPanel>
    </ExtContainer> -->
  `,
  styles: []
})
export class AppComponent implements OnInit{

  constructor( private translate: TranslateService, private router: Router, public envService: EnvService) {
    //translate.addLangs(['ko', 'en', 'de', 'ur', 'hi']);
    //translate.setDefaultLang(localStorage.getItem('lang') || 'en');
    translate.addLangs(envService.langsArr); //사용언어 셋팅
    translate.setDefaultLang('ko');
    translate.use('ko');
  }

  ngOnInit() {}

}
