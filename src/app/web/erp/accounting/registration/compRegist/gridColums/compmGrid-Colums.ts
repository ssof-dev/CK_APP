import { ComFormat } from "src/app/shared/com.format";
import { AgGridConfig } from "src/app/shared/ag-Grid-Config";
import { AgGridRowTypeRender } from "src/app/shared/agGridRowTypeRender";

export class CompmGridColums{

    //생성자로 해당 그리드 설정 정보 받음
    constructor( private agGridConfig : AgGridConfig, private upThis: any){
        agGridConfig.columnDefs = this.columnDefs;
    }

    private comFormat: ComFormat = new ComFormat();

    public columnDefs = [
        {
            headerName: 'SQ',
            field: 'No',
            type: 'numericColumn',
            filter: false,                  //필터 여부
            editable: false,                //열의 편집여부
            headerCheckboxSelection: true,  //헤더의 체크박스 여부
            checkboxSelection: true,        //행의 체크박스 여부
            valueGetter: (param:any) =>{
                return param.node.rowIndex + 1;
            },
            width: 80,
        },
        {
            headerName: '업체번호',
            field: 'useCompNo',
            width: 80,
            filter: false,                  //필터 여부
            editable: false,                //열의 편집여부
            cellStyle: {textAlign: "center"}
        },
        {
            headerName: '업체명',
            field: 'useCompNm',
            width: 200,
            filter: false,                  //필터 여부
            editable: false,                //열의 편집여부
            cellStyle: {textAlign: "left"},
        },
        {
            headerName: '사업자번호',
            field: 'busiNo',
            width: 110,
            filter: false,                  //필터 여부
            editable: false,                //열의 편집여부
            cellStyle: {textAlign: "center"},
        },
        {
            headerName: '대표자',
            width: 80,
            filter: false,                  //필터 여부
            editable: false,                //열의 편집여부
            cellStyle: {textAlign: "center"},
        },
        {
            headerName: '업태',
            field: 'busiBtypeNm',
            width: 80,
            filter: false,                  //필터 여부
            editable: false,                //열의 편집여부
            cellStyle: {textAlign: "center"},
        },
        {
            headerName: '종목',
            field: 'busiBkindNm',
            width: 80,
            filter: false,                  //필터 여부
            editable: false,                //열의 편집여부
            cellStyle: {textAlign: "center"},
        },
        {
            headerName: '연락처',
            field: 'reprTelNo',
            flex: 1,
            filter: false,                  //필터 여부
            editable: false,                //열의 편집여부
            cellStyle: {textAlign: "center"},
        },
    ];
}