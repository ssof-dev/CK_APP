declare var Ext: any;
import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { IndexComponent } from 'src/app/index/index.component';
import { CompRegistModel, CompRegistService } from './service/compRegist.server';
import { ComFunction } from 'src/app/shared/com.function';
import { ComValidation } from 'src/app/shared/com.validation';
import { EnvService } from 'src/app/shared/env.service';
import { CommonService } from 'src/app/shared/common-service';
import { AgGridConfig } from 'src/app/shared/ag-Grid-Config';
import { ComAlert } from 'src/app/shared/com.alert';
import { CompdGridColums } from './gridColums/compdGrid-Colums';
import { CompmGridColums } from './gridColums/compmGrid-Colums';

@Component({
    templateUrl: 'compRegist.component.html',
    styleUrls: [ './compRegist.component.scss'],
    providers: [CommonService, CompRegistService],
})
export class CompRegistComponent implements OnInit, AfterViewInit{

    private comAlert: ComAlert = new ComAlert();

    //조회 model 선언
    searchFormModel: CompRegistModel = new CompRegistModel();

    //공통코드
	public codeModel : any;

    //사용업체 그리드
    compmGridConfig: AgGridConfig = new AgGridConfig();
    compmGridColums!: CompmGridColums;

    //사용업체 폼 모델
    compmModel: any = [];

    //업체상세 폼 모델
    compdModel: any = [];

    //사용업체 상세정보 그리드
    compdGridConfig: AgGridConfig = new AgGridConfig();
    compdGridColums!: CompdGridColums;

    //사용업체 폼 활성화, 비활성화 여부
    //마더폼 활성화 여부
    compmFormDisable : boolean = false;

    //자식폼 활성화 여부
    compdFormDisable : boolean = false;

    public buisnessType: any = [
        { comboId: '1', comboNm: 'test1' },
        { comboId: '2', comboNm: 'test2' },
        { comboId: '3', comboNm: 'test3' }
    ];

    public btnDisable = {
		searchBtn 	: true,			    //조회
		saveBtn		: true,				//저장
		modifyBtn	: false,			//수정
		deleteBtn	: false,			//삭제
		newBtn		: false,			//신규
		reqApprBtn	: true,				//승인요청	
		apprBtn		: true,				//승인
		rejectBtn	: true,				//반려
		excelBtn	: false,			//엑셀
		reportBtn	: false,			//출력
		menualBtn	: false,			//메뉴얼
		cancelBtn	: false				//취소
	}
    
    constructor(public envService: EnvService,
        public comFun: ComFunction, 
        public comVal: ComValidation,
        private commService: CommonService,
        private service: CompRegistService,
        public indexCmp: IndexComponent) {}

    ngOnInit(){
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
                this.compmGridColums = new CompmGridColums(this.compmGridConfig, this);
                this.compdGridColums = new CompdGridColums(this.compdGridConfig, this);


            }
        })
    }

    ngAfterViewInit(){
        //자동조회
        setTimeout(() => {
            this.apiSelectListHeader();
        }, 100);
    }

    //사용중인 업체 목록 조회
    apiSelectListHeader(selectKey?:any){

        //초기화
        this.compdGridConfig.clear();
        this.compmGridConfig.clear();

        //업체 목록 조회
        this.service.selectCompRegistList(this.searchFormModel).subscribe({
            next:(response: any) =>{
                
                if(response.stateCd === 'OK' || response.stateCd === 'NO_DATA'){
                    this.compmGridConfig.dataSource = response;
                }else{
                    this.comAlert.showAlert('error', '', response.stateMsg, false);
                }
            },
            error:(error: any) => {

            }
        });

    }

    //업체 목록에서 선택한 업체의 상세 정보 및 폼으로 전달
    compmGridSelection(e: any){

        //업체 그리드에서 현재 선택된 행에 대한 데이터를 반환
        let param = this.compmGridConfig.gridApi.getSelectedRows();

        if(param.length === 1){

            //데이터를 폼에 전달
            this.compmModel = JSON.parse(JSON.stringify(param[0]));

            this.apiSelectionCompdList(param[0]);
        }
    }

    //선택한 업체의 상세정보 조회
    apiSelectionCompdList(param:any){

        //초기화
        this.compdGridConfig.clear();

        this.service.selectCompdList(param).subscribe({
            next: (response: any) => {
                if(response.stateCd === 'OK' || response.stateCd === 'NO_DATA'){
                    console.log('결과값',response)

                    this.compdGridConfig.dataSource = response;
                }
            },
            error: (error: any) =>{
                
            }
        })
    }

    editBtn_first(){
        this.compmFormDisable =false;
    }

    editBtn_second(){
        this.compdFormDisable =false;
    }

    
}