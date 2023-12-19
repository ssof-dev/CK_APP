declare var Ext: any;
import { ComFormat } from "src/app/shared/com.format";
import { ComFunction } from "src/app/shared/com.function";

export class GridMain {

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
        floatingFilter: false,      //필터
        resizable: true,            //리사이즈
        suppressSizeToFit: false,
        suppressMovable: true       // 컬럼헤드 이동 막기
    };

    public columnDefs = [
        {
            headerName: 'No',
            type: 'numericColumn',
            sortable: true,
            valueGetter: this.comFun.gridRowNo,
            width : 65
        },
        {
            field: 'id',
            headerName: 'ID',
            sortable: true,
            filter: false,
            width : 100
        },
        {
            field: 'type',
            headerName: '구분',
            sortable: true,
            filter: false,
            width : 90
        },
        {
            field: 'noticeTarget',
            headerName: '열람대상',
            sortable: true,
            filter: false,
            width : 90,
        },
        {
            field: 'title',
            headerName: '타이틀',
            sortable: true,
            filter: false,
            flex : 1
        },
        {
            field: 'rgstId',
            headerName: '작성자',
            sortable: true,
            filter: false,
            width : 80
        },
        {
            field: 'rgstDt',
            headerName: '등록일자',
            sortable: true,
            filter: false,
            width : 140
        },
    ];

    // //grid row 이벤트
    // agGridRowEvent(params){
    //     this.rowId = params.node.id; //선택한 row id 저장
    //     //this.formModel = params.data;
    // }

    // //grid row 선택 이벤트
    // onSelectGrid(row){
    //     //row 데이터 model 바인딩
    //     //this.hd.formModel = row.selected[0].data;
    // }

    // //grid ready
    // onReadyGrid(event, this_){
    //     this.gridApi = event.api;
    //     this.gridColumnApi = event.columnApi;

    //     console.log(this_)
    //     this_.funcSelectExchangeListInq();

        
        
    //     //grid row 생성
    //     //this.comFun.gridRowCreate(this.gridApi);
    //     //row 삭제
    //     //this.comFun.gridRowDelete(this.gridApi);
    //     //컬럼 자동크기 조정
    //     //this.comFun.autoSizeColumn(this.gridColumnApi);
    // }

}