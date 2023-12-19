import { ExtAngularModernModule } from '@sencha/ext-angular-modern';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FullCalendarComponent } from './calendar/full.calendar.component';

import { PipeModule } from '../pipe/pipe.module';

@NgModule({
	declarations: [
		FullCalendarComponent,
		// PaginationComponent
	],
	imports: [
		CommonModule,
		ExtAngularModernModule,
		PipeModule
	],
	exports: [
		FullCalendarComponent
		// PaginationComponent
	],
	providers: [
	],
})

export class WidgetModule { }