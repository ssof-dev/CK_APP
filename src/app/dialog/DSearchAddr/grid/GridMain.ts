declare var Ext: any;
import { ComFunction } from "src/app/shared/com.function";

export class GridMain {

    constructor(public comFun: ComFunction){}
    
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
            width: 65,
        },    
        {
            field: 'zipCd',
            headerName: '우편번호', 
            sortable: true,
            filter: false,
            flex: 1,
        },
        {
            field: 'addrRoad',
            headerName: '도로명 주소',
            sortable: true,
            filter: false,
            flex: 1,
        },
        {
            field: 'addr',
            headerName: '주소',
            sortable: true,
            filter: false,
            flex: 1,
        },
        {
            field: 'addrNo',
            headerName: '지번',
            sortable: true,
            filter: false,
            flex: 1,
        },
    ];
}