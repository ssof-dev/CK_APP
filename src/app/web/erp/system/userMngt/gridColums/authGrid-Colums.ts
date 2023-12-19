import { ComFormat } from "src/app/shared/com.format";
import { AgGridConfig } from "src/app/shared/ag-Grid-Config";
import { AgGridRowTypeRender } from "src/app/shared/agGridRowTypeRender";

export class AuthGridColums{

    constructor(private agGridCofig : AgGridConfig, private upThis: any){
        agGridCofig.columnDefs = this.columnDefs;
    }

    private comFormat: ComFormat = new ComFormat();

    public columnDefs = [
        {
            type: 'numbericColumn',
            headerCheckboxSelection: true,
            checkboxSelection: true,
            sortable: true,
            width: 50,
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
            cellStyle: {textAlign: "center"},
            width: 150,
        },
        {
            headerName: '권한명칭',
            field: 'authNm',
            sortable: true,
            filter: false,
            editable: false,
            flex: 1,
        },
        {
            headerName: '사용자 아이디',
            field: 'userId',
            sortable: true,
            filter: false,
            editable: false,
            visible : true,
            flex: 1,
        },
        {
            headerName: '사원번호',
            field: 'userNo',
            sortable: true,
            filter: false,
            editable: false,
            visible : true,
            flex: 1,
        }
    ]
}