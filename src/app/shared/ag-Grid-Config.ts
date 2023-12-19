import { v4 as uuidv4 } from 'uuid';

/**
 * Ag Grid 공용 설정
 */
export class AgGridConfig{

    getRowId: string = 'rowIdKey';

    gridClickOption: boolean = false;

    //그리드 Ready 이벤트
    onReadyGrid(event:any){
        this._gridApi = event.api;
        this._gridColumnApi = event.columnApi;

    }

    //그리드 데이터 초기화
    clear() {
        //this.gridApi.setRowData([]);
        if(this.dataSource != undefined) {
            this._dataSource = undefined;
            this._recvData = undefined;
        }
    }

    //그리드 undo 기능 사용여부 true : 사용
    isUndo: boolean = true;

    //그리드 undo 사용시 실행 단계 수
    undoLimit: number = 20;

    //ag-grid api
    private _gridApi: any;
    get gridApi():any{
        return this._gridApi;
    }

    //Column api 
    private _gridColumnApi: any;
    get gridColumnApi():any{
        return this._gridColumnApi;
    }

    /**
     * dataSource
     * {
     *  respTime : 처리시간
     *  count : data size
     *  data : []
     *  stateCd: 상태코드
     *  stateMsg : 상태메시지
     * }
     */
    private _dataSource: any;
    set dataSource(ds: any){
        this._dataSource = ds;
        this._recvData = JSON.parse(JSON.stringify(ds.data));
    }
    get dataSource(): any{
        return this._dataSource;
    }

    //그리드에 표시할 row 데이터
    get rowData(): any{
        if( this._dataSource !== undefined && this._dataSource.hasOwnProperty('data') ){
            return this._dataSource.data;
        }else{
            return [];
        }
    }

    //전체 데이터 건수
    get totCount(): number{
        if( this._dataSource !== undefined && this._dataSource.hasOwnProperty('data') ){
            return this._dataSource.count;
        }else{
            return 0;
        }
    }

    //복원용 데이터
    private _recvData: any;
    get recvData(){
        return this._recvData;
    }

    //ag Grid 설정값
    defaultColDef = {
        floatingFilter: false,      //필터
        resizable: true,            //리사이즈
        suppressSizeToFit: false,   //true면 컬럼크기 고정
        suppressMovable: false,      // 컬럼 이동 막기
        headerClass: "centered"
    };

    //컬럼정의
    private _columnDefs = [];

    set columnDefs(param: any){
        this._columnDefs = param;
    }

    get columnDefs(): any{
        return this._columnDefs;
    }

    //행번호 갱신
    private refreshNo(){
        this.gridApi.refreshCells({
            focus: false
        ,   columns: ['No']
        });
    }

    /**
     * 신규행 추가 
     * item : 행추가시 데이터 포함될 Object 데이터
     * index : 신규행이 그리드에서 표현될 위치 기본값 0(첫번째)
     * @param item 
     * @param index 
     */
    add(item:any = {}, index:number = 0){
        item.rowType = 'insert';
        item.rowIdKey = uuidv4();
        this.gridApi.applyTransaction({
            add : [item],
            addIndex : index
        });

        //행번호 갱신
        this.refreshNo();   
    }

    /**
     * 신규행추가(여러행)
     * item : 여러행 추가할 배열(Object) 데이터
     * @param item 
     */
    adds(items:Array<any>){
        items.forEach((row:any)=>{
            row.rowType = 'insert';
            this.gridApi.applyTransaction({
                add : [row],
                addIndex : 0
            });

        });

        //행번호 갱신
        this.refreshNo();  
    }

    /**
     * Ag Grid 삭제
     * @param item 
     */
    remove(item: any){
        this.gridApi.applyTransaction({
            remove : [item],
        });

        //행번호 갱신
        this.refreshNo();  
    }

    removes(items: Array<any>){
        this.gridApi.applyTransaction({
            remove : items,
        });

        //행번호 갱신
        this.refreshNo();  
    }

    //수정, 삭제 취소시 조회시점 정보로 데이터 변경
    undo(param: any){
        let findObj = this.recvData.find( (item:any) => item.rowIdKey === param.data.rowIdKey);
        param.node.updateData(findObj)
    }

    //그리드 편집 데이터 가져오기
    getEditRows(): Array<any>{
        let editArr: Array<any> = new Array;
        this.gridApi.forEachNode((node: any)=>{
            if( Object.keys( node.data ).includes('rowType') ){
                if( node.data.rowType == 'insert' || node.data.rowType == 'update' || node.data.rowType == 'delete'){
                    editArr.push(node.data);
                }
            }
        });

        return editArr;
    }

    //Ag Grid Row 삭제 플레그 
    del(){
        let nodes = this.gridApi.getSelectedNodes();
        nodes.forEach((node:any)=>{
            node.setDataValue('rowType', 'delete');
        });
    }

    //컬럼 변경 처리 이벤트
    onCellValueChanged(e:any, callBack?:Function | undefined){
        if( e.column.colId != 'rowType' && e.data.rowType != 'insert' ){
            let rowNode = e.node;
            rowNode.setDataValue('rowType', 'update');
        }

        if( callBack !== undefined ) {
            callBack.call(this, e);
        }
    }

}