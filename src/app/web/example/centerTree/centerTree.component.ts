/**
 * ===========================================================
 * 생성/수정일 					작성자          내용
 * ===========================================================
 * 2021-08-20 09:58:21                         최초생성
 */
declare var Ext: any;
import { Component, OnInit, Input } from '@angular/core';
import { CenterTreeModel } from './model/centerTree.model';
import { ApiHttpServiceImpl } from '../../../shared/api-http-service-impl';
import { EnvService } from '../../../shared/env.service';
import { ComFunction } from '../../../shared/com.function';
import { ComValidation } from '../../../shared/com.validation';
import { HttpErrorResponse } from '@angular/common/http';
import { IndexComponent } from 'src/app/index/index.component';

@Component({
	selector: 'app-centerTree',
	templateUrl: './centerTree.component.html',
	providers: [ApiHttpServiceImpl],
})
export class CenterTreeComponent implements OnInit {

	@Input() public route: any;

	public menualNm = '메뉴얼 PDF파일명';

	public isMenualDialog: boolean = false;	//메뉴얼 팝업창 표시 여부

	//조회 modal
	public searchModel: CenterTreeModel = <CenterTreeModel>{};

	//comboBox Store
	public comboStore : any = [
		{comboId: 'combo1', comboNm: 'combo1'},
		{comboId: 'combo2', comboNm: 'combo2'}
	];

	//버튼 활성여부 제어 true : 비활성, false: 활성 
	public btnDisable = {
		searchBtn 	: false,			//조회
		saveBtn		: true,				//저장
		modifyBtn	: false,			//수정
		deleteBtn	: true,				//삭제
		newBtn		: false,			//신규
		reqApprBtn	: true,				//승인요청	
		apprBtn		: true,				//승인
		rejectBtn	: true,				//반려
		excelBtn	: false,			//엑셀
		reportBtn	: false,			//출력
		menualBtn	: false,			//메뉴얼
		cancelBtn	: false				//취소
	}

	//TreeGrid Store
	public treeStore = new Ext.data.TreeStore({
		rootVisible: true,
		root: null
	});

	//TreeGrid 컴포넌트
	public treeCmp : any;

	//Search Form Component 
	public searchFormCmp : any;

	constructor(private apiHttpServiceImpl: ApiHttpServiceImpl, 
				public envService: EnvService,
				public comFun: ComFunction, 
				public comVal: ComValidation,
				public indexCmp: IndexComponent) {}

	ngOnInit() {

		//Tree 예제 
		this.treeStore = new Ext.data.TreeStore({
			rootVisible: true,
			root: { 
				expanded: true,
				text: 'All',
				val: 'val_1',
				iconCls: 'x-fa fa-sitemap',
				children: [{
					text: 'Home',
					iconCls: 'x-fa fa-home',
					checked: false,
					children: [{
						text: 'Messages',
						numItems: 231,
						iconCls: 'x-fa fa-inbox',
						checked: false,
						leaf: true
					}, {
						text: 'Archive',
						iconCls: 'x-fa fa-database',
						children: [{
							text: 'First',
							numItems: 7,
							iconCls: 'x-fa fa-sliders',
							leaf: true
						}, {
							text: 'No Icon',
							numItems: 0,
							iconCls: null,
							leaf: true
						}]
					}, {
						text: 'Music',
						numItems: 3000,
						iconCls: 'x-fa fa-music',
						leaf: true
					}, {
						text: 'Video',
						numItems: 1000,
						iconCls: 'x-fa fa-film',
						leaf: true
					}]
				}, {
					text: 'Users',
					iconCls: 'x-fa fa-user',
					children: [{
						text: 'Tagged',
						numItems: 53,
						iconCls: 'x-fa fa-tag',
						leaf: true
					}, {
						text: 'Inactive',
						numItems: 9,
						iconCls: 'x-fa fa-trash',
						leaf: true
					}]
				}, {
					text: 'Groups',
					numItems: 3,
					iconCls: 'x-fa fa-group',
					leaf: true
				}, {
					text: 'Settings',
					iconCls: 'x-fa fa-wrench',
					children: [{
						text: 'Sharing',
						numItems: 4,
						iconCls: 'x-fa fa-share-alt',
						leaf: true
					}, {
						text: 'Notifications',
						numItems: 16,
						iconCls: 'x-fa fa-flag',
						leaf: true
					}, {
						text: 'Network',
						numItems: 4,
						iconCls: 'x-fa fa-signal',
						leaf: true
					}]
				}]
			}
		});
	}

	//조회 Form 컴포넌트
	onSearchFormReady(event){
		this.searchFormCmp = event.cmp;
	}

	// //공통코드 dilalog 호출
	// codeDialog = () =>{
	// 	let param = this.indexCmp.codeParamModel;
	// 	this.indexCmp.codeDialogView(param, (result)=>{
	// 		//결과처리
	// 		console.log(result);
	// 	});
	// }

	//날짜 변경 이벤트
	onChangeStartDt(date){
		this.searchModel.startDt = this.comFun.getDateToString(date.newDate, '');
	}

	//체크박스 선택 이벤트
	onChangeCheck(data){
		//선택하면 Y 미선택이면 N 
		this.searchModel.checkVal = data.newValue == true ? 'Y' : 'N';
	}

	//토글 버튼 선택 이벤트
	onChangeToggle(data){
		this.searchModel.toggleVal = data.newValue;
	}

	//콤보박스 변경 이벤트
	onChangeComboBox(data){
		this.searchModel.comboVal = data.newValue;
	}

	//트리그리드 컴포넌트
	onReadytree(event){
		this.treeCmp = event.cmp;
	}

	//필드별 단축키 설정
	//@yhj-2030330 감리 버그로 주석
	// onShortcutsKeyTextField(event){
	// 	let that = this;
	// 	new Ext.util.KeyMap({
	// 		target: event.cmp.el,
	// 		ctrl:true,
	// 		key: 70,
	// 		// handler: ()=>that.codeDialog(),
	// 		scope: 'this'
	// 	});
	// }

	//조회 버튼 이벤트
	onTapQuery(){
		this.treeCmp.setMasked({
			xtype: 'loadmask',
			message: 'Loading...'
		});
		this.apiHttpServiceImpl.selectOne('/apiUrl...', this.searchModel).subscribe(
			(res: any) => {
				/**
				 * @success
				 */
				let resultStore = [{
					expanded: true,
					text: 'Tree',
					children: res
				}];

				this.treeStore.setData(resultStore);
				this.treeCmp.setMasked(false);
			},
			(err: HttpErrorResponse) => {
					/**
					* @error
					*/
					this.comFun.alert(this.comFun.i18n('오류'), this.comFun.i18n('alertErrorMsg'), null);
					this.treeCmp.setMasked(false);
			}
		);
	}

	//수정 버튼 이벤트
	onTapModify(){
		this.btnDisable.searchBtn   = true;
		this.btnDisable.modifyBtn   = true;
		this.btnDisable.saveBtn     = false;
		this.btnDisable.newBtn      = true;
	}

	//삭제 버튼 이벤트
	onTapDelete(){
		this.comFun.confirm(this.comFun.i18n('삭제'), this.comFun.i18n('alertDeleteMsg'), (e)=>{
			//yes or no
			if( e === 'yes' ){
				this.apiHttpServiceImpl.deleteForm('/apiUrl...', this.searchModel).subscribe(
					(res: any) => {
						/**
						 * @success
						 */
					},
					(err: HttpErrorResponse) => {
						/**
						 * @error
						 */
						this.comFun.alert(this.comFun.i18n('오류'), this.comFun.i18n('alertErrorMsg'));
					}
				);
			}
		});
	}

	//신규 버튼 이벤트
	onTapNew(){
		this.btnDisable.searchBtn	= true;
		this.btnDisable.newBtn 		= true;
		this.btnDisable.modifyBtn 	= true;
		this.btnDisable.saveBtn 	= false;
	}

	//승인요청 버튼 이벤트
	onTapRequestAppr(){
		this.apiHttpServiceImpl.askApproval('/apiUrl...', this.searchModel).subscribe(
			(res: any) => {
				/**
				 * @success
				 */
			},
			(err: HttpErrorResponse) => {
				/**
				 * @error
				 */
				this.comFun.alert(this.comFun.i18n('오류'), this.comFun.i18n('alertErrorMsg'));
			}
		);
	}

	//승인버튼 이벤트
	onTapAppr(){
		this.apiHttpServiceImpl.approval('/apiUrl...', this.searchModel).subscribe(
			(res: any) => {
				/**
				 * @success
				 */
			},
			(err: HttpErrorResponse) => {
				/**
				 * @error
				 */
				this.comFun.alert(this.comFun.i18n('오류'), this.comFun.i18n('alertErrorMsg'));
			}
		);
	}

	//반려버튼 이벤트
	onTapReject(){
		this.apiHttpServiceImpl.rejectApproval('/apiUrl...', this.searchModel).subscribe(
			(res: any) => {
				/**
				 * @success
				 */
			},
			(err: HttpErrorResponse) => {
				/**
				 * @error
				 */
				this.comFun.alert(this.comFun.i18n('오류'), this.comFun.i18n('alertErrorMsg'));
			}
		);
	}

	//취소버튼 이벤트
	onTapCancel(){
		this.btnDisable = {
			searchBtn 	: false,			//조회
			saveBtn	    : true,				//저장
			modifyBtn	: false,			//수정
			deleteBtn	: true,				//삭제
			newBtn		: false,			//신규
			reqApprBtn	: true,				//승인요청
			apprBtn	    : true,				//승인
			rejectBtn	: true,				//반려
			excelBtn	: false,			//엑셀
			reportBtn	: false,			//출력
			menualBtn	: false,			//메뉴얼
			cancelBtn	: false				//취소
		}
	}

	//저장 버튼 이벤트
	onTapSave(){
		this.comFun.confirm(this.comFun.i18n('저장'), this.comFun.i18n('alertSaveeMsg'), (e)=>{
			//yes or no
			if( e === 'yes' ){
				this.apiHttpServiceImpl.saveForm('/apiUrl...', this.searchModel).subscribe(
					(res: any) => {
						/**
						 * @success
						 */
					},
					(err: HttpErrorResponse) => {
						/**
						 * @error
						 */
						this.comFun.alert(this.comFun.i18n('오류'), this.comFun.i18n('alertErrorMsg'));
					}
				);
			}
		});
	}

	//엑셀 버튼 이벤트
	onTapExcel(){
		this.apiHttpServiceImpl.excelExport('/apiUrl...', this.searchModel).subscribe(
			(res: any) => {
				/**
				 * @success
				 */
			},
			(err: HttpErrorResponse) => {
				/**
				 * @error
				 */
				this.comFun.alert(this.comFun.i18n('오류'), this.comFun.i18n('alertErrorMsg'));
			}
		);
	}

	//레포트 버튼 이벤트
	onTapReport(){

	}

	//메뉴얼 버튼 이벤트
	onTapMenual(){
		this.isMenualDialog = true;
	}

	//메뉴얼 dialog 닫기
	closeMenualDialog(){
		this.isMenualDialog = false;
	}
}