import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiHttpService } from 'src/app/shared/api-http.service';

export class CodeMngtModel {
    cdType!: string;
    cdData!: string;
    cdNm!: any;
    cdOpt!: string;
    cdExpl!: string
    cdSeq!: string;
    useYn!: string;
    regUser!: string;
    regDt!: any;
    modUser!: string;
    modDt!: any;
    pageSize: number = 50;
    offset: number = 0;
}

@Injectable()
export class CodeMngtService extends ApiHttpService{
    
 
    /**
     * 공통코드 조회
     * @param params 
     * @returns 
     */
    selectCodeMngtList(params : any): Observable<any> {
        return this.httpPost('/api/public/codeMngt/selectCodeMngtList', params);
    }

    /**
     * 공통코드 상세 조회
     * @param params 
     * @returns 
     */
    selectCodeMngtDetailList(params : any): Observable<any> {
        return this.httpPost('/api/public/codeMngt/selectCodeMngtDetailList', params);
    }

    /**
     * 중복코드 확인
     * @param params 
     * @returns 
     */
    uniqueCdDataCheck(params : any): Observable<any> {
        return this.httpPost('/api/public/codeMngt/uniqueCdDataCheck', params);
    }

    /**
     * 공통코드 저장
     * @param params 
     * @returns 
     */
    saveCodeMngt(params : any): Observable<any> {
        return this.httpPost('/api/public/codeMngt/saveCodeMngt', params);
    }

}
        