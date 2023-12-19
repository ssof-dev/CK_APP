declare var Ext: any;
import { ComFormat } from "src/app/shared/com.format";
import { ComFunction } from "src/app/shared/com.function";

export class GridMain {

    constructor(public comFun: ComFunction,
                public comFormat:ComFormat){}
    
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
			field: 'rowStat',
			headerName: '',
			filter: false,
			width: 50,
			hide: false,
			editable: true,
			cellEditor: 'agSelectCellEditor',
			cellEditorParams: {
				values: ['C', 'R', 'U', 'D'],
			},
			cellRenderer: 'customRowStatRender',
			cellStyle: {textAlign: "center"}
		},
        {
            field: 'userId',
            headerName: '사용자ID',
            sortable: true,
            filter: false,
            width: 200
        },
        {
            field: 'userLevel',
            headerName: '사용자등급',
            sortable: true,
            filter: false,
            width: 200
        },
        {
            field: 'memberCd',
            headerName: '회원사코드',
            sortable: true,
            filter: false,
            width : 200
        },
        {
            field: 'deleteYn',
            headerName: '삭제여부',
            sortable: true,
            filter: false,
            width : 100
        },
        {
            sortable: true,
            filter: false,
            flex: 1,
        },
    ];
}