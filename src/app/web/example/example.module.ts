import { ExtAngularModernModule } from '@sencha/ext-angular-modern';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PipeModule } from '../../pipe/pipe.module';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { HttpClientModule } from '@angular/common/http';
import { DialogModule } from '../../dialog/dialog.module';
import { TranslateModule } from '@ngx-translate/core';

//ag-grid
import { AgGridModule } from 'ag-grid-angular';

import { CenterFormComponent } from './centerForm/centerForm.component';
import { CenterGridComponent } from './centerGrid/centerGrid.component';
import { CenterTreeComponent } from './centerTree/centerTree.component';

import { LeftGridCenterFormComponent } from './leftGridCenterForm/leftGridCenterForm.component';
import { LeftGridCenterGridComponent } from './leftGridCenterGrid/leftGridCenterGrid.component';
import { LeftGridTopFormBottomGridComponent } from './leftGridTopFormBottomGrid/leftGridTopFormBottomGrid.component';
import { LeftGridTopGridBottomFormComponent } from './leftGridTopGridBottomForm/leftGridTopGridBottomForm.component';

import { LeftTreeCenterFormComponent } from './leftTreeCenterForm/leftTreeCenterForm.component';
import { LeftTreeCenterGridComponent } from './LeftTreeCenterGrid/leftTreeCenterGrid.component';

import { TopFormBottomGridComponent } from './topFormBottomGrid/topFormBottomGrid.component';
import { TopGridBottomFormComponent } from './topGridBottomForm/topGridBottomForm.component';
import { GPassUserMgtComponent } from './GPassUserMgt/GPassUserMgt.component';
import { GPassNoticeMgtcomponent } from './GPassNoticeMgt/GPassNoticeMgt.component';

@NgModule({
	declarations: [
		CenterFormComponent,
        CenterGridComponent,
		CenterTreeComponent,
		LeftGridCenterFormComponent,
		LeftGridCenterGridComponent,
		LeftGridTopFormBottomGridComponent,
		LeftGridTopGridBottomFormComponent,
		LeftTreeCenterFormComponent,
		LeftTreeCenterGridComponent,
		TopFormBottomGridComponent,
		TopGridBottomFormComponent,
		GPassUserMgtComponent,
		GPassNoticeMgtcomponent
	],
	imports: [
		CommonModule,
		FormsModule,
		PipeModule,
		ExtAngularModernModule,
		TranslateModule,
		AngularEditorModule,
		HttpClientModule,
		DialogModule,
		AgGridModule.withComponents([]),
	],
	providers: [
	]
})
export class ExampleModule {}