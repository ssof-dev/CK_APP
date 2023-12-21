import { ComFormat } from "src/app/shared/com.format";
import { AgGridConfig } from "src/app/shared/ag-Grid-Config";
import { AgGridRowTypeRender } from "src/app/shared/agGridRowTypeRender";

export class CompdGridColums{

    //생성자로 해당 그리드 설정 정보 받음
    constructor( private agGridConfig : AgGridConfig, private upThis: any){
        agGridConfig.columnDefs = this.columnDefs;
    }

    private comFormat: ComFormat = new ComFormat();

    public columnDefs = [
        {
            headerName: '회계기',
            field: 'useCompKi',
            width: 60
        },
        {
            headerName: '회계연도',
            field: 'frYmd',
            width: 250,
            cellStyle: {textAlign: "center"}
        },
        {
            headerName: '대표자',
            field: 'ceoNm',
            width: 70,
            cellStyle: {textAlign: "center"},
        },
        {
            headerName: '담당자',
            field: 'reprPersonCd',
            width: 70,
            cellStyle: {textAlign: "center"},
        },
        {
            headerName: '연락처',
            field: 'reprPersonRelNo',
            width: 150,
            cellStyle: {textAlign: "center"},
        },
        {
            headerName: '홈페이지',
            field: 'homePage',
            flex: 1,
            cellStyle: {textAlign: "center"},
        },
    ];
}