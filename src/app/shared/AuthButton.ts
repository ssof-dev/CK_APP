import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ComAlert } from "./com.alert";

export class AuthButtonDisabledModel{

    searchBtn: boolean = false;     //조회
    newBtn: boolean = true;         //신규
    editBtn: boolean = true;        //수정
    saveBtn: boolean = true;        //저장
    deleteBtn: boolean = true;      //삭제
    requestBtn: boolean = true;     //승인요청
    approvalBtn: boolean = true;    //승인
    deniedBtn: boolean = true;      //반려
    excelBtn: boolean = true;       //엑셀
    pdfBtn: boolean = true;         //PDF
    cancelBtn: boolean = false;     //취소
}

@Component({
    selector : 'AuthButton'
,   template : `
        <ExtToolbar [docked]="'top'" [shadow]="false" [layout]="{ type: 'hbox', pack: 'right' }" class="title-toolbar">
            <ExtButton  [disabled]="this._authButtonDisabled.searchBtn" [align]="'right'" [ui]="'round'" iconCls="x-fa fa-search"
                (tap)="btnEventAuth('SEARCH', onTapQuery)"  text="{{ '조회' | translate }}" >
            </ExtButton>
            
            <ExtButton [disabled]="this._authButtonDisabled.newBtn" [align]="'right'" [ui]="'round'" iconCls="x-fa fa-folder-plus"
                (tap)="btnEventAuth('NEW', onTapNew)" text="{{ '신규' | translate }}" >
            </ExtButton>

            <ExtButton [disabled]="this._authButtonDisabled.editBtn" [align]="'right'" [ui]="'round'" iconCls="x-fa fa-edit"
                (tap)="btnEventAuth('EDIT', onTapEdit)" text="{{ '수정' | translate }}" >
            </ExtButton>
        
            <ExtButton [disabled]="this._authButtonDisabled.saveBtn" [align]="'right'" [ui]="'round'" iconCls="x-fa fa-save"
                (tap)="btnEventAuth('SAVE', onTapSave)" text="{{ '저장' | translate }}" >
            </ExtButton>

            <ExtButton [disabled]="this._authButtonDisabled.deleteBtn" [align]="'right'" [ui]="'round'" iconCls="x-fa fa-trash-alt"
                (tap)="btnEventAuth('DELETE', onTapDelete)" text="{{ '삭제' | translate }}" >
            </ExtButton>

            <ExtButton [disabled]="this._authButtonDisabled.requestBtn" [align]="'right'" [ui]="'round'" iconCls="x-fa fa-clipboard-list"
                (tap)="btnEventAuth('REQUEST', onTapRequest)" text="{{ '승인요청' | translate }}" >
            </ExtButton>

            <ExtButton [disabled]="this._authButtonDisabled.approvalBtn" [align]="'right'" [ui]="'round'" iconCls="x-fa fa-check-double"
                (tap)="btnEventAuth('APPROVAL', onTapApproval)" text="{{ '승인' | translate }}">
            </ExtButton>

            <ExtButton [disabled]="this._authButtonDisabled.deniedBtn" [align]="'right'" [ui]="'round'" iconCls="x-fa fa-rotate-left"
                (tap)="btnEventAuth('DENIED', onTapDenied)" text="{{ '반려' | translate }}">
            </ExtButton>

            <ExtButton [disabled]="this._authButtonDisabled.excelBtn" [align]="'right'" [ui]="'round'" iconCls="x-fa fa-file-excel"
                (tap)="btnEventAuth('EXCEL', onExportExcel)" text="{{ '엑셀' | translate }}">
            </ExtButton>

            <ExtButton [disabled]="this._authButtonDisabled.pdfBtn" [align]="'right'" [ui]="'round'" iconCls="x-fa fa-file-pdf"
                (tap)="btnEventAuth('PDF', onExportPdf)" text="{{ 'PDF' | translate }}">
            </ExtButton>

            <ExtButton [disabled]="this._authButtonDisabled.cancelBtn" [align]="'right'" [ui]="'round'" iconCls="x-fa fa-times"
                (tap)="btnEventAuth('CANCEL', onTapCancel)" text="{{ '취소' | translate }}">
            </ExtButton>
        </ExtToolbar>
    `
})
export class AuthButton{

    //alert
    private comAlert: ComAlert = new ComAlert();

    @Input() route: any;    //액티브 상태인 메뉴 정보

    //버튼 활성화 제어
    _authButtonDisabled: AuthButtonDisabledModel = new AuthButtonDisabledModel();
    @Input() 
    set authButtonDisabled( param: AuthButtonDisabledModel ){
        this._authButtonDisabled = param;
    }
    get authButtonDisabled(){
        return this._authButtonDisabled
    }

    @Output() onTapQuery: EventEmitter<boolean> = new EventEmitter<boolean>();      //조회버튼 이벤트 내보내기
    @Output() onTapNew: EventEmitter<boolean> = new EventEmitter<boolean>();        //신규버튼 이벤트 내보내기
    @Output() onTapEdit: EventEmitter<boolean> = new EventEmitter<boolean>();       //수정버튼 이벤트 내보내기
    @Output() onTapSave: EventEmitter<boolean> = new EventEmitter<boolean>();       //저장버튼 이벤트 내보내기
    @Output() onTapDelete: EventEmitter<boolean> = new EventEmitter<boolean>();     //삭제버튼 이벤트 내보내기
    @Output() onTapRequest: EventEmitter<boolean> = new EventEmitter<boolean>();    //승인요청버튼 이벤트 내보내기
    @Output() onTapApproval: EventEmitter<boolean> = new EventEmitter<boolean>();   //승인버튼 이벤트 내보내기
    @Output() onTapDenied: EventEmitter<boolean> = new EventEmitter<boolean>();     //반려버튼 이벤트 내보내기
    @Output() onExportExcel: EventEmitter<boolean> = new EventEmitter<boolean>();   //엑셀버튼 이벤트 내보내기
    @Output() onExportPdf: EventEmitter<boolean> = new EventEmitter<boolean>();     //PDF버튼 이벤트 내보내기
    @Output() onTapCancel: EventEmitter<boolean> = new EventEmitter<boolean>();     //취소버튼 이벤트 내보내기

    //버튼별 이벤트 권한 확인
    btnEventAuth(btnDiv: string, event: EventEmitter<boolean> ){

        console.log(this.route)

        let saveAuth = 'saveAuth' in this.route ? this.route.saveAuth : 'N';    //저장(신규, 수정, 삭제)권한
        let exclAuth = 'exclAuth' in this.route ? this.route.exclAuth : 'N';    //엑셀권한
        let prntAuth = 'prntAuth' in this.route ? this.route.prntAuth : 'N';    //출력(PDF)권한

        //버튼 권한 확인
        if( btnDiv === 'NEW' || btnDiv === 'EDIT' || btnDiv === 'SAVE' || btnDiv === 'SEARCH' ){
            //신규, 수정, 저장, 삭제 버튼 이벤트일때 권한 확인
            if( saveAuth === 'Y' ){
                //이벤트 내보내기
                event.emit();

            }else{
                let messageDiv = btnDiv === 'SAVE' ? '저장' : btnDiv === 'NEW' ? '신규등록' : btnDiv === 'EDIT' ? '수정' : '삭제';
                this.comAlert.showAlert('error', '', `${messageDiv} 권한이 없습니다.`, false);
            }
        }else if( btnDiv === 'EXCEL'){
            //엑셀 내보내기 권한
            if( exclAuth === 'Y' ){
                //이벤트 내보내기
                event.emit();

            }else{
                this.comAlert.showAlert('error', '', '엑셀출력 권한이 없습니다.', false);
            }
        }else if( btnDiv === 'PDF'){
            //PDF 내보내기 권한
            if( prntAuth === 'Y' ){
                //이벤트 내보내기
                event.emit();

            }else{
                this.comAlert.showAlert('error', '', '출력 권한이 없습니다.', false);
            }
        }else{

            //그외 버튼은 검증없이 이벤트 내보냄
            event.emit();
        }

    }

    /**
     * 그리드 Row 선택했을때 버튼 제어
     */
    gridRowClickBtnDisableControll(){

        //승인요청, 승인, 반려는 각 화면에서 개별 제어
        this._authButtonDisabled.searchBtn      = false;     //조회
        this._authButtonDisabled.newBtn         = false;     //신규
        this._authButtonDisabled.editBtn        = false;     //수정
        this._authButtonDisabled.saveBtn        = true;      //저장
        this._authButtonDisabled.deleteBtn      = false;     //삭제
        this._authButtonDisabled.excelBtn       = false;     //엑셀
        this._authButtonDisabled.pdfBtn         = false;     //PDF
        this._authButtonDisabled.cancelBtn      = false;     //취소
    }

    /**
     * 그리드 Row 선택했을 때 버튼 제어
     */
    gridClickBtnDisableControll(){

        //신규, 수정, 삭제, 엑셀, PDF 버튼 활성화
        //조회 비활성화
        this._authButtonDisabled.searchBtn      = true;      //조회
        this._authButtonDisabled.newBtn         = false;     //신규
        this._authButtonDisabled.editBtn        = false;     //수정
        this._authButtonDisabled.saveBtn        = true;      //저장
        this._authButtonDisabled.deleteBtn      = false;     //삭제
        this._authButtonDisabled.excelBtn       = false;     //엑셀
        this._authButtonDisabled.pdfBtn         = false;     //PDF
    }

    /**
     * 모든 버튼 비활
     */
    allKillBtnControll(){
        
        //취소 버튼제외 모두 비활
        this._authButtonDisabled.searchBtn  = true;     //조회
        this._authButtonDisabled.newBtn     = true;     //신규
        this._authButtonDisabled.editBtn    = true;     //수정
        this._authButtonDisabled.saveBtn    = true;     //저장
        this._authButtonDisabled.deleteBtn  = true;     //삭제
        this._authButtonDisabled.excelBtn   = true;     //엑셀
        this._authButtonDisabled.approvalBtn= true;     //승인
        this._authButtonDisabled.deniedBtn  = true;     //반려
        this._authButtonDisabled.excelBtn   = true;     //엑셀
        this._authButtonDisabled.pdfBtn     = true;     //PDF
    }
}