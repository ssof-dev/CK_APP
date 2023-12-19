import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiHttpService } from 'src/app/shared/api-http.service';

export class CompRegistModel{
    useCompNo!: string;     //사용자업체번호
    useCompNm!: string;     //사용업체명
    busiNo!: string;        //사업자번호
    busiBtypeNm!: string;   //업태명
    busiBkindNm!: string;   //종목명
    cbodyRegNo!: string;    //법인번호
    custDiv!: string;       //업체구분
    cateCd!: string;        //업종코드
    totPayNo!: string;      //총괄납부번호
    totSiteCd!: string;     //총괄사업장코드
    openYmd!: string;       //개업일자
    bcloseYmd!: string;     //폐업일자
    taxCntlType!: string;   //세무관리유형
    primeRepmYn!: string;   //원가대체여부
    reprTelNo!: string;     //대표전화번호
    remk!: string;          //비고
    useYn!: string;         //사용여부
    regUser!: string;       //등록사용자
    regDt!: string;         //등록일시
    modUser!: string;       //수정사용자
    modDt!: string;         //수정일시

    pageSize: number = 50;
    offset: number = 0;
}

@Injectable()
export class CompRegistService extends ApiHttpService{
    
    /**
     * 업체 조회
     * @param params
     * @returns
     */
    selectCompRegistList(params : any): Observable<any>{
        return this.httpPost('/api/public/compRegist/selectCompRegistList', params);
    }

    /**
     * 업체 상세 조회
     * @param params
     * @returns
     */
    selectCompdList(params : any): Observable<any>{
        return this.httpPost('/api/public/compRegist/selectCompdList', params);
    }
}