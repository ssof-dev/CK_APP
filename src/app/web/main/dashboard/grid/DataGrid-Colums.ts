import { ComFormat } from "src/app/shared/com.format";
import { AgGridConfig } from "src/app/shared/ag-Grid-Config";
import { AgGridRowTypeRender } from "src/app/shared/agGridRowTypeRender";


export class DataGridColums {

    //생성자로 해당 그리드 설정 정보 받음
    constructor( private agGridConfig : AgGridConfig, private upThis: any){
        agGridConfig.columnDefs = this.columnDefs;
    }

    private comFormat: ComFormat = new ComFormat();

    public columnDefs = [
        {
            headerName: 'NO',
            field: 'brdNo',
            type: 'numericColumn',
            sortable: true,
            width: 65,
        },
        // {
        //     field: 'noticeTarget',
        //     headerName: '열람대상',
        //     sortable: true,
        //     filter: false,
        //     flex: 1,
        // },
        {
            field: 'brdTitle',
            headerName: '제목',
            sortable: true,
            filter: false,
            flex: 2,
        },
        {
            field: 'regDt',
            headerName: '등록일',
            sortable: true,
            filter: false,
            width: 140,
        },
        {
            //@ychan_20220517 main 화면에서는 id 말고 nm 요청
            // field: 'rgstId',
            field: 'regUser',
            headerName: '작성자',
            sortable: true,
            filter: false,
            flex: 1,
        },
    ];
}