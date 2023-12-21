declare var Ext: any;
import { Component, OnInit, Input, AfterViewInit, ViewChild } from '@angular/core';
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
import { AuthButton, AuthButtonDisabledModel } from 'src/app/shared/AuthButton';

@Component({
    templateUrl: 'compRegist.component.html',
    styleUrls: [ './compRegist.component.scss'],
    providers: [CommonService, CompRegistService],
})
export class CompRegistComponent implements OnInit, AfterViewInit{

    @Input() public route: any;

    private comAlert: ComAlert = new ComAlert();

    //조회 model 선언
    searchFormModel: CompRegistModel = new CompRegistModel();

    //공용버튼 제어
    authButtonDisabled!: AuthButtonDisabledModel;

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

    //업체구분 활성화 여부
    compmFormDisable : boolean = true;

    //회계기 상세정보 활성화 여부
    compdFormDisable : boolean = true;


    //업체구분 콤보박스
    public buisnessType: any = [
        { comboId: '1', comboNm: '개인' },
        { comboId: '2', comboNm: '일반법인' },
        { comboId: '3', comboNm: '중소기업중앙회조합' },
        { comboId: '4', comboNm: '일반비영리' },
        { comboId: '5', comboNm: '국가기관' },
    ];

    //세무관리유형 콤보박스
    public taxType: any = [
        { comboId: '1', comboNm: '외부조정' },
        { comboId: '2', comboNm: '간편장부' },
        { comboId: '3', comboNm: '자가조정' },
    ]

    //원가대체여부 콤보박스
    public primeYn: any = [
        { comboId: 'Y', comboNm: '사용'},
        { comboId: 'N', comboNm: '미사용'},
    ]

    @ViewChild('authButton') authButton: AuthButton;

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

        console.log('param', param)

        if(param.length === 1){

            //데이터를 모델에 저장
            this.compmModel = JSON.parse(JSON.stringify(param[0]));

            //공용버튼 활성 제어
            this.authButton.gridClickBtnDisableControll();

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

    compdGridSelection(e: any){

        //업체 상세정보 그리드에서 현재 선택된 행에 대한 데이터를 가져오기
        let param = this.compdGridConfig.gridApi.getSelectedRows();

        if(param.length === 1){

            //업체상세 모델에 데이터를 저장
            this.compdModel = JSON.parse(JSON.stringify(param[0]));
        }
    }

    //조회 버튼 이벤트
    onTapQuery(){

    }

    //신규 버튼 이벤트
    onTapNew(){
    }

    //수정버튼 이벤트
    onTapEdit(){

        //그리드 클릭 비활
        this.compmGridConfig.gridClickOption = true;
        this.compdGridConfig.gridClickOption = true;

        //저장 버튼 활성화
        this.authButton.allKillBtnControll();
        this.authButton._authButtonDisabled.saveBtn = false;

        //폼들의 데이터 유무를 확인
        if(this.compmModel.useCompNo != null || this.compmModel.useCompNo != ''){
            //폼 활성화
            this.compmFormDisable = false;
        }

        if(this.compdModel.useCompKi != null || this.compdModel.useCompKi != ''){
            //폼 활성화
            this.compdFormDisable = false;
        }
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

        //공용버튼 활성 제어
        this.authButton.gridClickBtnDisableControll();

        //그리드 클릭 활성화
        this.compmGridConfig.gridClickOption = false;
        this.compdGridConfig.gridClickOption = false;

        //폼 비활
        this.compmFormDisable = true;
        this.compdFormDisable = true;

        //선택 초기화
        this.compmGridConfig.gridApi.deselectAll();
        this.compdGridConfig.gridApi.deselectAll();
    }
    
}