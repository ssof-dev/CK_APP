import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ExtAngularModernModule } from '@sencha/ext-angular-modern';

import { AgGridModule } from 'ag-grid-angular';
import { AngularEditorModule } from '@kolkov/angular-editor';


import { PipeModule } from '../pipe/pipe.module';

import { DSearchAddrComponent } from './DSearchAddr/DSearchAddr.component';
import { DialogMenualComponent } from './menual/menual.component';

@NgModule({
	declarations: [
		DialogMenualComponent,
		DSearchAddrComponent,
	],
    imports: [
		CommonModule,
		FormsModule,
		TranslateModule,
		ExtAngularModernModule,
		AgGridModule.withComponents([]),
		AngularEditorModule,
		PipeModule
	],
	exports: [
		DialogMenualComponent,
		DSearchAddrComponent,
	],
	providers: [
	]
})

export class DialogModule { }