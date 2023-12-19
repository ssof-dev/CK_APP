import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginModule } from './login/login.module';
import { IndexModule } from './index/index.module';
import { ErpModule } from './web/erp/erp.module';


// const routes: Routes = [
//   { path: '', redirectTo: 'login', pathMatch: 'full' },
//   { path: 'login', loadChildren: ()=> LoginModule },
//   { path: 'index', loadChildren: ()=> IndexModule },
// ];

// { path: 'index/:id/:pw', loadChildren: ()=> IndexModule },                      // 온누리상품권 관리 시스템 화면
// { path: 'OnepassCheck/:resType/:userId', loadChildren: ()=> OnepassCheckModule }, // 디지털원패스 추가 @ychan_20230227

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: ()=> LoginModule },                      // 로그인 화면
  { path: 'index', loadChildren: ()=> IndexModule },                      // Index
  //{ path: 'erp', loadChildren: ()=> ErpModule },                       // ERP
  // { path: 'OnepassCheck/:resType/:userId/:userKey/:intfToken', loadChildren: ()=> OnepassCheckModule }, // 디지털원패스 추가 @ychan_20230227
  
];

// @NgModule({
//     imports: [RouterModule.forRoot(routes)],
//     exports: [RouterModule]
// })

//@ychan_20211125 새로고침 수정
@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})

export class AppRoutingModule { }