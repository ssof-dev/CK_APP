declare var Ext: any;
import { ExtAngularModernModule } from '@sencha/ext-angular-modern';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { LoginComponent } from './login.component';

const routes: Routes = [
    { path: '', component: LoginComponent },
];

@NgModule({
	declarations: [
		LoginComponent
	],
	imports: [
		CommonModule,
        FormsModule,
        TranslateModule,
		ExtAngularModernModule,
		RouterModule.forChild(routes),
		ReactiveFormsModule
	],
	exports: [RouterModule],
	providers: [
	]
})

export class LoginModule { }