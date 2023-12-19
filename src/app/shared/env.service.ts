import { Injectable } from '@angular/core';
import { ApiHttpService } from './api-http.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { CustomHeaderGroup } from '../web/CustomHeaderGroup';
import { CustomRowStatRender } from '../web/CustomRowStatRender';
import { Observable } from 'rxjs';
import { CustomPinnedRowRenderer } from '../web/CustomPinnedRowRenderer';
import * as CryptoJS from 'crypto-js';
import JSEncrypt from 'jsencrypt';

// JCNA : Delete 2021.04.20
// export class Setting{
//     view: string =  'tab'     //화면 표시 방법 tab or single
// }

/**
 * 사용자 정보 저장
 */
export class UserInfo {
    userNo!: string;      //사용자고유번호
	userId!: string;      //사용자아이디
    userPwd!: string;     //비밀번호
	userNkn!: string;     //사용자별칭
	userNm!: string;      //사용자명칭
	userEmail!: string;   //사용자이메일
	teamCd!: string;      //팀코드
	teamNm!: string;      //팀명
	userRnk!: string;     //사용자직급 코드
	userRnkNm!: string;   //사용자직급명
	userPos!: string;     //사용자직책 코드
	userPosNm!: string;   //사용자직책명
	userDuty!: string;    //사용자업무
    menuType!: string;    //0:권한메뉴 , 그외 사용자메뉴
    userTok!: string;     //토큰
}

export class imgResponse {
    imageUrl: string;
}
//@yhj20230704 헤더 정보 얻기위해 추가
export class HttpHeader {
    userId      : string;   //유저아이디
    deptType    : string;   //소속타입
}

/**
 * 사용자 정보 및 시스템 환경변수 관리
 */
@Injectable()
export class EnvService extends ApiHttpService {

    public progName: string = "SIMZII ERP";
    public serverUrl = this.getServerUrl(); //서버 url

    // DEBUG : true 디버깅모드 
    // DEBUG : false 운영모드
    public DEBUG = false; // true/false

    public langsArr = ['ko', 'en'];         //다국어 처리 국가코드 https://eminwon.qia.go.kr/common/CountrySP.jsp 참조
    public langsStore: any = [
        { comboId: 'ko', comboNm: '한국어' },
        { comboId: 'en', comboNm: 'English' }
    ];
    public langs: string;               //설정에서 변경한 언어 기본언어는 app.component.ts에서 설정

    public userInfo = new UserInfo();       //사용자정보

    public httpHepader = new HttpHeader();       //헤더정보

    public progData: any;                  //메뉴목록

    public formMargin: string = '0 10 0 0';  //Form 필드 Margin 기본값 시계방향 위, 오, 왼, 아

    public tabPos: string = 'top';       //텝메뉴 위치 기본값

    set login(param: any){
        this.userInfo = param;
    }

    //https://www.npmjs.com/package/@kolkov/angular-editor 참조
    //텍스트 에디터 설정
    public editorConfig: AngularEditorConfig = {
        editable: false,					//편집여부
        spellcheck: false,					//맞춤법 검사
        height: '15rem',					//높이
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
        uploadUrl: `${this.getServerUrl()}/api/comm/editUploadImage`,		//이미지 업로드시 처리할 서버 api 주소
    };

    /**
     * 메뉴 조회
     * @param reqeust 
     */
    public selectCommProgList(reqeust: UserInfo) {

        return this.httpPost('/api/auth/userTreeMenuList', reqeust);
    }

    /*********************************************************************************************
     * ag-grid
     */
    //ag Grid 공통 설정값
    public defaultColDef = {
        floatingFilter: true,   //필터
        resizable: true,        //리사이즈
        suppressSizeToFit: true
    };

    //ag-grid custom 설정
    public frameworkComponents = {
        customHeaderGroupComponent: CustomHeaderGroup,
        customRowStatRender: CustomRowStatRender,
        customPinnedRowRenderer: CustomPinnedRowRenderer,
    };

    //ag-grid row style 설정
    public getRowClass = function (params) {
        //@ychan_20211124 그리드 수정 후 색상변경 보류(한번 변경된 색상이 다시 변경안됨.)
        // let rowNode = params.node;
        // if (rowNode.data) {
        //     switch (rowNode.data.rowStat) {
        //     case 'C':
        //         return 'ag-row-c';
        //     case 'U':
        //         return 'ag-row-u';
        //     case 'D':
        //         return 'ag-row-d';
        //     case 'CLEAR':
        //         return 'ag-row-clear';
        //     default:
        //         return null;
        //     }
        // } else {
        //     return null;
        // }

        //return null;
    };
    //*********************************************************************************************
}

