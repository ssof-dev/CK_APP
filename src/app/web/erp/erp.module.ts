import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { AngularEditorModule } from "@kolkov/angular-editor";
import { TranslateModule } from "@ngx-translate/core";
import { ExtAngularModernModule } from "@sencha/ext-angular-modern";
import { DialogModule } from "src/app/dialog/dialog.module";
import { PipeModule } from "src/app/pipe/pipe.module";
import { NgModule } from "@angular/core";
import { AgGridModule } from "ag-grid-angular";
import { HttpClientModule } from "@angular/common/http";
import { CodeMngtComponent } from "./system/codeMngt/codeMngt.component";
import { UserMngtComponent } from "./system/userMngt/userMngt.component";
import { CompRegistComponent } from "./accounting/registration/compRegist/compRegist.component";
import { MyPageComponent } from "./system/myPage/myPage.component";
import { AuthButton } from "src/app/shared/AuthButton";

@NgModule({
	declarations: [
		CodeMngtComponent,
		UserMngtComponent,
		CompRegistComponent,
		MyPageComponent,
		AuthButton
	],
	imports: [
		CommonModule,
		FormsModule,
		PipeModule,
		ExtAngularModernModule,
		AngularEditorModule,
		TranslateModule,
        HttpClientModule,
		DialogModule,
		AgGridModule.withComponents([]),
	],
    exports: [
		AuthButton,
    ],
	providers: [
		
	]
})

export class ErpModule{}