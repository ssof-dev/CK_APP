export class EgcZipcodeModel {
    pageSize    : number;  // 전체 건수
    pageIndex   : number;  // 현재 페이지
    pageUnit    : number;  // 한 페이지에 보여줄 데이타 건수

    search      : string;  // 검색 키워드
    row         : string;  // SEQ

    // newAddr1    : string;  // 
    // oldAddr1    : string;  // 
    addrRoad    : string;  // 도로명주소
    addr        : string;  // 주소
    addrNo      : string;  // 지번

    zipCd     : string;  // 우편번호
}

