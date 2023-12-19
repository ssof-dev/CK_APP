/**
 * @메뉴명 	    : 
 * @기능		:
 * ===========================================================
 * 생성/수정일 					작성자 		비고 
 * -----------------------------------------------------------
 * 									                        
 */

declare var Ext: any;
import { Component, OnInit, Input } from '@angular/core';
import { CenterFormModel } from './model/centerForm.model';
import { ApiHttpServiceImpl } from '../../../shared/api-http-service-impl';
import { EnvService } from '../../../shared/env.service';
import { ComFunction } from '../../../shared/com.function';
import { ComValidation } from '../../../shared/com.validation';
import { HttpErrorResponse } from '@angular/common/http';
import { IndexComponent } from 'src/app/index/index.component';

import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
    selector: 'app-centerForm',
    templateUrl: './centerForm.component.html',
    providers: [ApiHttpServiceImpl],
})
export class CenterFormComponent implements OnInit {

    @Input() public route: any;

    public menualNm = '메뉴얼 PDF파일명';

    public isMenualDialog: boolean = false;	//메뉴얼 팝업창 표시 여부

    //조회 Model
    public searchModel: CenterFormModel = <CenterFormModel>{};

    //form model
    public formModel: CenterFormModel = <CenterFormModel>{};

    //Form 컴포넌트
    public FormPanelCmp : any;

    //Search Form Component 
    public searchFormCmp : any;

    //Form Edit 제어
    public isFormEdit : boolean = true;

    //텍스트 에디터 설정정보
    public editorConfig: AngularEditorConfig = <AngularEditorConfig>{};

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

    //콤보박스 데이터 (예제)
    public comboStore : any = [
        {comboId: 'combo1', comboNm: 'combo1'},
        {comboId: 'combo2', comboNm: 'combo2'}
    ];

    constructor(private apiHttpServiceImpl: ApiHttpServiceImpl, 
                public envService: EnvService, 
                public comFun: ComFunction, 
                public comVal: ComValidation,
                public indexCmp: IndexComponent) {}
                
    ngOnInit() { 
        console.log( this.indexCmp );
        console.log( this.indexCmp.codeParamModel );

        //텍스트 에디터 설정값
        this.editorConfig = this.envService.editorConfig;
    }

    //조회 Form 컴포넌트
    onSearchFormReady(event){
        this.searchFormCmp = event.cmp;
    }

    // //공통코드 dilalog 호출
    // codeDialog = () =>{
    //     console.log(this.indexCmp);
    //     let param = this.indexCmp.codeParamModel;
    //     this.indexCmp.codeDialogView(param, (result)=>{
    //         //결과처리
    //         console.log(result);
    //     });
    // }

    //Form 컴포넌트
    onFormPanelReady(event){
        this.FormPanelCmp = event.cmp;
    }
        
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

                this.apiHttpServiceImpl.excelImport('/api/TaskFrc/FrcMgt/excelImport', this.formModel, this.fileList[0]).subscribe(
                    (res: any) => {
                        /**
                         * @success
                         */
                        console.log(res);
                    },
                    (err: HttpErrorResponse) => {
                        /**
                         * @error
                         */
                        this.comFun.alert(this.comFun.i18n('오류'), this.comFun.i18n('alertErrorMsg'));
                    }
                );
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
    //     let that = this;
    //     new Ext.util.KeyMap({
    //         target: event.cmp.el,
    //         ctrl:true,
	// 		key: 70,
    //         // handler: ()=>that.codeDialog(),
    //         scope: 'this'
    //     });
    // }

    //조회 버튼 이벤트
    onTapQuery(){
        //Form 검증이 정상일때만 서버 통신
        if( this.searchFormCmp.isValid() === true ){
            this.apiHttpServiceImpl.selectOne('/apiUrl...', this.searchModel).subscribe(
                (res: any) => {
                    /**
                     * @success
                     */
                    this.formModel = res;
                },
                (err: HttpErrorResponse) => {
                    /**
                     * @error
                     */
                    this.comFun.alert(this.comFun.i18n('오류'), this.comFun.i18n('alertErrorMsg'));
                }
            );
        }else{
            this.comFun.alert(this.comFun.i18n('경고'), this.comFun.i18n('alertFormValidateMsg'));
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
                        this.comFun.alert(this.comFun.i18n('오류'), this.comFun.i18n('alertErrorMsg'));
                    }
                );
            }
        });
    }

    //신규 버튼 이벤트
    onTapNew(){
        this.formModel = <CenterFormModel>{};
        this.isFormEdit = false;
        this.editorConfig.showToolbar = true;
        this.editorConfig.editable = true;

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
        this.formModel = <CenterFormModel>{};
        this.isFormEdit = true;
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
        //Form 검증이 정상일때만 서버 통신
        if( this.FormPanelCmp.isValid() === true ){
            this.comFun.confirm(this.comFun.i18n('저장'), this.comFun.i18n('alertSaveeMsg'), (e)=>{
                //yes or no
                if( e === 'yes' ){
                    this.apiHttpServiceImpl.saveFormFile('/apiUrl...', this.formModel, this.fileList).subscribe(
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
        }else{
            this.comFun.alert(this.comFun.i18n('경고'), this.comFun.i18n('alertFormValidateMsg'));;
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
                this.comFun.alert(this.comFun.i18n('오류'), this.comFun.i18n('alertErrorMsg'));
            }
        );
    }

    //레포트 버튼 이벤트
    onTapReport(){

    }

    //도움말 버튼 이벤트
    onTapMenual(){
        this.isMenualDialog = true;
    }

    //메뉴얼 dialog 닫기
    closeMenualDialog(){
        this.isMenualDialog = false;
    }
}