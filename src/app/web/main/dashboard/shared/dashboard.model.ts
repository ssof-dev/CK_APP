//공지사항 Model
export class NoticeModel{
	id				: string; 	// ID
	title			: string; 	// 제목
	post			: string; 	// 내용
	rgstDt			: string; 	// 등록일
	rgstId			: string; 	// 등록ID
	type 			: string; 	// 타입
	noticeTarget 	: string;	// 열람권한
}
