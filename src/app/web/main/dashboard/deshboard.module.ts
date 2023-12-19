declare var Ext: any;
import { ExtAngularModernModule } from '@sencha/ext-angular-modern';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AngularEditorModule } from '@kolkov/angular-editor';

//ag-grid
import { AgGridModule } from 'ag-grid-angular';

import { PipeModule } from '../../../pipe/pipe.module';

import { DashboardComponent } from './dashboard.component';

import { DialogModule } from '../../../dialog/dialog.module';
@NgModule({
	declarations: [
		DashboardComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		PipeModule,
		ExtAngularModernModule,
		TranslateModule,
		AngularEditorModule,
		AgGridModule.withComponents([]),
		DialogModule,
	],
	providers: [
		
	]
})

export class DeshboardModule { }