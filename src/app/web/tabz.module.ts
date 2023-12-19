import { NgModule } from '@angular/core';
import { ExampleModule } from './example/example.module';
import { ErpModule } from './erp/erp.module';
import { DashboardComponent } from './main/dashboard/dashboard.component';

@NgModule({
	declarations: [
	],
	imports: [
		ErpModule
	],
	providers: [
	]
})
export class TabzModule {}