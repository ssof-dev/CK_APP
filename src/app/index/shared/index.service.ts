import { Injectable } from '@angular/core';
import { ApiHttpService } from '../../shared/api-http.service';
import { Index } from './index.model';

@Injectable()
export class IndexService extends ApiHttpService{

	//단일 대상 조회
	public selectIndex(request: Index){
		return this.httpPost('/api/index/selectIndex',request);
	}

	//복수 대상 조회
	public selectIndexList(request: Index){
		return this.httpPost('/api/index/selectIndexList',request);
	}

	//수정
	public updateIndex(request: Index){
		return this.httpPost('/api/index/updateIndex',request);
	}

	//등록
	public insertIndex(request: Index){
		return this.httpPost('/api/index/insertIndex',request);
	}

	//수정+등록
	public saveIndex(request: Index){
		return this.httpPost('/api/index/saveIndex',request);
	}

	//삭제
	public deleteIndex(request: Index){
		return this.httpPost('/api/index/deleteIndex',request);
	}

}
