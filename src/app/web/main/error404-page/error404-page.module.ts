declare var Ext: any;
import { ExtAngularModernModule } from '@sencha/ext-angular-modern';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { Error404PageComponent } from './error404-page.component';

@NgModule({
	declarations: [
		Error404PageComponent
	],
	imports: [
		CommonModule,
        FormsModule,
        TranslateModule,
		ExtAngularModernModule,
	],
	exports: [],
	providers: [
	]
})

export class Error404PageModule { }