import { ComFormat } from "src/app/shared/com.format";
import { AgGridConfig } from "src/app/shared/ag-Grid-Config";
import { AgGridRowTypeRender } from "src/app/shared/agGridRowTypeRender";

export class LoginGridColums{

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
            headerName: '상태',
            field: 'rowType',
            sortable: true,
            filter: false,
            editable: false,
            width: 150,
            cellStyle: {textAlign: "center"},
        },
        {
            headerName: '아이디',
            field: 'userId',
            sortable: true,
            filter: false,
            editable : (param: any) =>{
                return param.data.rowType === 'delete' ? false : true;
            },
            width: 150,
        },
        {
            headerName: '사원번호',
            field: 'userNo',
            visible : false,
            width: 150,
        },
        {
            headerName: '비밀번호',
            field: 'userPwd',
            sortable: true,
            filter: false,
            editable : (param: any) =>{
                return param.data.rowType === 'delete' ? false : true;
            },
            width: 150,
            cellStyle: {textAlign: "center"},
        },
        {
            headerName: '닉네임',
            filed: 'userNkn',
            sortable: true,
            filter: false,
            editable : (param: any) =>{
                return param.data.rowType === 'delete' ? false : true;
            },
            width: 200,
            cellStyle: {textAlign: "left"},
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
            flex:1
        }
    ]
}