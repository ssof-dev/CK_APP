export class CenterFormModel {

    /**
     * 예제 model
     */
    textFieldVal    : string;   //텍스트필드 val
    urlFieldVal     : string;   //URL필드 val
    emailFieldVal   : string;   //E-mail필드 val
    numFieldVal     : number;   //숫자필드 val
    editFieldVal    : string;   //에디터 필드 val
    startDt         : string;   //달력
    checkVal        : string;   //체크박스
    toggleVal       : string;   //toggle
    comboVal        : string;   //combo(select)
    /** 
     * 페이징처리 관련 
     */ 
    length  : number;		//페이징 처리시 한번에 조회할 데이터 수 
    nowPage : number;		//현재 페이지위치 
}