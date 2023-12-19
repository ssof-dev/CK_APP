declare var Ext: any;
import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { IndexComponent } from 'src/app/index/index.component';
import { DashboardModel, DashboardService } from './shared/dashboard.service';
import { ComFunction } from 'src/app/shared/com.function';
import { ComValidation } from 'src/app/shared/com.validation';
import { EnvService } from 'src/app/shared/env.service';
import { CommonService } from 'src/app/shared/common-service';
import { AgGridConfig } from 'src/app/shared/ag-Grid-Config';
import { ComAlert } from 'src/app/shared/com.alert';
import { NoticeGridColums } from './grid/NoticeGrid-Colums';
import { DataGridColums } from './grid/DataGrid-Colums';


@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    providers: [CommonService, DashboardService],
})
export class DashboardComponent implements OnInit, AfterViewInit {

    private comAlert: ComAlert = new ComAlert();

    //조회 model 선언
    searchFormModel: DashboardModel = new DashboardModel();

    //게시판 그리드
    noticeGridConfig: AgGridConfig = new AgGridConfig();
    noticeGridColums!: NoticeGridColums;

    //자료실 그리드
    dataGridConfig: AgGridConfig = new AgGridConfig();
    dataGridColums!: DataGridColums;

    
    constructor(public envService: EnvService,
        public comFun: ComFunction, 
        public comVal: ComValidation,
        private commService: CommonService,
        private service: DashboardService,
        public indexCmp: IndexComponent) {}

    ngOnInit() {
        this.noticeGridColums = new NoticeGridColums(this.noticeGridConfig, this);
        this.dataGridColums = new DataGridColums(this.dataGridConfig, this);
    }
    
    ngAfterViewInit(){
        this.noticeGridList();
        this.dataGridList();
    }

    noticeGridList(selectKey?:any){
        this.noticeGridConfig.clear();

        this.service.noticeGridList(this.searchFormModel).subscribe({
            next:(response: any) =>{

                if(response.stateCd === 'OK' || response.stateCd === 'NO_DATA'){
                    this.noticeGridConfig.dataSource = response;
                }else{
                    this.comAlert.showAlert('error', '', response.stateMsg, false);
                }

            },
            error:(error: any) =>{

            }
        })
    }

    dataGridList(selectKey?:any){
        this.dataGridConfig.clear();

        this.service.dataGridList(this.searchFormModel).subscribe({
            next:(response: any) =>{

                if(response.stateCd === 'OK' || response.stateCd === 'NO_DATA'){
                    this.dataGridConfig.dataSource = response;
                }else{
                    this.comAlert.showAlert('error', '', response.stateMsg, false);
                }

            },
            error:(error: any) =>{

            }
        })

    }
}

    //     //*****************************************************************************************
    //     // 공지사항 
    //     // 공지사항 grid 초기화
    //     onReadyGrid_Notice(event) {
        //         this.gridNotice.gridApi = event.api;
        //         this.gridNotice.gridColumnApi = event.columnApi;
        
        //         // 공지사항 조회
        //         //this.getNotice(this.comConst.TYPE_NOTICE);
        //     }
        
        //     //공지사항 재조회
        //     refreshNotice = () => { this.getNotice(this.comConst.TYPE_NOTICE) }
        
        //     //공지사항 조회
        //     getNotice(type: string) {
            
            //         this.deshboardService.getNoticeList(this.noticeModel).subscribe(
                //             (res: any) => {
                    
                    //                 if (res.success === false) {
                        //                     // ***************************************
                        //                     // 통신 실패
                        //                     // ***************************************
                        //                     // 통신응답 처리
                        //                     if (this.comFun.apiErrorCheck(res.resCd) === true) {
                            //                         // 프로세스 처리
                            //                         switch (res.resCd) {
                                //                             case '-1':
                                //                                 break;
                                //                         }
                                //                     }
                                
                                //                     return;
                                //                 }
                                //                 else {
                                    //                     // ***************************************
                                    //                     // 통신 성공
//                     // ***************************************

//                     // Json String -> 객체
//                     var jsonRes = JSON.parse(res.resModel);
//                     if (type === this.comConst.TYPE_NOTICE) {
    //                         this.gridNotice.rowData = jsonRes;
    //                         //모바일 그리드 추가
    //                         this.gridMblNotice.rowData = jsonRes;
    //                     }
    //                     else {
        //                         this.gridFileData.rowData = jsonRes;
        //                         //모바일 그리드 추가
        //                         this.gridMblFileData.rowData = jsonRes;
        //                     }
        //                 }
        //             },
        //             (err: HttpErrorResponse) => {
            //                 /**
            //                  * @error
            //                  */
            //                 this.comFun.alert(this.comFun.i18n('오류'), this.comFun.i18n('alertErrorMsg'), null);
            //             }
            //         );
            //     }
            
            //     // // 모달 dialog 오픈
            //     openDlDashboardNotice(param: any) {
                //         // 팝업 호출 파라메터 셋팅
//         let item = {
//             id: 'app-dDashboardNotice',
//             reqDlDashboardNoticeParam: param.data
//         }
//         // 팝업 호출
//         this.indexCmp.dialogView(item, (result) => { });
//     }

//     //공지사항 그리드 서치바 검색기능
//     quickSearchNotice() {
    //         this.gridFileData.gridApi.setQuickFilter(this.quickSearchValueNotice);
    //     }
    
    //     //공지사항 모바일 그리드 서치바 검색기능
    //     quickSearchMblNotice() {
        //         this.gridMblFileData.gridApi.setQuickFilter(this.quickSearchValueNotice);
        //     }
        
        //     //*****************************************************************************************
        
        //     //*****************************************************************************************
        //     // 자료실
        //     // 자료실 grid 초기화
        //     onReadyGrid_FileData(event) {
            //         this.gridFileData.gridApi = event.api;
            //         this.gridFileData.gridColumnApi = event.columnApi;
            
            //         // 공지사항 조회
            //         //this.getFileData();
            //         //this.getNotice(this.comConst.TYPE_FILE_DATA);
            //     }
            
            //     onReadyGrid_MblFileData(event) {
                //         this.gridMblFileData.gridApi = event.api;
                //         this.gridMblFileData.gridColumnApi = event.columnApi;
                
                //         // 공지사항 조회
                //         //this.getFileData();
                //         this.getNotice(this.comConst.TYPE_FILE_DATA);
                //     }
                
                //     //자료실 재조회
                //     refreshFileData = () => { this.getNotice(this.comConst.TYPE_FILE_DATA) }
                
                //     //자료실 그리드 서치바 검색기능
                //     quickSearchFileLibrary() {
                    //         this.gridNotice.gridApi.setQuickFilter(this.quickSearchValueFileLibrary);
                    //     }
                    
                    //     //*****************************************************************************************
                    
                    //     // grid row 이벤트
                    //     agGridRowEvent(params) {
                        //         this.openDlDashboardNotice(params);
                        //     }
                        
                        // }
                        
                        
    // // 공지사항
    // // 1. 조회 Model
    // public noticeModel: NoticeModel = new NoticeModel();
    // // 2. 팝업 
    // public isDlDashboardNoticeDialog: boolean = false;
    // public reqDlDashboardNoticeParam: any;
    // // 3. 그리드
    // public gridNotice: GridNotice = new GridNotice(this.comFun, this.comFormat);
    
    // //모바일 공지사항 그리드
    // public gridMblNotice: GridMblNotice = new GridMblNotice(this.comFun, this.comFormat);
    
    // // 자료실
    // // 3. 그리드
    // public gridFileData: GridFileData = new GridFileData(this.comFun, this.comFormat);
    
    // //모바일 자료실 그리드
    // public gridMblFileData: GridMblFileData = new GridMblFileData(this.comFun, this.comFormat);
    
    // public quickSearchValueFileLibrary: string = '';
    // public quickSearchValueNotice: string = '';
