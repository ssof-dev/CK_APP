import { ComConst } from './com.const';

export class ButtonViewManager {
   
    public btnDisable: any;         // 버튼 초기화  true : 비활성, false: 활성 
    public taskMode: any;           // 프로세스 모드 저장
    public beforeTaskMode: any;     // 이전 모드 저장

    public comConst : ComConst;

    public constructor(public paramConst: ComConst) {
        this.btnDisable = {
            searchBtn: false, saveBtn: true, modifyBtn: true, deleteBtn: true, newBtn: false,
            reqApprBtn: true, apprBtn: true, rejectBtn: true, excelImportBtn: false, excelExportBtn: true,
            reportBtn: true, menualBtn: true, cancelBtn: true
        }

        this.comConst = paramConst;
    }

    ChangeViewMode(mode: string) {
        this.beforeTaskMode = this.taskMode;  // 직전 모드 저장
        this.taskMode = mode;

        switch (mode) {
            case this.comConst.BTN_MODE_INIT:   // 초기화
                this.btnDisable = {
                    searchBtn: false, saveBtn: true, modifyBtn: true, deleteBtn: true, newBtn: false,
                    reqApprBtn: true, apprBtn: true, rejectBtn: true, excelImportBtn: false, excelExportBtn: true,
                    reportBtn: true, menualBtn: true, cancelBtn: true
                }
                break;
            case this.comConst.BTN_MODE_SEARCH: // 조회
                this.btnDisable = {
                    searchBtn: false, saveBtn: true, modifyBtn: false, deleteBtn: false, newBtn: false,
                    reqApprBtn: true, apprBtn: true, rejectBtn: true, excelImportBtn: true, excelExportBtn: true,
                    reportBtn: true, menualBtn: true, cancelBtn: false
                }
                break;
            case this.comConst.BTN_MODE_SAVE: // 저장
                this.btnDisable = {
                    searchBtn: false, saveBtn: true, modifyBtn: true, deleteBtn: true, newBtn: false,
                    reqApprBtn: true, apprBtn: true, rejectBtn: true, excelImportBtn: false, excelExportBtn: true,
                    reportBtn: true, menualBtn: true, cancelBtn: true
                }
                break;
            case this.comConst.BTN_MODE_MODIFY: // 수정
                this.btnDisable = {
                    searchBtn: true, saveBtn: false, modifyBtn: true, deleteBtn: false, newBtn: true,
                    reqApprBtn: true, apprBtn: true, rejectBtn: true, excelImportBtn: true, excelExportBtn: true,
                    reportBtn: true, menualBtn: true, cancelBtn: false
                }
                break;
            case this.comConst.BTN_MODE_DELETE: // 삭제
                this.btnDisable = {
                    searchBtn: false, saveBtn: true, modifyBtn: true, deleteBtn: true, newBtn: false,
                    reqApprBtn: true, apprBtn: true, rejectBtn: true, excelImportBtn: false, excelExportBtn: true,
                    reportBtn: true, menualBtn: true, cancelBtn: true
                }
                break;
            case this.comConst.BTN_MODE_NEW: // 신규
                this.btnDisable = {
                    searchBtn: true, saveBtn: false, modifyBtn: true, deleteBtn: true, newBtn: true,
                    reqApprBtn: true, apprBtn: true, rejectBtn: true, excelImportBtn: true, excelExportBtn: true,
                    reportBtn: true, menualBtn: true, cancelBtn: false
                }
                break;
            case this.comConst.BTN_MODE_EXCEL_IMPORT: // 엑셀Import
                this.btnDisable = {
                    searchBtn: true, saveBtn: false, modifyBtn: true, deleteBtn: true, newBtn: true,
                    reqApprBtn: true, apprBtn: true, rejectBtn: true, excelImportBtn: true, excelExportBtn: true,
                    reportBtn: true, menualBtn: true, cancelBtn: false
                }
                break;
            case this.comConst.BTN_MODE_EXCEL_EXPORT: // 취소
                this.btnDisable = {
                    searchBtn: false, saveBtn: true, modifyBtn: true, deleteBtn: true, newBtn: false,
                    reqApprBtn: true, apprBtn: true, rejectBtn: true, excelImportBtn: false, excelExportBtn: true,
                    reportBtn: true, menualBtn: true, cancelBtn: true
                }
                break;
        }
    }

    // 이전모드로 변경
    BeforeMode()
    {
        this.ChangeViewMode(this.beforeTaskMode);
    }
}