// declare var Ext: any;
// import { Component, OnInit } from '@angular/core';
// import { HttpErrorResponse } from '@angular/common/http';
// import { UserInfo } from '../shared/env.service';
// // import { UserInfo } from './shared/login.model';
// import { LoginService } from './shared/login.service';
// import { Router } from '@angular/router';

// import { TranslateService } from '@ngx-translate/core';

// import { EnvService } from '../shared/env.service';
// import { ComFunction } from '../shared/com.function';
// import { TabzLoaderWeb } from '../web/tabz-loader.web';
// import { TabzLoaderExample } from '../example/tabz-loader.example';

// @Component({
// 	selector: 'app-login',
// 	templateUrl: './login.component.html',
// 	styleUrls: [
//         './login.component.scss'
//     ],
// 	providers: [LoginService, TabzLoaderWeb, TabzLoaderExample],
// })
// export class LoginComponent implements OnInit {
// 	public userModel: UserInfo = <UserInfo>{};

// 	public btnLabel: string = 'Let me in.';

// 	public textTimer:any;  //로그인 버튼 안내멘트 시간 제어

// 	constructor(private loginService: LoginService, 
// 		private router: Router, 
// 		private translate: TranslateService, 
// 		public envService: EnvService,
// 		public comFun: ComFunction,
// 		public tabzLoaderWeb: TabzLoaderWeb,
// 		public tabzLoaderExample: TabzLoaderExample ) {
// 	}
	
// 	ngOnInit() {
// 		this.envService.userInfo = null;
// 		//document.getElementById('userId').focus();
// 	}
	
// 	//로그인
// 	accountLogin =(event) =>{

// 		document.getElementById('btnLabel').style.display = 'none';
// 		// @osh_20210913
// 		//document.getElementById('spin').style.display = '';
// 		document.getElementById('spin').style.display = 'block';

// 		//*****************************************************
// 		// @osh_20210913
// 		const spinTimer = setTimeout(() => document.getElementById('spin').style.display = 'none', 1000)
// 	    const btnLabelTimer = setTimeout(() => document.getElementById('btnLabel').style.display = 'block', 1000)
// 		//*****************************************************

// 		if( this.comFun.isEmpty(this.userModel.userId) ){
// 			this.comFun.alert(this.comFun.i18n('경고'), this.comFun.i18n('loginId'), null);
// 			//*****************************************************
// 			// @osh_20210913
// 			this.btnLabel = this.comFun.i18n('loginId');
//         	document.getElementById('userId').focus();
// 			this.textTimer = setTimeout(() => this.btnLabel = 'Let me in.', 2000);
// 			//*****************************************************
// 		} else if ( this.comFun.isEmpty(this.userModel.userPw) ){
// 			this.comFun.alert(this.comFun.i18n('경고'), this.comFun.i18n('loginPw'), null);
// 			//*****************************************************
// 			// @osh_20210913
// 			this.btnLabel = this.comFun.i18n('loginPw'); // 비밀번호를 입력하세요.
// 			document.getElementById('userPw').focus();
// 			this.textTimer = setTimeout(() => this.btnLabel = 'Let me in.', 2000);
// 			//*****************************************************
// 		} else {
// 			this.loginService.selectAccount(this.userModel).subscribe(
// 				(result: UserInfo) => { //1-성공시
// 					if( result == null ){
// 						this.comFun.alert(this.comFun.i18n('경고'), this.comFun.i18n('noMatchUser'), null);
// 						this.btnLabel = 'Let me in.';
// 						// @osh_20210913
// 						//document.getElementById('btnLabel').style.display = '';
// 						document.getElementById('btnLabel').style.display = 'block';
// 						document.getElementById('spin').style.display = 'none';
// 					}else{
// 						//*****************************************************
// 						// @osh_20210913
// 						clearTimeout(spinTimer);
// 	                    clearTimeout(btnLabelTimer);
// 						//*****************************************************

// 						this.envService.userInfo = result;	//사용자 정보 저장
// 						this.getProgList();					//프로그램 목록 조회
// 					}
// 				},
// 				(err: HttpErrorResponse) => { //1-오류시
// 					this.comFun.alert(this.comFun.i18n('오류'), this.comFun.i18n('alertErrorMsg'), null);
// 					// @osh_20210913
// 					//document.getElementById('btnLabel').style.display = '';
// 					document.getElementById('btnLabel').style.display = 'block';
// 					document.getElementById('spin').style.display = 'none';
// 					if (err.error instanceof Error) {
// 						console.log('An error occurred:', err.error.message);
// 					} else {
// 						console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
// 					}
// 				}
// 			);
// 		}
// 	}

// 	//프로그램 목록 조회
// 	getProgList = () =>{
// 		let that = this;
// 		this.envService.selectCommProgList(this.envService.userInfo).subscribe(
// 		  (res: any) => {
// 			  	//*****************************************************
// 				// @osh_20210913
// 				// document.getElementById('btnLabel').style.display = '';
// 				// document.getElementById('spin').style.display = 'none';
// 				// document.getElementById('check').style.display = '';
// 				document.getElementById('btnLabel').style.display = 'block';
// 				document.getElementById('spin').style.display = 'none';
// 				document.getElementById('check').style.display = 'block';
// 				//*****************************************************
// 				this.btnLabel = 'Access Success!!';
				
// 				//this.tabzLoaderWeb.SetTabzMenu(res);
// 				this.envService.progData = {
// 					children: res
// 				};

// 				if(this.envService.DEBUG === true) {
// 					let localMenuArr = new Array(); 
// 					// 예제 : Local menu를 서버에서 조회한 리스트에 추가한다.
// 					localMenuArr.push(this.tabzLoaderWeb.GetTabzMenu());
// 					localMenuArr.push(this.tabzLoaderExample.GetTabzMenu());	

// 					this.envService.progData = {
// 						children: this.tabzLoaderWeb.GetTabzMenu()
// 					};
							
// 				}
				
// 				setTimeout(function() {
// 					that.router.navigate(['index']);
// 				},500);
				
// 			},
// 			(err: HttpErrorResponse) => {
// 				this.comFun.alert(this.comFun.i18n('오류'), this.comFun.i18n('alertErrorMsg'), (e)=>{
// 					// @osh_20210913
// 					//document.getElementById('btnLabel').style.display = '';
// 					document.getElementById('btnLabel').style.display = 'block';
// 					document.getElementById('spin').style.display = 'none';
// 					//로그인화면으로 이동
// 					// this.router.navigate(['index']);
// 				});
// 				if (err.error instanceof Error) {
// 					console.log('An error occurred:', err.error.message);
// 				} else {
// 					console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
// 				}
// 			}
// 		);
// 	}

// 	// inputBlur =(e) =>{
// 	// 	if( e == '0' ){
// 	// 		if( this.comFun.isEmpty(this.userModel.userId) ){
// 	// 			this.btnLabel = this.comFun.i18n('loginId');
// 	// 			document.getElementById('userId').focus();
// 	// 		}else{
// 	// 			this.btnLabel = 'Let me in.';
// 	// 		}
// 	// 	}else{
// 	// 		if( this.comFun.isEmpty(this.userModel.userPw) ){
// 	// 			this.btnLabel = this.comFun.i18n('loginPw');
// 	// 			document.getElementById('userPw').focus();
// 	// 		}else{
// 	// 			this.btnLabel = 'Let me in.';
// 	// 		}
// 	// 	}
// 	// }

// 	// osh_20210913
// 	// keyEvent = (e) =>{
// 	// 	if( e.keyCode == 13 ) {
// 	// 		if( this.comFun.isEmpty(this.userModel.userId) ){
// 	// 			this.btnLabel = this.comFun.i18n('loginId');
// 	// 			document.getElementById('userId').focus();
// 	// 		} else if ( this.comFun.isEmpty(this.userModel.userPw) ){
// 	// 			this.btnLabel = this.comFun.i18n('loginPw');
// 	// 			document.getElementById('userPw').focus();
// 	// 		} else if( !(this.comFun.isEmpty(this.userModel.userId) && this.comFun.isEmpty(this.userModel.userPw)) ) {
// 	// 			this.btnLabel = 'Let me in.';
// 	// 			this.accountLogin(null);
// 	// 		}
// 	// 	}
// 	// }

// 	keyEvent(e) {
// 		this.btnLabel = 'Let me in.';
// 		if( this.comFun.isEmpty(this.userModel.userId) ){
// 			this.btnLabel = this.comFun.i18n('loginId');
// 			if (this.textTimer) clearTimeout(this.textTimer);
// 			this.textTimer = setTimeout(() => this.btnLabel = 'Let me in.', 3000);
// 			return;
// 		} else if ( this.comFun.isEmpty(this.userModel.userPw) ){
// 			this.btnLabel = this.comFun.i18n('loginPw');
// 			if (this.textTimer) clearTimeout(this.textTimer);
// 			this.textTimer = setTimeout(()=>this.btnLabel = 'Let me in.', 3000);
// 			return;
// 		}
// 		if( e.keyCode == 13 ) {
// 			if( this.comFun.isEmpty(this.userModel.userId) ){
// 				this.btnLabel = this.comFun.i18n('loginId');
// 				document.getElementById('userId').focus();
// 			} else if ( this.comFun.isEmpty(this.userModel.userPw) ){
// 				this.btnLabel = this.comFun.i18n('loginPw');
// 				document.getElementById('userPw').focus();
// 			} else if( !(this.comFun.isEmpty(this.userModel.userId) && this.comFun.isEmpty(this.userModel.userPw)) ) {
// 				this.btnLabel = 'Let me in.';
// 				this.accountLogin(null);
// 			}
// 		}
// 	}


// 	// 신규 가맹점 신청
// 	ApprovalFrc =(event) =>{
// 		// 사용자 정보 저장
// 		this.envService.userInfo= new UserInfo();
// 		this.envService.userInfo.userId = "FrcAppr";
// 		this.envService.userInfo.deptType = "99"; // 회원정보가 없는 일반 사용자

// 		// 프로그램 목록 조회
// 		this.getProgList();					
// 	}

// 	// 신규 상인회 신청
// 	ApprovalAsso =(event) =>{
// 		// 사용자 정보 저장
// 		this.envService.userInfo= new UserInfo();
// 		this.envService.userInfo.userId = "AssoAppr";
// 		this.envService.userInfo.deptType = "99"; // 회원정보가 없는 일반 사용자
		
// 		// 프로그램 목록 조회
// 		this.getProgList();	
// 	}
// }
