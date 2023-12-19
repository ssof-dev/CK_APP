import { Injectable } from '@angular/core';
import { ApiHttpService } from '../../shared/api-http.service';
import { UserInfo } from '../../shared/env.service';
// import { UserInfo } from './login.model';

@Injectable()
export class LoginService extends ApiHttpService{

	//사용자 인증
	public selectAccount(request: UserInfo){
		return this.httpPost('/api/access/login',request);
	}

	// 소속명 Update
	public updateDeptNm(request: UserInfo){
		return this.httpArrData('/api/access/updateDeptNm',request);
	}

	// 디지털원패스 사용자 인증
	public selectAccountOnepass(request: UserInfo){
		return this.httpPost('/api/access/loginOnepass',request);
	}
	
	// 키
	public getEKey(request: UserInfo){
		return this.httpPost('/optSet',request);
	}
}
