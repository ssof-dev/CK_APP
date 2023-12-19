/**
 * ===========================================================
* 생성/수정일                작성자          내용
* ===========================================================
* 2021-08-20 15:06:30                         최초생성
*/
declare var Ext: any;
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { IndexComponent } from 'src/app/index/index.component';
import { CodeMngtModel, CodeMngtService } from './service/codeMngt.server';
import { ComFunction } from 'src/app/shared/com.function';
import { ComValidation } from 'src/app/shared/com.validation';
import { EnvService } from 'src/app/shared/env.service';
import { CommonService } from 'src/app/shared/common-service';
import { AgGridConfig } from 'src/app/shared/ag-Grid-Config';
import { HeaderGridColums } from './gridColums/headerGrid-Colums';
import { DetailGridColums } from './gridColums/detailGrid-Colums';
import { ComAlert } from 'src/app/shared/com.alert';
import { AuthButton, AuthButtonDisabledModel } from 'src/app/shared/AuthButton';


@Component({
   templateUrl: 'codeMngt.component.html',
    styleUrls: [ './codeMngt.component.scss' ],
   providers: [CommonService, CodeMngtService],
})
export class CodeMngtComponent implements OnInit {

   @Input() public route: any;

   //조회 Model
    public searchModel:CodeMngtModel = new CodeMngtModel();

   //조회 Form 컴포넌트
   public searchFormCmp : any;

   //공통코드
   public codeModel : any;

    //헤더 그리드 기본 설정 & 컬럼 정의
    headerGridConfig: AgGridConfig = new AgGridConfig();
    headerGridColums!: HeaderGridColums;

    //상세 그리드 기본 설정 & 컬럼 정의
    detailGridConfig: AgGridConfig = new AgGridConfig();
    detailGridColums!: DetailGridColums;

    //Alert
    private comAlert: ComAlert = new ComAlert();

    //공용버튼 제어
    authButtonDisabled!: AuthButtonDisabledModel;
    
    @ViewChild('authButton') authButton: AuthButton;

   constructor(public envService: EnvService,
            public comFun: ComFunction, 
            public comVal: ComValidation,
            private commService: CommonService,
            private service: CodeMngtService,
            public indexCmp: IndexComponent) {}

    /**
     * 🔷🔷🔷🔷🔷 Init 🔷🔷🔷🔷🔷
     */
   ngOnInit() { 

      //화면에서 사용할 공통코드 초기화
      let param = {
            codes: [
                'USE_YN', 'CUST_DIV'
            ]
        };
      this.commService.getCommonCodes(param).subscribe({
            next:(resp: any) =>{
                this.codeModel = resp.data;
            },
            complete:()=>{
                //공통코드 조회 처리후 그리드 컬럼 생성
                this.headerGridColums = new HeaderGridColums(this.headerGridConfig, this);
                this.detailGridColums = new DetailGridColums(this.detailGridConfig, this);
            }
        });
   }

   //공통코드 Lookup
   getLookupDataSource(key: string){
        if( this.codeModel !== undefined ){
            return this.codeModel[key];
        }
    }

    /**
     *  🔷🔷🔷🔷🔷 공용 버튼이벤트 🔷🔷🔷🔷🔷
     */

   //조회 Form 컴포넌트
   onSearchFormReady(event){
      this.searchFormCmp = event.cmp;
   }

   //조회 버튼 이벤트
   onTapQuery(){

      //초기화
        this.headerGridConfig.clear();
        this.detailGridConfig.clear();

        this.service.selectCodeMngtList(this.searchModel).subscribe({
            next: (response: any) => {
                if( response.stateCd === 'OK' || response.stateCd === 'NO_DATA'){
                    this.headerGridConfig.dataSource = response;
                }else{
                    this.comAlert.showAlert('error', '', response.stateMsg, false);
                }
            },
            error: (error: any) => {
                this.comAlert.showAlert('error', '', `통신오류!!`, false);
            }
        });
   }

   //신규 버튼 이벤트
    onTapNew(){
    }

    //수정버튼 이벤트
    onTapEdit(){
    }

    //저장 버튼 이벤트
    onTapSave(){
    }

    //삭제 버튼 이벤트
    onTapDelete(){
       
    }

    //승인요청 버튼 이벤트
    onTapRequest(){
    }

    //승인버튼 이벤트
    onTapApproval(){
    }

    //반려버튼 이벤트
    onTapDenied(){
    }

    //엑셀 버튼 이벤트
   onExportExcel(){
   }

    //PDF 버튼 이벤트
   onExportPdf(){

   }

    //취소버튼 이벤트
    onTapCancel(){
    }

    /**
     *  🔷🔷🔷🔷🔷 그리드 이벤트 🔷🔷🔷🔷🔷
     */

    //Header Grid Row select Changed
    headerGridSelectRowChanged(e: any){
        const selectedRows = this.headerGridConfig.gridApi.getSelectedRows();
        //선택된 row가 하나일때만 상세 항목 조회
        if( selectedRows.length === 1 ){
            this.onTapQueryDetail(selectedRows[0]);

            //공용버튼 활성 제어
            this.authButton.gridRowClickBtnDisableControll();
        }
    }

    //상세 그리드 조회
    onTapQueryDetail(param: any){

        //초기화
        this.detailGridConfig.clear();

        this.service.selectCodeMngtDetailList(param).subscribe({
            next: (response: any) => {
                if( response.stateCd === 'OK' || response.stateCd === 'NO_DATA'){
                    this.detailGridConfig.dataSource = response;
                }else{
                    this.comAlert.showAlert('error', '', response.stateMsg, false);
                }
            },
            error: (error: any) => {
                this.comAlert.showAlert('error', '', `통신오류!!`, false);
            }
        });
    }
}
