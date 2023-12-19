import { GPassTaskFileModel } from "./GPassTaskFile.model";

export class GPassNoticeMgtModel {
    id              : string;       // 아이디
    title           : string;       // 제목
    post            : string;       // 내용
    rgstDt          : string;       // 등록일
    rgstId          : string;       // 등록아이디
    type            : string;       // 타입
    fileNm          : string;       // 파일제목
    taskFileModel   : Array<GPassTaskFileModel>;    // 첨부파일 (실제파일)
    taskFileData    : Array<any>;   // 첨부파일 (실제파일)
    useYn           :string;        //사용구분

    noticeTarget : string;
}
