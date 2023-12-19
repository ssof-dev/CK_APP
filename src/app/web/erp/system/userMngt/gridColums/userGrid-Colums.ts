import { ComFormat } from "src/app/shared/com.format";
import { AgGridConfig } from "src/app/shared/ag-Grid-Config";
import { AgGridRowTypeRender } from "src/app/shared/agGridRowTypeRender";

export class UserGridColums{
    constructor(private agGridConfig : AgGridConfig, private upThis: any){
        agGridConfig.columnDefs = this.columnDefs;
    }

    private comFormat: ComFormat = new ComFormat();

    public columnDefs = [
        {
            headerName: '사원번호',
            field: 'userNo',
            width: 120,
            sortable: true,
            filter: false,
            editable: false,
            cellStyle: {textAlign: "center"},
        },
        {
            headerName: '사원명',
            field: 'userNm',
            width: 110,
            sortable: true,
            filter: false,
            editable: false,
            cellStyle: {textAlign: "left"},
        },
        {
            headerName: '팀',
            field: 'teamNm',
            width: 140,
            sortable: true,
            filter: false,
            editable: false,
            cellStyle: {textAlign: "left"},
        },
        {
            headerName: '직급',
            field: 'userRnk',
            width: 140,
            sortable: true,
            filter: false,
            editable: false,
            cellStyle: {textAlign: "center"},
        },
        {
            headerName: '직책',
            field: 'userPos',
            flex: 1,
            sortable: true,
            filter: false,
            editable: false,
            cellStyle: {textAlign: "left"},
        },
    ];
}