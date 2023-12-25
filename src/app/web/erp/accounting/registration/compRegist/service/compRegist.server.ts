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
    rowType!: string;       //모델상태

    pageSize: number = 50;
    offset: number = 0;
}

export class CompdModel{
    useCompNo!: string;				//사용업체번호
	useCompKi!: string;				//회계년도의 기
	frYmd!: string;					//1년단위의 사업시작일자
	toYmd!: string;					//1년단위의 사업마감일자
	ceoNm!: string;					//대표자명
	zipNo!: string;					//우편번호
	compAddr!: string;				//도로명 주소
	compAddrDesc!: string;			//상세주소
	reprPersonCd!: string;			//대표담당자코드
	perpPersonTelNo!: string;		//
	homeTaxId!: string;				//홈텍스ID
	eTaxBillId!: string;			//전자세금계산서ID
	eTaxBillPersonCd!: string;		//
	eTaxBillPersonTelNo!: string;	//
	eTaxBillPersonEmail!: string;	//담당자메일
	homePage!: string;				//홈페이지주소
	accGroupNo!: string;			//회계년도에 사용하는 계정그룹번호
	budAccStep!: string;			//예산의 단계
	remk!: string;					//비고
	useYn!: string;					//사용여부
	regUser!: string;				//최초 등록한 사용자번호
	regDt!: string;					//등록일시
	modUser!: string;				//수정사용자
	modDt!: string;					//수정일시
    rowType!: string;               //모델상태

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

    /**
     * 업체 정보 저장
     * @param params 
     * @returns 
     */
    saveCompInfo(params : any): Observable<any>{
        return this.httpPost('/api/public/compRegist/saveCompInfo', params);
    }

    /**
     * 업체, 업체정보 삭제
     * @param params 
     * @returns 
     */
    deleteComp(params : any): Observable<any>{
        return this.httpPost('/api/public/compRegist/deleteComp', params);
    }
}