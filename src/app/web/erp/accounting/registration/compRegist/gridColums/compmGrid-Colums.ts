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
            width: 50,
        },
        {
            headerName: '업체번호',
            field: 'useCompNo',
            width: 80,
            cellStyle: {textAlign: "center"}
        },
        {
            headerName: '업체명',
            field: 'useCompNm',
            width: 200,
            cellStyle: {textAlign: "center"},
        },
        {
            headerName: '사업자번호',
            field: 'busiNo',
            width: 110,
            cellStyle: {textAlign: "center"},
        },
        {
            headerName: '대표자',
            width: 80,
            cellStyle: {textAlign: "center"},
        },
        {
            headerName: '업태',
            field: 'busiBtypeNm',
            width: 80,
            cellStyle: {textAlign: "center"},
        },
        {
            headerName: '종목',
            field: 'busiBkindNm',
            width: 80,
            cellStyle: {textAlign: "center"},
        },
        {
            headerName: '연락처',
            field: 'reprTelNo',
            flex: 1,
            cellStyle: {textAlign: "center"},
        },
    ];
}