declare var Ext: any;
import { Injectable } from '@angular/core';
import { ApiHttpService } from './api-http.service';
import { saveAs } from 'file-saver';


@Injectable()
export class ApiHttpServiceImpl extends ApiHttpService{
	
    //단일 대상 조회
	public selectOne(url: string, param: any){
		return this.httpPost(url,param);
	}

	//복수 대상 조회
	public selectList(url: string, param: any){
		return this.httpPost(url,param);
	}

	//저장(수정&등록)
	public saveForm(url: string, param: any){
		return this.httpPost(url,param);
	}
	
	//저장(수정&등록 + 파일)
	public saveFormFile(url: string, param: any, files){
		return this.httpFileUpload(url, param, files); 
	}

	public saveArrFormFile(url: string, param: any, files){
		return this.httpArrFileUpload(url, param, files);
	}

	//승인요청
	public askApproval(url: string, param: any){
		return this.httpPost(url, param);
	}
	
	//승인
	public approval(url: string, param: any){
		return this.httpPost(url, param);
	}
	
	//반려
	public rejectApproval(url: string, param: any){
		return this.httpPost(url, param);
	}

	//삭제
	public deleteForm(url: string, param: any){
		return this.httpPost(url,param);
	}

	//엑셀
	public excelExport(url: string, param: any){
		return this.httpPost(url,param);
	}

	//엑셀 업로드
	public excelImport(url: string, param: any, excel){
		return this.httpExcelUpload(url, param, excel);
	}

	//레포트
	public reportExport(url: string, param: any){
		return this.httpPost(url,param);
	}

	/**
     * @param param : Object type
     * param = {
     *  fileNm      : '원본 파일명'             -> 필수!
     *  filePath    : '파일경로'                -> 기본값으로 사용시 필수
     *  fileSaveNm  : '서버에 저장된 파일명'     -> 기본값으로 사용시 필수
     *  그외 사용자가 필요한 값 넣어서 사용
     * }
	 * @param callBack : 결과처리 받을 콜백함수
     * @param api
     * 함수를 호출할때 api 값없이 호출하면 파일 다운로드 공통 처리 API를 호출 이때는 param 값에 fileNm, filePath, fileSaveNm 3가지 값이 필수로 존재해야함
     * 함수를 호출할때 사용자가 정의한 API 호출을 처리하려면 api 값을 넣어서 함수 호출 이때는 param 값에 fileNm 필수로 존재해야함
     */
	public downloadFile(param, callBack:Function, api?,){
		let _api = api === undefined ? '/apiFile/comm/downloadFile' : api;
		this.httpFileDownload(_api, param).subscribe(
            blob => {
                saveAs(blob, param.fileNm);
				callBack('OK');
            },
            err =>{
				callBack('ERROR');
            }
        );
	}
 
	//@ycan_20210904 직접만든 API 연동 할 경우 사용
	public apiCall(url: string, param: any){
		return this.httpPost(url,param);
	}

	// @ychan_20220323 복수 List 통신
	public apiArrayCall(url: string, param: any){
		return this.httpArrData(url, param);
	}

	//저장(그리드)
	public saveGridForm(url: string, gridApi: any){

		let updateRow = new Array();	//수정
		let createRow = new Array();	//신규
		let deleteRow = new Array();	//삭제

		gridApi.forEachNode(function (node) {

			let nodeData = node.data;
			node.setSelected( nodeData.rowStat === 'U' || nodeData.rowStat === 'C' || nodeData.rowStat === 'D' );
			
			if( nodeData.rowStat === 'U' ){
				updateRow.push( nodeData );
			}else if( nodeData.rowStat === 'C' ){
				createRow.push( nodeData );
			}else if( nodeData.rowStat === 'D' ){
				deleteRow.push( nodeData );
			}
		});

		let formData: FormData = new FormData();
		formData.append('updateRow', JSON.stringify(updateRow));
		formData.append('createRow', JSON.stringify(createRow));
		formData.append('deleteRow', JSON.stringify(deleteRow));

		return this.httpPost(url, formData);
	}
}