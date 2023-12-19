/**
 * @메뉴명      : 
 * @기능        :
 * ===========================================================
 * 생성/수정일 :			    작성자 :         내용 : 
 * ===========================================================
 * 최초생성 : 2021-09-09 13:56:29
 */
declare var Ext: any;
import { Component, OnInit, Input } from '@angular/core';
import { TopGridBottomFormModel } from './model/topGridBottomForm.model';
import { ApiHttpServiceImpl } from '../../../shared/api-http-service-impl';
import { EnvService } from '../../../shared/env.service';
import { ComFunction } from '../../../shared/com.function';
import { ComValidation } from '../../../shared/com.validation';
import { HttpErrorResponse } from '@angular/common/http';
import { ComFormat } from 'src/app/shared/com.format';

@Component({
	selector: 'app-topGridBottomForm',
	templateUrl: './topGridBottomForm.component.html',
	providers: [ApiHttpServiceImpl],
})
export class TopGridBottomFormComponent implements OnInit {

	@Input() public route: any;

	public menualNm = '메뉴얼 PDF파일명';

	public isMenualDialog: boolean = false;	//메뉴얼 팝업창 표시 여부

	public isCodeDisplay: Boolean = false;  //공통코드 다이얼로그 활성유무

	//조회 Model
	public searchModel: TopGridBottomFormModel = <TopGridBottomFormModel>{};

	//form model
	public formModel: TopGridBottomFormModel = <TopGridBottomFormModel>{};

	//Search Form Component 
	public searchFormCmp : any;

	//Form 컴포넌트
	public formPanelCmp : any;

	//ag-grid
	public gridApi: any;
	public gridColumnApi: any;

	//Form Edit 제어
	public isFormEdit : boolean = true;

	//comboBox Store
	public comboStore : any = [
		{comboId: 'combo1', comboNm: 'combo1'},
		{comboId: 'combo2', comboNm: 'combo2'}
	];

	public rowData : any = [];

	//첨부파일 그리드 store
	public fileGridStore = new Ext.data.Store({});

	//신규 추가한 첨부파일 목록
	public fileList = new Array();

	//삭제한 첨부파일 목록
	public delFileList = new Array();

	//버튼 활성여부 제어 true : 비활성, false: 활성 
	public btnDisable = {
		searchBtn 	: false,			//조회
		saveBtn		: true,				//저장
		modifyBtn	: false,			//수정
		deleteBtn	: false,			//삭제
		newBtn		: false,			//신규
		reqApprBtn	: true,				//승인요청	
		apprBtn		: true,				//승인
		rejectBtn	: true,				//반려
		excelBtn	: false,			//엑셀
		reportBtn	: false,			//출력
		menualBtn	: false,			//메뉴얼
		cancelBtn	: false				//취소
	}

	//gr-grid row Id
	public rowId: string;

	public columnDefs = [
		// {
		//     headerName: 'No',
		//     type: 'numericColumn',
		//     sortable: true,
		//     valueGetter: this.comFun.gridRowNo,
		//     rowDrag: true,                                  //행 끌기 첫번째 행에서만 속성 지정
		//     headerCheckboxSelection: true,                  //헤더 체크박스
		//     headerCheckboxSelectionFilteredOnly: true,      //필터링된 항목만 전체 체크
		//     checkboxSelection: true
		// },
		{
			field: 'rowStat',
			headerName: '',
			filter: false,
			width: 30,
			hide: false,
			editable: true,
			cellEditor: 'agSelectCellEditor',
			cellEditorParams: {
				values: ['C', 'R', 'U', 'D'],
			},
			cellRenderer: 'customRowStatRender',
			cellStyle: {textAlign: "center"}
		},
		{
			field: 'storeCd',
			headerName: '점포코드',
			sortable: true,
			filter: true,
			filterParams: {
				buttons: ['apply','reset'],
			},
			rowDrag: true,                                  //행 끌기 첫번째 행에서만 속성 지정
			headerCheckboxSelection: true,                  //헤더 체크박스
			headerCheckboxSelectionFilteredOnly: true,      //필터링된 항목만 전체 체크
			checkboxSelection: true,
		},
		{
			field: 'goodsBarcodeNo',
			headerName: '바코드',
			sortable: true,
			filter: true,
			filterParams: {
				buttons: ['apply','reset'],
			},
		},
		{
			headerName: '매출정보',
			headerGroupComponent: 'customHeaderGroupComponent',
			children:[
				{
					field: 'saleDate',
					headerName: '매출일자',
					sortable: true,
					filter: true,
					filterParams: {
						buttons: ['apply','reset'],
					}
				},
				{
					field: 'saleQty',
					headerName: '매출수량',
					type: 'numericColumn',
					sortable: true,
					filter: true,
					filterParams: {
						buttons: ['apply','reset'],
					},
					editable: true,
					columnGroupShow: 'open',
				},
				{
					field: 'discountAmt',
					headerName: '할인금액',
					type: 'numericColumn',
					sortable: true,
					filter: true,
					filterParams: {
						buttons: ['apply','reset'],
					},
					editable: true,
					columnGroupShow: 'open',
				},
				{
					headerName: '수량+할인금',
					type: 'numericColumn',
					cellClass: 'total-col ag-cal-right',
					valueGetter: (params)=>{
						let saleQty     = Number(params.data.saleQty);
						let discountAmt = Number(params.data.discountAmt);
						let result = saleQty + discountAmt;

						return result;
					},
					columnGroupShow: 'open',
				},
				{
					field: 'netSaleAmt',
					headerName: '매출금액',
					type: 'numericColumn',
					sortable: true,
					filter: true,
					filterParams: {
						buttons: ['apply','reset'],
					},
					columnGroupShow: 'open',
				},
				{
					field: 'saleVat',
					headerName: '부가세',
					type: 'numericColumn',
					sortable: true,
					filter: true,
					filterParams: {
						buttons: ['apply','reset'],
					},
					columnGroupShow: 'open',
				},
				{
					field: 'saleSupply',
					headerName: '공급가',
					type: 'numericColumn',
					sortable: true,
					filter: true,
					filterParams: {
						buttons: ['apply','reset'],
					},
					columnGroupShow: 'open',
				}
			]
		},
		{
			headerName: '반품정보',
			children: [
				{
					field: 'rtnQty',
					headerName: '반품수량',
					type: 'numericColumn',
					sortable: true,
					filter: true,
					filterParams: {
						buttons: ['apply','reset'],
					},
				},
				{
					field: 'rtnAmt',
					headerName: '반품금액',
					type: 'numericColumn',
					sortable: true,
					filter: true,
					filterParams: {
						buttons: ['apply','reset'],
					},
				}
			]
		}
	];
	

	constructor(private apiHttpServiceImpl: ApiHttpServiceImpl, public envService: EnvService, public comFun: ComFunction, public comVal: ComValidation , public comFormat:ComFormat) {
	}

	ngOnInit() {
	}

	//조회 Form 컴포넌트
	onSearchFormReady(event){
		this.searchFormCmp = event.cmp;
	}

	//공통코드 화면 보기
	codeDialog =()=>{
		this.isCodeDisplay = true;
	}

	//공통코드 결과 처리
	resultCodeModel(event){
		this.isCodeDisplay = false; //화면닫기
		if( event !== undefined ){
			//결과처리
		}
	}

	//Form 컴포넌트
	onFormPanelReady(event){
		this.formPanelCmp = event.cmp;
	}

	//날짜 변경 이벤트
	onChangeStartDt(date){
		// if( (typeof date.newDate) == 'object' ){
			// this.comFun.gridColRef(date.newDate, this.gridApi, 'saleDate');
			this.formModel.saleDate = this.comFun.getDateToString(date.newDate);
		// }
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

	//첨부파일 등록
	public onChangeFile(evnet){
		let duplicateFileMsg = '';
		let newFile  = evnet.sender.getFiles();

		//첨부파일 정보 저장
		let fileRows = this.fileGridStore.getData().items;
		for(let i = 0; i < newFile.length; i++){

			let fileNm 		= newFile[i].name;	//파일명
			let fileSize	= newFile[i].size;	//파일크기
			let isDuplicateFile	= false;		//중복파일 유무

			//중복확인
			for( let j = 0; j < this.fileList.length; j++ ){
				//동일한 파일명을 가진 파일이 올라오면 걸러냄
				if( fileNm === this.fileList[j].name){
					isDuplicateFile	 	= true;
					duplicateFileMsg 	+= this.fileList[j].name+'<br>';
					break;
				}
			}

			//신규 파일일때만 처리
			if( isDuplicateFile == false ){
				//파일 배열 추가
				this.fileList = [...this.fileList, newFile[i]];

				//그리드 추가
				fileRows = [...fileRows, {
					fileNm: fileNm,
					saveFileNm: '',
					filePath: '',
					fileSize: fileSize,
					newFile: true
				}];
			}
		}
		this.fileGridStore.setData(fileRows);

		if( !this.comFun.isEmpty(duplicateFileMsg) ){
			this.comFun.alert(this.comFun.i18n('경고'), this.comFun.i18n('alertDuplicateFile')+'<br>'+duplicateFileMsg);
		}
	}

	//첨부파일 받기
	onDownloadFile = (grid, info) =>{
		let row = info.record.data;
		if( row.newFile === true ){
			this.comFun.alert(this.comFun.i18n('경고'), this.comFun.i18n('newFileDownloadErr'));
		}else{
			this.apiHttpServiceImpl.downloadFile(row, (result)=>{
				if(result === 'OK'){
					Ext.toast(this.comFun.i18n('downloadCompletion'));
				}else{
					this.comFun.alert(this.comFun.i18n('오류'), this.comFun.i18n('downloadErr'));
				}
			});
		}
	}

	//첨부파일 삭제
	onTrashFile = (grid, info) =>{
		let items = this.fileGridStore.getData().items;	//그리드 row
		let trashItem = info.record.data;				//삭제할 첨부파일
		this.comFun.confirm(trashItem.fileNm, this.comFun.i18n('alertDeleteFileMsg'), (e)=>{
			//yes or no
			if( e === 'yes' ){
				//첨부파일 삭제 처리
				for( let i = 0; i < items.length; i++ ){
					let item = items[i];
					if( item.id ==  trashItem.id){
						//delFileList에 삭제파일 정보 저장
						this.delFileList = [...this.fileList, items[i]];

						//그리드 및 첨부파일 배열 삭제
						this.fileGridStore.removeAt(i);
						this.fileList.splice(i, 1);

						break;
					}
				}
			}
		});
	}

	//필드별 단축키 설정
	//@yhj-2030330 감리 버그로 주석
	// onShortcutsKeyTextField(event){
	// 	let that = this;
	// 	new Ext.util.KeyMap({
	// 		target: event.cmp.el,
	// 		ctrl:true,
	// 		key: 70,
	// 		handler: ()=>that.codeDialog(),
	// 		scope: 'this'
	// 	});
	// }

	//grid ready
	onReadyGrid(event){
		this.gridApi = event.api;
		this.gridColumnApi = event.columnApi;

		//grid row 생성
		//this.comFun.gridRowCreate(this.gridApi);
		//row 삭제
		//this.comFun.gridRowDelete(this.gridApi);
		//컬럼 자동크기 조정
		//this.comFun.autoSizeColumn(this.gridColumnApi);
	}

	//grid row 이벤트
	agGridRowEvent(params){
		this.rowId = params.node.id; //선택한 row id 저장
		this.formModel = params.data;
	}

	//조회 버튼 이벤트
	onTapQuery(){
		//Form 검증이 정상일때만 서버 통신
		this.gridApi.showLoadingOverlay();
		if( this.searchFormCmp.isValid() === true ){
			this.apiHttpServiceImpl.selectList('/api/access/test2', this.searchModel).subscribe(
				(res: any) => {
					/**
					 * @success
					 */
					this.rowData = res;
					setTimeout(()=>{
						//합계필드 생성
						let columns = ['saleQty', 'totalSaleAmt', 'discountAmt', 'netSaleAmt', 'saleVat', 'saleSupply', 'rtnQty', 'rtnAmt'];
						let footerData = this.comFun.gridBottomSumRow(this.gridApi, this.gridColumnApi, columns);
						this.gridApi.setPinnedBottomRowData([footerData]);
						this.gridApi.hideOverlay();
					}, 0);
				},
				(err: HttpErrorResponse) => {
					/**
					 * @error
					 */
					this.comFun.alert(this.comFun.i18n('오류'), this.comFun.i18n('alertErrorMsg'), null);
					this.gridApi.hideOverlay();
					
				}
			);
		}else{
			this.comFun.alert(this.comFun.i18n('경고'), this.comFun.i18n('alertFormValidateMsg'), null);
		}
	}

	//수정 버튼 이벤트
	onTapModify(){
		this.isFormEdit = false;
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
				this.apiHttpServiceImpl.deleteForm('/apiUrl...', this.formModel).subscribe(
					(res: any) => {
						/**
						 * @success
						 */
					},
					(err: HttpErrorResponse) => {
						/**
						 * @error
						 */
						this.comFun.alert(this.comFun.i18n('오류'), this.comFun.i18n('alertErrorMsg'), null);
					}
				);
			}
		});
	}

	//신규 버튼 이벤트
	onTapNew(){
		this.formModel = <TopGridBottomFormModel>{};
		this.isFormEdit = false;

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
		this.formModel = <TopGridBottomFormModel>{};
		this.isFormEdit = true;
		this.btnDisable = {
			searchBtn 	: false,			//조회
			saveBtn	    : true,				//저장
			modifyBtn	: false,			//수정
			deleteBtn	: false,			//삭제
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
		
		//Form 검증이 정상일때만 서버 통신
		if( this.formPanelCmp.isValid() === true ){
			this.comFun.confirm(this.comFun.i18n('저장'), this.comFun.i18n('alertSaveeMsg'), (e)=>{
				//yes or no
				if( e === 'yes' ){
					this.apiHttpServiceImpl.saveGridForm('/api/example/saveGridForm', this.gridApi).subscribe(
						(res: any) => {
							/**
							 * @success
							 */
						},
						(err: HttpErrorResponse) => {
							/**
							 * @error
							 */
							this.comFun.alert(this.comFun.i18n('오류'), this.comFun.i18n('alertErrorMsg'), null);
						}
					);
				}
			});
		}else{
			this.comFun.alert(this.comFun.i18n('경고'), this.comFun.i18n('alertFormValidateMsg'), null);
		}
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
				this.comFun.alert(this.comFun.i18n('오류'), this.comFun.i18n('alertErrorMsg'), null);
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