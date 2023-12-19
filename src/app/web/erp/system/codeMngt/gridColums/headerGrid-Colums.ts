import { ComFormat } from "src/app/shared/com.format";
import { AgGridConfig } from "src/app/shared/ag-Grid-Config";
import { AgGridRowTypeRender } from "src/app/shared/agGridRowTypeRender";

export class HeaderGridColums{

    //생성자로 해당 그리드 설정 정보 받음
    constructor( private agGridConfig : AgGridConfig, private upThis: any){
        agGridConfig.columnDefs = this.columnDefs;
    }

    //컬럼 Format
    private comFormat: ComFormat = new ComFormat();


    public columnDefs = [
        {
            headerName: 'No',
            field: 'No',
            type: 'numericColumn',
			rowDrag: true,
            headerCheckboxSelection: true,
            checkboxSelection: true,
            sortable: true,
            valueGetter: (param:any) =>{
                return param.node.rowIndex + 1;
            },
            width: 100,
        },
        {
			field: 'rowType',
			headerName: '상태',
			filter: false,
			width: 60,
			editable: false,
			cellRenderer: AgGridRowTypeRender,
            cellRendererParams:{
                agGridConfig: this.agGridConfig
            },
			cellStyle: {textAlign: "center"}
		},
        {
            headerName: '코드유형',
            field: 'cdType',
            sortable: true,
            filter: false,
            editable: (param: any) =>{
                return param.data.rowType === 'insert' ? true : false;
            },
            width : 140
        },
        {
            headerName: '코드명칭',
            field: 'cdNm',
            sortable: true,
            filter: false,
            editable : (param: any) =>{
                return param.data.rowType === 'delete' ? false : true;
            },
            width : 200
        },
        {
            headerName: '설명',
            field: 'cdExpl',
            sortable: true,
            filter: false,
            editable : (param: any) =>{
                return param.data.rowType === 'delete' ? false : true;
            },
            cellEditor: 'agLargeTextCellEditor',
            cellEditorParams: {
                maxLength: 250,
                rows: 2,
                cols: 25,
            },
            width : 250,
        },
        {
            headerName: '사용여부',
            field: 'useYn',
            sortable: true,
            filter: false,
            editable : (param: any) =>{
                return param.data.rowType === 'delete' ? false : true;
            },
            cellEditor: 'agSelectCellEditor',
            cellEditorParams: () =>{
                return {
                    values : this.comFormat.selectBoxOption(this.upThis.getLookupDataSource('USE_YN'))
                }
            },
            refData: this.comFormat.selectBoxRefData(this.upThis.getLookupDataSource('USE_YN')),
            cellStyle: {textAlign: "center"},
            flex: 1
        }
    ];
}