
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiHttpService } from './api-http.service';

export class CommonCodeNode {
  cdData!: string;
  cdNm!: string;
}
//소속코드,소속명
export class CommonLinkNode {
  cdData!: string;
  cdNm!: string;
}

@Injectable()
export class CommonService extends ApiHttpService{


  //공통코드 조회
  getCommonCodes(params: any): Observable<any> {
    return this.httpPost('/api/public/comm/selectUseCodeList', params);
  }

  //팀목록 조회
  getTeamTreeView(params?:any): Observable<any> {
    return this.httpPost('/api/public/comm/selectTeamTreeView', params);
  }

  //사용자관리 리스트 가져오기
  getGridDataUserList(params: any): Observable<any> {
    return this.httpPost('/api/public/comm/selectUserList', params);
  }

  //주소조회
  getGridDataJusoList(params: any): Observable<any> {
    return this.httpPost('/api/public/comm/selectJusoList', params);
  }

  //업체목록
  acCompList(params?: any): Observable<any> {
    return this.httpPost('/api/public/comm/acCompList', params);
  }

  //업체 회계 기 목록
  acCompKiList(param: any): Observable<any> {
    let par = {useCompNo : param};
    return this.httpPost('/api/public/comm/acCompKiList', par);
  }

  /**
   * 예금계좌
   * @param params 
   * @returns 
   */
  getAccBankLoopUpList(useCompNo: any): Observable<any> {
    let param = {
      useCompNo: useCompNo
    }
    return this.httpPost('/api/erp/acc/accBankReg/getAccBankLoopUpList', param);
  }

  /**
     * 계정과목그룹번호 목록조회
     * @param params 
     * @returns 
     */
  getAccGroupCd(params?:any): Observable<any> {
    return this.httpPost('/api/erp/acc/accCodeReg/getAccGroupCd', params);
  }

  //예금계좌 목록 조회
  getAccBankRegList(params: any): Observable<any> {
    return this.httpPost('/api/erp/acc/accBankReg/selectAccBankRegList', params);
  }

  //예산계정과목
  getAccBudRegList(params: any): Observable<any> {
    return this.httpPost('/api/erp/bud/budCodeReg/selectBudCodeRegPopList', params);
  }

  //제코드 헤더 조회
  selectAcCodeamList(params : any): Observable<any> {
    return this.httpPost('/api/erp/acc/accCodeaReg/selectAcCodeamList', params);
  }
  //제코드 상세 조회
  selectAcCodeadList(params : any): Observable<any> {
    return this.httpPost('/api/erp/acc/accCodeaReg/selectAcCodeadList', params);
  }

  //계정과목 리스트 조회
  getAcAccCodeList(params : any): Observable<any> {
    return this.httpPost('/api/erp/acc/accCodeReg/selectAcAccCodeList', params);
  }

  //계정과목 - 예산계정 조회
  getAcAccCodeBudList(params : any): Observable<any> {
    return this.httpPost('/api/erp/acc/budCodeReg/getAcAccCodeBudList', params);
  }

  //거래처목록 조회
  getAccCustRegList(params: any): Observable<any> {
    return this.httpPost('/api/erp/acc/accCustReg/selectAcCustList', params);
  }

  //부서(팀) selectBox 목록 조회
  getTeamList(params: any): Observable<any> {
    return this.httpPost('/api/public/teamMngt/selectTeamMngtSelectBox', params);
  }

  //예금계좌 조회
  getAccCcardRegList(params: any): Observable<any> {
    return this.httpPost('/api/erp/acc/accCcardReg/selectAccCcardRegList', params);
  }

  //메모 조회
  getMemoList(param: any): Observable<any> {
    return this.httpPost('/api/public/comm/memoList', param);
  }

  //메모저장
  saveMemo(param: any): Observable<any> {
    param.jobUser = sessionStorage.getItem('job');
    return this.httpPost('/api/public/comm/saveMemo', param);
  }

  /**
    * 파일 다운로드
    * @param param 
    * @param fileNm 
    */
  fileDownload(api: any): Observable<any> {
    return this.httpGet(api, { responseType: 'blob' });
  }
  
}
