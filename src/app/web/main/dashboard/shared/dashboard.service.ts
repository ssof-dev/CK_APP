import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiHttpService } from '../../../../shared/api-http.service';
//import { Deshboard, NoticeModel, FileDataModel } from './deshboard.model';

export class DashboardModel{
	brdNo		:string;	//글번호
	brdDiv		:string;	//글구분
	brdTitle	:string;	//글제목
	brdDesc		:string;	//글내용
	frYmd		:string;	//시작일자
	toYmd		:string;	//종료일자
	useYn		:string;	//사용여부
	regUser		:string;	//등록사용자
	regDt		:string;	//등록일시
	modUser		:string;	//수정사용자
	modDt		:string;	//수정일시
}

@Injectable()
export class DashboardService extends ApiHttpService{

	// //공지사항 조회
	// public getNoticeList(request: FileDataModel){
	// 	return this.httpPost('/api/comm/selectNotice',request);
	// }

	// //자료실 조회
	// public getFileDataList(request: FileDataModel){
	// 	return this.httpPost('/api/comm/selectFileData',request);
	// }

	//공지사항 조회
	// public getNoticeList(request: NoticeModel){
	// 	return this.httpPost('/api/TaskAdmin/NoticeMgt/selectNotice', request);
	// }

	/**
	 * 공지사항 조회
	 */
	noticeGridList(params : any): Observable<any>{
		return this.httpPost('/api/public/board/noticeGridList', params);
	}

	/**
	 * 자료실 조회
	 */
	dataGridList(params : any): Observable<any>{
		return this.httpPost('/api/public/board/dataGridList', params);
	}
}
