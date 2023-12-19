/**
* ===========================================================
* 생성/수정일 					작성자          내용
* ===========================================================
* 2021-08-20 15:30:15                         최초생성
*/
declare var Ext: any;
import { Component, OnInit, Input } from '@angular/core';
import { TopFormBottomGridModel } from './model/topFormBottomGrid.model';
import { ApiHttpServiceImpl } from '../../../shared/api-http-service-impl';
import { HttpErrorResponse } from '@angular/common/http';
import { EnvService } from '../../../shared/env.service';
import { ComFunction } from '../../../shared/com.function';
import { ComValidation } from '../../../shared/com.validation';
import { IndexComponent } from 'src/app/index/index.component';

@Component({
	selector: 'app-topFormBottomGrid',
	templateUrl: './topFormBottomGrid.component.html',
	providers: [ApiHttpServiceImpl],
})
export class TopFormBottomGridComponent implements OnInit {

	@Input() public route: any;

	public menualNm = '메뉴얼 PDF파일명';

	public isMenualDialog: boolean = false;	//메뉴얼 팝업창 표시 여부

	//조회 Model
	public searchModel: TopFormBottomGridModel = <TopFormBottomGridModel>{};

	//form model
	public formModel: TopFormBottomGridModel = <TopFormBottomGridModel>{};

	//Search Form Component 
	public searchFormCmp : any;

	//Form 컴포넌트
	public formPanelCmp : any;

	//Grid 컴포넌트
	public gridCmp: any;

	//Grid Store
	public gridStore = new Ext.data.Store({});

	//Form Edit 제어
	public isFormEdit : boolean = true;

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

	constructor(private apiHttpServiceImpl: ApiHttpServiceImpl,
				public envService: EnvService,
				public comFun: ComFunction, 
				public comVal: ComValidation,
               	public indexCmp: IndexComponent) {}

	ngOnInit() {
	}

	//조회 Form 컴포넌트
	onSearchFormReady(event){
		this.searchFormCmp = event.cmp;
	}

	// //공통코드 dilalog 호출
	// codeDialog(){
	// 	let param = this.indexCmp.codeParamModel;
	// 	this.indexCmp.codeDialogView(param, (result)=>{
	// 		//결과처리
	// 		console.log(result);
	// 	});
	// }

	//필드별 단축키 설정
	//@yhj-2030330 감리 버그로 주석
    // onShortcutsKeyTextField(event){
    //     let that = this;
    //     new Ext.util.KeyMap({
    //         target: event.cmp.el,
    //         ctrl: true,
    //         key: 70,
    //         // handler: function(e){
    //         //     that.codeDialog();
    //         // },
    //         scope: 'this'
    //     });
    // }

	//Form 컴포넌트
	onFormPanelReady(event){
		this.formPanelCmp = event.cmp;
	}

	//날짜 변경 이벤트
	onChangeStartDt(date){
		this.searchModel.startDt = this.comFun.getDateToString(date.newDate);
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

	//grid ready
	onReadyGrid(event){
		this.gridCmp = event.cmp;
	}

	//grid row 선택 이벤트
	onSelectGrid(row){
		//row 데이터 model 바인딩
		this.formModel = row.selected[0].data;
	}

	//조회 버튼 이벤트
	onTapQuery(){
		//Form 검증이 정상일때만 서버 통신
		if( this.searchFormCmp.isValid() === true ){
			this.gridCmp.setMasked({
				xtype: 'loadmask',
				message: 'Loading...'
			});
			this.apiHttpServiceImpl.selectList('/apiUrl...', this.searchModel).subscribe(
				(res: any) => {
					/**
				 	 * @success
				 	 */
					if( res.length > 0 ){
						this.gridStore.setData(res);
					} 
					this.gridCmp.setMasked(false);
				},
				(err: HttpErrorResponse) => {
					/**
				 	 * @error
				 	 */
					this.comFun.alert(this.comFun.i18n('오류'), this.comFun.i18n('alertErrorMsg'), null);
					this.gridCmp.setMasked(false);
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
		this.formModel = <TopFormBottomGridModel>{};
		this.isFormEdit = false;

		this.btnDisable.searchBtn	= true;
        this.btnDisable.newBtn 		= true;
        this.btnDisable.modifyBtn 	= true;
        this.btnDisable.saveBtn 	= false;
	}

	//저장 버튼 이벤트
	onTapSave(){

		//Form 검증이 정상일때만 서버 통신
		if( this.formPanelCmp.isValid() === true ){
			this.comFun.confirm(this.comFun.i18n('저장'), this.comFun.i18n('alertSaveeMsg'), (e)=>{
				//yes or no
				if( e === 'yes' ){
					this.apiHttpServiceImpl.saveForm('/apiUrl...', this.formModel).subscribe(
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
			this.comFun.alert(this.comFun.i18n('경고'), this.comFun.i18n('alertFormValidateMsg'), null);;
		}
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