declare var Ext: any;
import { ExtAngularModernModule } from '@sencha/ext-angular-modern';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexRoutingModule } from './index-routing.module';
import { IndexComponent } from './index.component';
import { IndexTabzComponent } from './index-tabz.component';
import { IndexModalComponent } from './index-modal.component';
import { IndexDashboardComponent } from './index-dashboard.component';
import { TranslateModule } from '@ngx-translate/core';
import { DialogModule } from '../dialog/dialog.module';

@NgModule({
	declarations: [		
		IndexComponent,
		IndexTabzComponent,
		IndexModalComponent,
		IndexDashboardComponent,
	],
	imports: [
		CommonModule,
		IndexRoutingModule,
		ExtAngularModernModule,
		TranslateModule,
		DialogModule
	],
	providers: [
	]
})

export class IndexModule { }