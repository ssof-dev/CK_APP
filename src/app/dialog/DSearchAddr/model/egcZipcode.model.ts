export class EgcZipcodeModel {
    offset      : number;    // 페이지번호
    pageSize    : number;    // 한페이지에 보여질 ROW 수
    pageUnit    : number;    // 현재 페이지

    rowNum      : number;    // SEQ
    keyword     : string;    // 검색어

    addrRoad    : string;    // 도로명주소
    addrRoadEng : string;    // 영문주소
    addrOld     : string;    // 지번

    zipNo       : string;    // 우편번호
}

