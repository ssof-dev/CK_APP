declare var Ext: any;
import { CellClickedEvent } from "ag-grid-community";
import { tap } from "rxjs/operators";
import { ComFormat } from "src/app/shared/com.format";
import { ComFunction } from "src/app/shared/com.function";

export class GridFile {
    constructor(public comFun: ComFunction,
                public comFormat : ComFormat){}
    
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
            headerName: 'No',
            type: 'numericColumn',
            sortable: true,
            valueGetter: this.comFun.gridRowNo,
            width: 50,
        },
        {
            field: 'fileNm',
            headerName: '파일 명',
            sortable: true,
            filter: false,
            flex : 1
        },
        {
            field: 'edtrDt',
            headerName: '등록일',
            sortable: true,
            filter: false,
            width : 140,
        },
        {
            field: 'delete',
            headerName : '삭제',
            width : 60,
            cellRenderer: function (params) {
                return '<h style="color:#5e7e9b" class="x-fa fa-trash-alt fa-lg ">'
            },
            cellStyle: {
                textAlign: "center"
            }
        },
        {
            field: 'download',
            headerName : '받기',
            width: 60,
            cellRenderer: function (params) {
                return '<h style="color:#5e7e9b" class=" x-fa fa-download fa-lg">'
            },
            cellStyle: {
                textAlign: "center"
            }
        }
    ];

}