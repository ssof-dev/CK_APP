import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiHttpService } from 'src/app/shared/api-http.service';

export class UserMngtModel{
    userNo!: string; 
    userNm!: string;   
    userEmail!: string;
    teamCd!: string;   
    teamNm!: string;
    userRnk!: string;  
    userPos!: string;  
    userDuty!: string; 
    userIcomp!: string;
    userOcomp!: string;
    userEcomp!: string;
    userLcomp!: string;
    useYn!: string;       //사용여부
    pageSize: number = 50;
    offset: number = 0;
}

@Injectable()
export class UserMngtService extends ApiHttpService{

    /**
     * 사용자 조회
     * @param params
     * @returns
    */
    selectUserMngtList(params : any): Observable<any>{
        return this.httpPost('/api/public/userMngt/selectUserMngtList', params);
    }
}