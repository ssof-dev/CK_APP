declare var Ext: any;
import { ComFormat } from "src/app/shared/com.format";
import { ComFunction } from "src/app/shared/com.function";

export class GridMblNotice {

    constructor(public comFun: ComFunction,
                public comFormat: ComFormat){}
    
    //ag-grid
    public gridApi: any;
    public gridColumnApi: any;
    
    //gr-grid row Id
    public rowId: string;

    //그리드 로우데이터
    public rowData : any = [];

    //ag Grid 설정값
    public defaultColDef = {
        floatingFilter: false,   //필터
        resizable: true,        //리사이즈
        suppressSizeToFit: false,
    };

    public columnDefs = [
        {
            field: 'noticeTarget',
            headerName: '열람대상',
            sortable: true,
            filter: false,
            width:75,
        },
        {
            field: 'title',
            headerName: '제목',
            sortable: true,
            filter: false,
            flex:1
        },
        {
            field: 'rgstDt',
            headerName: '등록일',
            sortable: true,
            filter: false,
            width: 87,
        },
        {
            //@ychan_20220517 main 화면에서는 id 말고 nm 요청
            // field: 'rgstId',
            field: 'rgstNm',
            headerName: '작성자',
            sortable: true,
            filter: false,
            width:60,
        },
    ];
}