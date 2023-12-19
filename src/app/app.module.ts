import { NgModule } from '@angular/core';
import { BrowserModule, } from '@angular/platform-browser';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS  } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { ExtAngularModernModule } from '@sencha/ext-angular-modern';

import { ToastrModule } from 'ngx-toastr';
import { CookieModule } from 'ngx-cookie';

// ag-grid
import { AgGridModule } from 'ag-grid-angular';
import { CustomHeaderGroup } from './web/CustomHeaderGroup';
import { CustomRowStatRender } from './web/CustomRowStatRender';

import { AppRoutingModule } from './app-routing.module';
import { EnvService } from './shared/env.service';
import { ComFunction } from './shared/com.function';
import { HttpInterceptorService } from './shared/HttpInterceptorService';
import { ComValidation } from './shared/com.validation';
import { AppComponent } from './app.component';
import { ComConst } from './shared/com.const';
import { CustomPinnedRowRenderer } from './web/CustomPinnedRowRenderer';
import { ComFormat } from './shared/com.format';
import { ReactiveFormsModule } from '@angular/forms';
import { AgGridRowTypeRender } from './shared/agGridRowTypeRender';

// JCNA : 다국어 처리.
// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    CustomHeaderGroup,
    CustomRowStatRender,
    CustomPinnedRowRenderer,
    AgGridRowTypeRender
  ],
  imports: [
    BrowserModule,
    ExtAngularModernModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    CookieModule.forRoot(),
    // JCNA : 다국어 처리.
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      },
    }),
    AgGridModule.withComponents([CustomHeaderGroup, CustomRowStatRender, CustomPinnedRowRenderer]),
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    EnvService,
    ComFunction,
    ComValidation,
    ComFormat,
    {
      provide: HTTP_INTERCEPTORS, 
      useClass: HttpInterceptorService, 
      multi: true
    },
    ComConst,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
