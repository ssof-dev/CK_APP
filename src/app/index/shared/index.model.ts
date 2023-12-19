export class Index {
	id: number;
	name: string;
}

export class ModalParam{
    nodeItem : any;                 //호출화면에서 넘어온 다이얼로그 화면 정보
    eventComplet : boolean = false; //다이얼로그 이벤트 완료유무
    sendItem : Array<any> = new Array<any>();   //호출화면으로 전송할 결과 데이터
}

//공통코드 Model
export class CodeModel{
    codeId      : string;
    codeNm      : string;
    serachVal   : string;   //검색 키워드

    isEventComplet : boolean = false;  //이벤트 완료 처리 여부 내부 확인값
}

// export class ToastModel{
//     bisType     : string;   //업무구분
//     targetEmpNo : string;   //대상사번 없으면 전체
//     progId      : string;   //연결 프로그램 ID
//     title       : string;   //제목
//     msg         : string;   //내용
//     type        : string;   //success, info, warning, error
// }