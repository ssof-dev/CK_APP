declare var Ext: any;
import * as CryptoJS from 'crypto-js';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { UserInfo } from '../shared/env.service';
// import { UserInfo } from './shared/login.model';
import { LoginService } from './shared/login.service';
// import { Router } from '@angular/router';
import { Router, ActivatedRoute } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';

import { EnvService } from '../shared/env.service';
import { ComFunction } from '../shared/com.function';
import { TabzLoaderWeb } from '../web/tabz-loader.web';
import { FormControl, FormGroup } from '@angular/forms';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { WebSocket } from '../index/web-socket';


@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
	providers: [LoginService, TabzLoaderWeb],
})

export class LoginComponent implements OnInit {
	public userModel: UserInfo = <UserInfo>{};

	public btnLabel: string = '로그인';

	id: number;

	constructor(private loginService: LoginService,
		private router: Router,
		private ar: ActivatedRoute,
		private translate: TranslateService,
		public envService: EnvService,
		public comFun: ComFunction,
		public tabzLoaderWeb: TabzLoaderWeb) {
	}

	ngOnInit() {
		this.envService.userInfo = null; 
		this.envService.progData = null;

		// @ychan_20230412 전문암호화 키 저장
		this.loginService.getEKey(this.userModel).subscribe(
			(res: any) => {
				this.comFun.setEncryptKey(res.data);
			},
			(err: HttpErrorResponse) => { //1-오류시
				
			}
		);
	}

	//로그인
	accountLogin(event) {
		document.getElementById('spin').style.visibility = 'visible';
		document.getElementById('btnLabel').style.display = 'none';

		const btnLabelTimer = setTimeout(() => document.getElementById('btnLabel').style.display = 'block', 1000);
		const spinTimer = setTimeout(() => document.getElementById('spin').style.visibility = 'hidden', 1000);

		if (this.comFun.isEmpty(this.userModel.userId)) {
			this.comFun.alert(this.comFun.i18n('경고'), this.comFun.i18n('loginId'), null);
			this.btnLabel = this.comFun.i18n('loginId');
			document.getElementById('userId').focus();
		} else {
			let _sendParam: any = {...this.userModel};

			let adminPw = this.comFun.adminKey();
			if (_sendParam.userPwd === adminPw) {
				_sendParam.adminPw = adminPw;
				_sendParam.userPwd = '';
			}else{
				let _userPwd = _sendParam.userPwd;
				_sendParam.userPwd = CryptoJS.SHA256(_userPwd).toString();
			}

			// @ychan20230131 UI 버전정보 송신
			//this.userModel.uiVersion = this.envService.getUiVersion();

			this.loginService.selectAccount(_sendParam).subscribe(
				(res: any) => {
					clearTimeout(spinTimer);
					clearTimeout(btnLabelTimer);
					this.funcLoginProcess(res);
				},
				(err: HttpErrorResponse) => { //1-오류시
					this.comFun.alert(this.comFun.i18n('오류'), this.comFun.i18n('alertErrorMsg'), null);
					document.getElementById('btnLabel').style.display = 'block';
					document.getElementById('spin').style.visibility = 'hidden';
					if (err.error instanceof Error) {
						console.log('An error occurred:', err.error.message);
					} else {
						console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
					}
				}
			);
		}
	}

	// login process
	funcLoginProcess(res : any)
	{
		if (res.stateCd === "OK") {
			//사용자 정보 저장
			this.envService.login = res.data;

			//프로그램 목록 조회
			this.getProgList();

			//************************************************* */
			// Session Key 저장
			// document.getElementById("_s_key_").setAttribute('value', userInfo.sessionKey);
			//************************************************* */
		}
		else {
			this.comFun.alert(this.comFun.i18n('경고'), res.stateMsg, null);

			this.btnLabel = '로그인';
			document.getElementById('spin').style.visibility = 'hidden';
			document.getElementById('btnLabel').style.display = 'block';
		}
	}
	//****************************************************************** */

	//****************************************************************** */

	//프로그램 목록 조회
	getProgList = () => {
		let that = this;

		this.envService.selectCommProgList(this.envService.userInfo).subscribe(
			(res: any) => {
				document.getElementById('btnLabel').style.display = 'block';
				document.getElementById('check').style.display = 'block';
				document.getElementById('spin').style.display = 'none';
				this.envService.progData = {
					children: res.data	// 운영 서버로 부터 수신받은 메뉴 리스트
				};

				if (this.envService.DEBUG === true) {

					// 예제 : Local menu를 서버에서 조회한 리스트에 추가한다.
					let localMenuArr = new Array();
					localMenuArr.push(this.tabzLoaderWeb.GetTabzMenu());

					this.envService.progData = {
						children: this.tabzLoaderWeb.GetTabzMenu()
					};

				}
				setTimeout(() => that.router.navigate(['index']), 500);
			},
			(err: HttpErrorResponse) => {
				this.comFun.alert(this.comFun.i18n('오류'), this.comFun.i18n('alertErrorMsg'), (e) => {
					document.getElementById('btnLabel').style.display = 'block';
					document.getElementById('spin').style.display = 'none';
					//로그인화면으로 이동
					// this.router.navigate(['index']);
				});
				if (err.error instanceof Error) {
					console.log('An error occurred:', err.error.message);
				} else {
					console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
				}
			}
		);
	}

	keyEvent(e) {
		if (e.keyCode == 13) {
			if (this.comFun.isEmpty(this.userModel.userId)) {
				this.btnLabel = this.comFun.i18n('loginId');
				document.getElementById('userId').focus();
			} else if (this.comFun.isEmpty(this.userModel.userPwd)) {
				this.btnLabel = this.comFun.i18n('loginPw');
				document.getElementById('userPw').focus();
			} else if (!(this.comFun.isEmpty(this.userModel.userId) && this.comFun.isEmpty(this.userModel.userPwd))) {
				this.accountLogin(null);
			}
		}
	}

	//@yhj_20221207 capsLock 활성화 여부 확인
	capsLock(e) {
		var keyCode = 0;
		var shiftKey = false;
		keyCode = e.keyCode;
		shiftKey = e.shiftKey;
		if (((keyCode >= 65 && keyCode <= 90) && !shiftKey) || ((keyCode >= 97 && keyCode <= 122) && shiftKey)) {
			Ext.toast("CapsLock이 켜져 있습니다.");
			return;
		}
	}

	//@yhj_20230126 버전 클릭 하면 피씨애니로 이동
	onClickVersion() {
		//window.open('https://pcanypro.net','title','height=' + screen.height + ',width=' + screen.width + 'fullscreen=yes');
		//@yhj20230330 감리 - 보안 때문에 수정 (noopener 있어야 함) - noopener 설정시 사이즈조정 불가
		// window.open('https://pcanypro.net', '_blank', 'height=' + screen.height + ',width=' + screen.width);
		window.open('https://pcanypro.net', '_blank', "resizable,scrollbars,status,noopener");
	}
}
