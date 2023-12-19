export class GPassUserMgtModel {
    userId          : string;   // 사용자 ID
    userPass        : string;   // 사용자 비밀번호
    userLevel       : string;   // 사용자등급 TB_GPASS011.CODE_ID = USER_LEVEL
    memberCd        : string;   // 회원사코드[M1이면 GPASS강제 입력]
    rgstId          : string;   // 등록자ID
    rgstDate        : string;   // 등록일시
    edtrId          : string;   // 수정자ID
    edtrDate        : string;   // 수정일시
    deleteYn        : string;   // 삭제여부

    searchUserId    : string;   // 사용자 ID (Search Field 검색용)
}
