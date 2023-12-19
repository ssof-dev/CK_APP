/**
 * @메뉴명      : 
 * @기능        :
 * ===========================================================
 * 생성/수정일 :			    작성자 :         내용 : 
 * ===========================================================
 * 최초생성 : 2021-10-26 11:20:51
 */
declare var Ext: any;
import { Component, OnInit, Input } from '@angular/core';
import { ApiHttpServiceImpl } from '../../../shared/api-http-service-impl';
import { EnvService } from '../../../shared/env.service';
import { ComFunction } from '../../../shared/com.function';
import { ComValidation } from '../../../shared/com.validation';
import { HttpErrorResponse } from '@angular/common/http';
import { IndexComponent } from 'src/app/index/index.component';
import { ComConst } from '../../../shared/com.const';

import { AngularEditorConfig } from '@kolkov/angular-editor';

import { GridMain } from './grid/GridMain';
import { GridFile } from './grid/GridFile';
import { GPassTaskFileModel } from './model/GPassTaskFile.model';
import { GPassNoticeMgtModel } from '../GPassNoticeMgt/model/GPassNoticeMgt.model';
import { ComFormat } from 'src/app/shared/com.format';
import { ButtonViewManager } from 'src/app/shared/buttonViewManager';

@Component({
    selector: 'app-GPassNoticeMgt',
    templateUrl: './GPassNoticeMgt.component.html',
    providers: [ApiHttpServiceImpl],
})
export class GPassNoticeMgtcomponent implements OnInit {

    @Input() public route: any;

    // ****************************
    // Base
    public searchFormCmp: any;     // Search Form Component
    public filefieldCmp: any;       // 첨부파일 Component
    // ****************************

    // ****************************
    // Model
    public searchModel: GPassNoticeMgtModel = <GPassNoticeMgtModel>{};  // search Model
    public formModel: GPassNoticeMgtModel = <GPassNoticeMgtModel>{};    // form model
    // ****************************

    // ****************************
    // Grid
    public gridMain: GridMain = new GridMain(this.comFun, this.comFormat);
    public gridFile: GridFile = new GridFile(this.comFun, this.comFormat);
    // ****************************

    // ****************************
    // Business
    public btnViewMgr: ButtonViewManager = new ButtonViewManager(this.comConst);	// 화면제어
    public editorConfig: AngularEditorConfig = <AngularEditorConfig>{}; // 텍스트 에디터
    public subFileList = new Array();       // 첨부파일 관리 모델
    public subFileDataList = new Array();   // 첨부파일 (실제 파일)
    // ****************************

    // ****************************
    // cbs(comboBox Store)
    public type: any = [
        { comboId: '1', comboNm: '공지사항' },
        { comboId: '2', comboNm: '자료실' }
    ];

    public cbSNoticeType: any = [
        { comboId: 'A', comboNm: '전체' },
        { comboId: '1', comboNm: '공단' },
        { comboId: '2', comboNm: '지자체' },
        { comboId: '3', comboNm: '지방청' },
        { comboId: '4', comboNm: '상인회' },
        { comboId: '5', comboNm: '가맹점' },
        { comboId: '6', comboNm: '일반' }
    ];
    // ****************************

    // ****************************
    // 기초변수
    // Edit (disable)
    public isEditForm: boolean = true;      //Form Edit 제어
    public isEditSearch: boolean = false;   // select Field Edit 제어

    // required (필수값)
    // ****************************

    constructor(
        private apiHttpServiceImpl: ApiHttpServiceImpl,
        public envService: EnvService,
        public comFun: ComFunction,
        public comVal: ComValidation,
        public indexCmp: IndexComponent,
        public comConst: ComConst,
        public comFormat: ComFormat
    ) { }

    //*******************************************************[INIT]>>>
    // Init
    ngOnInit() {
        //https://www.npmjs.com/package/@kolkov/angular-editor 참조
        this.editorConfig = {
            editable: false,					//편집여부
            spellcheck: false,					//맞춤법 검사
            height: '400px',					//높이
            minHeight: '5rem',					//최소높이
            placeholder: 'Enter text here...',
            translate: 'no',					//번역사용
            defaultParagraphSeparator: 'p',		//단락 구분기호
            defaultFontName: 'Arial',
            toolbarHiddenButtons: [				//숨길 툴바버튼(배열)
                ['fontName'],
                ['link', 'unlink']
            ],
            toolbarPosition: 'top',				//툴바위치(top, bottom)
            showToolbar: false,					//툴바표시
            uploadUrl: `${this.envService.getServerUrl()}/api/comm/editUploadImage`,		//이미지 업로드시 처리할 서버 api 주소
        };

        // 화면 버튼 모드 설정
        this.btnViewMgr.ChangeViewMode(this.comConst.BTN_MODE_INIT);
    }

    // Search Panel Component
    onSearchFormReady(event) {
        this.searchFormCmp = event.cmp;
    }
    //*******************************************************[INIT]<<<


    //*******************************************************[EVENT]>>>
    // [BUTTON]
    // 조회 버튼 이벤트
    onTapQuery() {
        // 조회 통신
        this.apiSelectList();

        // Field 활성화
        this.isEditForm = true;

        // EditerBox 활성화
        this.editorConfig.showToolbar = false;
        this.editorConfig.editable = false;
    }

    // 저장 버튼
    onTapSave() {
        if (this.comFun.isEmpty(this.formModel.type)) {
            this.comFun.alert(this.comFun.i18n('확인'), '구분을 선택해 주세요.')
            return;
        }

        if (this.comFun.isEmpty(this.formModel.title)) {
            this.comFun.alert(this.comFun.i18n('확인'), '타이틀을 입력해 주세요.');
            return;
        }

        if (this.comFun.isEmpty(this.formModel.post)) {
            this.comFun.alert(this.comFun.i18n('확인'), '내용을 입력해 주세요.');
            return;
        }

        // 화면 버튼 모드 설정
        this.btnViewMgr.ChangeViewMode(this.comConst.BTN_MODE_SAVE);

        //********************************** >>>
        let mds = Array();
        let md = this.formModel;

        // 첨부파일  리스트 저장
        if (this.subFileList.length > 0) {
            md.taskFileModel = new Array<GPassTaskFileModel>();
            this.subFileList.forEach(element => {
                md.taskFileModel.push(element);
            });
        }

        // 모델 저장
        mds.push(md);
        //********************************** <<<

        this.comFun.confirm(this.comFun.i18n('저장'), this.comFun.i18n('alertSaveeMsg'), (e) => {
            //yes or no
            if (e === 'yes') {
                // 저장 후 조회
                this.apiSaveFormFile(mds);
            }
            else {
                this.btnViewMgr.BeforeMode();
            }
        });
    }

    // 수정 버튼
    onTapModify() {
        let isFileDataId = this.formModel.id || false;
        if (!isFileDataId) {
            this.comFun.alert(this.comFun.i18n('확인'), "수정할 글을 선택해 주세요.");
            return;
        }

        this.btnViewMgr.ChangeViewMode(this.comConst.BTN_MODE_MODIFY);

        // 입력필드 활성화
        this.subFileList = new Array();
        this.isEditForm = false;
        this.editorConfig.showToolbar = true;
        this.editorConfig.editable = true;
    }

    // 삭제 버튼
    onTapDelete() {
        let isFileDataId = this.formModel.id || false;
        if (!isFileDataId) {
            this.comFun.alert(this.comFun.i18n('확인'), "삭제할 글을 선택해 주세요.");
            return;
        }
        
        this.comFun.confirm(this.comFun.i18n('삭제'), this.comFun.i18n('alertDeleteMsg'), (e) => {
            //yes or no
            if (e === 'yes') {
                // 모드 저장
                this.btnViewMgr.ChangeViewMode(this.comConst.BTN_MODE_DELETE);
                // 삭제
                this.apiDeleteFileDataMgt();
            }
        });
    }

    // 신규 버튼
    onTapNew() {
        this.isEditForm = false;
        this.editorConfig.showToolbar = true;
        this.editorConfig.editable = true;
        this.subFileList = new Array();
        this.formModel = <GPassNoticeMgtModel>{};
        this.gridFile.rowData = [];

        this.btnViewMgr.ChangeViewMode(this.comConst.BTN_MODE_NEW);
    }

    // 취소 버튼
    onTapCancel() {
        if (this.btnViewMgr.taskMode === this.comConst.BTN_MODE_NEW || this.btnViewMgr.taskMode === this.comConst.BTN_MODE_MODIFY) {
            const rowData = [];

            this.gridMain.gridApi.forEachNode(node => rowData.push(node.data));

            if (rowData.length > 0) {
                this.btnViewMgr.ChangeViewMode(this.comConst.BTN_MODE_SEARCH);
                this.editorConfig.editable = false;
                this.editorConfig.showToolbar = false;
                this.funcFieldClear("F");	// 필드 초기화
            } else {
                this.btnViewMgr.ChangeViewMode(this.comConst.BTN_MODE_INIT);
                this.editorConfig.editable = false;
                this.editorConfig.showToolbar = false;
                this.funcFieldClear("ALL");	// 필드 초기화
            }
        }
        else {
            this.btnViewMgr.ChangeViewMode(this.comConst.BTN_MODE_INIT);
            this.editorConfig.editable = false;
            this.editorConfig.showToolbar = false;
            this.funcFieldClear("ALL");	// 필드 초기화
        }
    }

    // [COMBO BOX]

    // [첨부파일]
    // 첨부파일 등록 버튼
    onChangeFile(evnet) {
        let newFile = evnet.sender.getFiles();

        //첨부파일 정보 저장
        for (let i = 0; i < newFile.length; i++) {
            let fileNm = newFile[i].name;	//파일명
            let fileSize = newFile[i].size;	//파일크기

            //****************************************************************
            // 파일 유효성검사
            // 엑셀 입력 : 파일 유효성 검사
            // 일반 입력 : 검사 X

            //@yhj20220819 파일명 길이제한
			const maxByte = 100; //최대 100바이트
            const text_val = fileNm; //파일명(확장자명 포함)
            const text_len = text_val.length; //파일명 글자수(확장자명 포함)

            let totalByte=0;

            for(let i=0; i<text_len; i++){

                const each_char = text_val.charAt(i); //한글자씩 자르기

                const uni_char = escape(each_char); //유니코드 형식으로 변환해서 한글체크

                // 4이상이면 한글임
                if(uni_char.length>4){
                    // 한글 : 3Byte  +
                    totalByte += 3;
                }else{
                    // 영문,숫자,특수문자 : 1Byte +
                    totalByte += 1;
                }
            }

            if(totalByte > maxByte){
                this.comFun.alert(this.comFun.i18n('오류'), "파일명(한글) 30글자 이상 등록 불가.");
                this.filefieldCmp.reset();  // 파일정보 리셋
                break;
            }
            
            // 최대용량제한
            if(fileSize > 10000000)
            {
                this.comFun.alert(this.comFun.i18n('오류'), "최대저장 용량 10Mb 이상 저장할 수 없습니다.");
                this.filefieldCmp.reset();  // 파일정보 리셋
                break;
            }
            
            if (this.btnViewMgr.taskMode !== this.comConst.BTN_MODE_NEW && this.btnViewMgr.taskMode !== this.comConst.BTN_MODE_MODIFY && this.btnViewMgr.taskMode !== this.comConst.BTN_MODE_EXCEL_IMPORT) {
                this.filefieldCmp.reset();  // 파일정보 리셋
                break;
            }
            //****************************************************************

            // 첨부파일 중복검사
            if (this.funcDupFile(this.subFileList, newFile[i].name) === false) {
                // 중복이 아닐경우

                // 1. subFileList 관리 리스트 추가
                var taskFileModel = new GPassTaskFileModel();
                taskFileModel.accCd = 'NOTICE_MGT';
                taskFileModel.accKey = this.formModel.id;
                taskFileModel.fileNm = newFile[i].name;
                taskFileModel.useYn = 'Y';

                // 첨부파일 관리 List 저장
                this.subFileList.push(taskFileModel);

                // 실제 첨부파일 List 저장
                this.subFileDataList.push(newFile[i]);

                // 2. grid row 추가
                this.comFun.gridRowCreate(this.gridFile.gridApi, taskFileModel);
            }
            else {
                this.comFun.alert(this.comFun.i18n('확인'), this.comFun.i18n('alertDuplicateFile') + '<br>' + taskFileModel.fileNm);
            }
        }

        this.filefieldCmp.reset();
    }
    //*******************************************************[EVENT]<<<

    //*******************************************************[GRID]>>>
    // Main Grid [초기화]
    onReadyGrid(event) {
        this.gridMain.gridApi = event.api;
        this.gridMain.gridColumnApi = event.columnApi;
        
        // 조회
        this.onTapQuery();
    }

    // Main Grid [Click]
    rowClickEventGrid(event) {
        if (!this.isEditForm) {
            this.comFun.alert(this.comFun.i18n('확인'), "작성중인 글이 있습니다.");
            return;
        }

        // 참조값 끊어버리기(참조값을 끊지 않으면 본문내용이 그대로 남아있음)
        this.formModel = JSON.parse(JSON.stringify(event.data));

        // 첨부파일 조회
        this.apiSelectTaskFile(event.data.id);
    }

    // 첨부파일 Grid [초기화]
    onReadyGridFile(event) {
        this.gridFile.gridApi = event.api;
        this.gridFile.gridColumnApi = event.columnApi;
    }

    // 첨부파일 Grid [Cell Click]
    cellClickEventGridFile(event) {
        switch (event.column.getColId()) {
            case 'delete':
                if (this.btnViewMgr.taskMode === this.comConst.BTN_MODE_NEW || this.btnViewMgr.taskMode === this.comConst.BTN_MODE_MODIFY) {
                    this.comFun.confirm(this.comFun.i18n('삭제'), this.comFun.i18n('alertDeleteMsg'), (e) => {
                        //yes or no
                        if (e === 'yes') {
                            // @첨부파일
                            if (this.funcDupFile(this.subFileList, event.data.fileNm) === false) {
                                // 중복이 아닐경우 row Update (use_yn = 'N')
                                var taskFileModel = new GPassTaskFileModel();
                                taskFileModel.accCd = event.data.accCd;
                                taskFileModel.accKey = event.data.accKey;
                                taskFileModel.fileExt = event.data.fileExt;
                                taskFileModel.fileNm = event.data.fileNm;
                                taskFileModel.filePath = event.data.filePath;
                                taskFileModel.fileSize = event.data.fileSize;
                                taskFileModel.fileUuid = event.data.fileUuid;
                                taskFileModel.edtrDt = event.data.edtrDt;
                                taskFileModel.useYn = 'N';

                                // 1. subCeoList 관리 리스트 추가
                                this.subFileList.push(taskFileModel);
                            }
                            else {
                                // 해당 row 삭제
                                this.subFileList.splice(this.subFileList.findIndex((e) => e.fileNm === event.data.fileNm));
                                //삭제 오류 수정
                                this.subFileDataList.splice(this.subFileList.findIndex((e) => e.fileNm === event.data.fileNm));
                            }

                            // 그리드 내역 삭제
                            this.comFun.removeGridRow(this.gridFile);
                        }
                    });
                }
                break;
            case 'download':
                let row = event.data;
                if (row.newFile === true) {
                    this.comFun.alert(this.comFun.i18n('경고'), this.comFun.i18n('newFileDownloadErr'));
                } else {
                    this.apiHttpServiceImpl.downloadFile(row, (result) => {
                        if (result === 'OK') {
                            Ext.toast(this.comFun.i18n('downloadCompletion'));
                        } else {
                            this.comFun.alert(this.comFun.i18n('오류'), this.comFun.i18n('downloadErr'));
                        }
                    });
                }
                break;
        }
    }
    //*******************************************************[GRID]<<<

    //*******************************************************[API]>>>
    apiSelectList() {
        this.gridMain.gridApi.showLoadingOverlay();
        if (this.searchFormCmp.isValid() === true) {
            this.apiHttpServiceImpl.selectList('/api/TaskAdmin/NoticeMgt/selectNotice', this.searchModel).subscribe(
                (res: any) => {
                    this.funcFieldClear("F");	// 초기화
                    this.gridMain.rowData = res;
                    this.gridMain.gridApi.hideOverlay();
                    this.formModel = <GPassNoticeMgtModel>{};

                    // 첨부파일 초기화
                    this.subFileList = new Array();
                    this.gridFile.rowData = [];

                    this.btnViewMgr.ChangeViewMode(this.comConst.BTN_MODE_SEARCH);
                },
                (err: HttpErrorResponse) => {
                    /**
                     * @error
                     */
                    this.comFun.alert(this.comFun.i18n('오류'), this.comFun.i18n('alertErrorMsg'));
                    this.gridMain.gridApi.hideOverlay();
                    this.formModel = <GPassNoticeMgtModel>{};

                    // 첨부파일 초기화
                    this.subFileList = new Array();
                    this.gridFile.rowData = [];

                    this.btnViewMgr.BeforeMode();
                }
            );
        } else {
            this.comFun.alert(this.comFun.i18n('경고'), this.comFun.i18n('alertFormValidateMsg'));
            this.gridMain.gridApi.hideOverlay();
            this.formModel = <GPassNoticeMgtModel>{};

            // 첨부파일 초기화
            this.subFileList = new Array();
            this.gridFile.rowData = [];
            this.btnViewMgr.BeforeMode();
        }
    }

    apiSaveFormFile(mds: Array<GPassNoticeMgtModel>) {
        this.apiHttpServiceImpl.saveArrFormFile('/apiFile/TaskAdmin/NoticeMgt/saveNotice', mds, this.subFileDataList).subscribe(
            (res: any) => {
                if (res.success === true) {
                    /**
                     * @success
                     */

                    switch (this.btnViewMgr.beforeTaskMode) {
                        case this.comConst.BTN_MODE_NEW:
                            // 초기화
                            this.funcFieldClear("F");
                            // 조회 모드 변경
                            this.btnViewMgr.ChangeViewMode(this.comConst.BTN_MODE_SEARCH);

                            this.editorConfig.editable = false;
                            this.editorConfig.showToolbar = false;
                            //***************************************************
                            // 그리드 정렬 (신규데이터 최상단 위치저장)
                            // Json String -> 객체
                            var jsonRes = JSON.parse(res.resModel);

                            const rowData = [];

                            let noticeMgtMd = new GPassNoticeMgtModel();
                            noticeMgtMd = jsonRes[0];

                            rowData.push(noticeMgtMd);
                            rowData[0].rowStat = "C";

                            this.gridMain.gridApi.forEachNode(node => rowData.push(node.data)); // 기존 데이터 불러오기
                            this.gridMain.rowData = rowData;	// 그리드 데이터 교체
                            //***************************************************
                            break;
                        case this.comConst.BTN_MODE_MODIFY:
                            // 초기화
                            this.funcFieldClear("F");
                            this.editorConfig.editable = false;
                            this.editorConfig.showToolbar = false;
                            // 조회 모드 변경
                            this.btnViewMgr.ChangeViewMode(this.comConst.BTN_MODE_SEARCH);
                            break;
                        case this.comConst.BTN_MODE_EXCEL_IMPORT:
                            // 초기화
                            this.funcFieldClear("F");
                            this.editorConfig.editable = false;
                            this.editorConfig.showToolbar = false;
                            // 조회 모드 변경
                            this.btnViewMgr.ChangeViewMode(this.comConst.BTN_MODE_SEARCH);
                            this.editorConfig.editable = false;
                            this.editorConfig.showToolbar = false;
                            this.gridMain.rowData = res.NoticeMgtModel;
                            break;
                        default:
                            this.comFun.alert(this.comFun.i18n('경고'), "저장할 수 없습니다. <br>이상 오퍼레이션 확인");
                            this.btnViewMgr.BeforeMode();
                            this.editorConfig.editable = false;
                            this.editorConfig.showToolbar = false;
                            break;
                    }
                }
                else {
                    // 저장 실패
                    this.comFun.alert("저장 실패", res.message);
                    this.btnViewMgr.BeforeMode();
                }
            },
            (err: HttpErrorResponse) => {
                /**
                 * @error
                 */
                this.comFun.alert(this.comFun.i18n('오류'), this.comFun.i18n('alertErrorMsg'));
                this.btnViewMgr.BeforeMode();
            }
        );
    }

    apiDeleteFileDataMgt() {
        this.apiHttpServiceImpl.apiCall("/api/TaskAdmin/NoticeMgt/deleteNotice", this.formModel).subscribe(
            (res: any) => { //1-성공시
                this.funcFieldClear("F");	// 초기화
                // 재조회
                this.apiSelectList();
                // 첨부파일 초기화
                this.subFileList = new Array();
                this.gridFile.rowData = [];
            },
            (err: HttpErrorResponse) => { //1-오류시
                this.comFun.alert(this.comFun.i18n('오류'), this.comFun.i18n('alertErrorMsg'));
            }
        );
    }

    apiSelectTaskFile(accKey: string) {
        // 첨부파일 정보 초기화
        this.subFileList = new Array();

        //Form 검증이 정상일때만 서버 통신
        if (this.searchFormCmp.isValid() === true) {
            this.gridFile.rowData = [];
            var tfMd = new GPassTaskFileModel();
            tfMd.accCd = "NOTICE_MGT";
            tfMd.accKey = this.formModel.id;

            // 첨부파일 조회 호출
            //this.tf.funcApiSelectTaskFile(tfMd, this.fileList, this.gsFile);
            this.apiHttpServiceImpl.apiCall('/api/comm/selectTaskFile', tfMd).subscribe(
                (res: any) => {
                    /**
                     * @success
                     */
                    if (res.length > 0) {
                        for (let i = 0; i < res.length; i++) {
                            this.subFileList.push(res[i]);
                        }
                        this.gridFile.rowData = res
                    } else {
                    }
                },
                (err: HttpErrorResponse) => {
                    /**
                     * @error
                     */
                    this.comFun.alert(this.comFun.i18n('오류'), this.comFun.i18n('alertErrorMsg'));
                }
            );
        } else {
            this.comFun.alert(this.comFun.i18n('경고'), this.comFun.i18n('alertFormValidateMsg'));
        }
    }
    //*******************************************************[API]<<<

    //*******************************************************[POPUP]>>>
    //*******************************************************[POPUP]<<<

    //*******************************************************[FUNC]>>>
    // 첨부파일 중복검사
    funcDupFile(arrList: Array<any>, target: any) {
        let bRet = false;
        for (let i = 0; i < arrList.length; i++) {
            if (arrList[i].fileNm === target) {
                if (arrList[i].useYn === 'N')
                    bRet = false;   // 삭제한 내역 재등록 시 발생
                else
                    bRet = true;    // 중복확인
            }
        }
        return bRet;
    }

    funcFieldClear(flag) {
        switch (flag) {
            case "F":	// FormField
                // 입력필드만 초기화
                this.formModel = new GPassNoticeMgtModel();
                this.isEditForm = true;

                this.subFileList = new Array();     // 첨부파일 초기화
                this.subFileDataList = new Array(); // 첨부파일 초기화 (파일)
                this.gridFile.rowData = [];
                break;
            case "S":	// SearchField
                this.searchModel = new GPassNoticeMgtModel();
                break;
            case "A":
            default:	// ALL
                // 전체 데이터 초기화
                this.formModel = new GPassNoticeMgtModel();
                this.isEditForm = true;

                this.subFileList = new Array();     // 첨부파일 초기화
                this.subFileDataList = new Array(); // 첨부파일 초기화 (파일)

                this.gridMain.rowData = [];
                this.gridFile.rowData = [];
                break;
        }
    }
    //*******************************************************[FUNC]<<<
}
