import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiHttpService } from 'src/app/shared/api-http.service';

export class MyPageModel{
    userId!: string;    //아이디
    userNo!: string;    //사용자 번호
    userNkn!: string;   //사용자 별칭
    userPwd!: string;   //사용자 암호
    useYn!: string;     //사용여부
    regUser!: string;   //등록사용자
    regDt!: string;     //등록일시
    modUser!: string;   //수정사용자    
    modDt!: string;     //수정일시
    rowType!: string;   //편집상태

    inputUserId!: string;   //입력된 유저아이디
    inptuUserNkn!: string;  //입력된 유저닉네임
}

@Injectable()
export class MyPageService extends ApiHttpService{

    /**
     * 로그인 사용자 조회
     */
    selectList(param : any): Observable<any>{
        return this.httpPost('/api/public/myPage/selectLoginInfoList', param);
    }

    /**
     * 사용자 정보 저장
     */
    svaeUserInfo(param : any) : Observable<any>{
        return this.httpPost('/api/public/myPage/svaeUserInfo', param);
    }
}