declare var Ext: any;
import { Component, OnInit, Input, AfterViewInit, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { IndexComponent } from 'src/app/index/index.component';
import { CompRegistModel, CompdModel, CompRegistService } from './service/compRegist.server';
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
    searchModel: CompRegistModel = new CompRegistModel();

    //공용버튼 제어
    authButtonDisabled!: AuthButtonDisabledModel;

    //공통코드
	public codeModel : any;

    //사용업체 그리드
    compmGridConfig: AgGridConfig = new AgGridConfig();
    compmGridColums!: CompmGridColums;

    //사용업체 폼 모델
    compmModel: CompRegistModel = new CompRegistModel();

    //업체상세 폼 모델
    compdModel: CompdModel = new CompdModel();

    //사용업체 상세정보 그리드
    compdGridConfig: AgGridConfig = new AgGridConfig();
    compdGridColums!: CompdGridColums;

    //업체구분 활성화 여부
    compmFormDisable : boolean = true;

    //회계기 상세정보 활성화 여부
    compdFormDisable : boolean = true;

    textRequired : boolean = false;

    saveType : any;


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

                //공통버튼 활성화
                this.authButton.gridClickBtnDisableControll();
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
        this.service.selectCompRegistList(this.searchModel).subscribe({
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

    //업체 그리드 행 클릭 시 해당 정보 업체폼에 전달
    compdGridSelection(e: any){

        //업체 회계기정보 그리드에서 현재 선택된 행에 대한 데이터를 가져오기
        let param = this.compdGridConfig.gridApi.getSelectedRows();

        if(param.length === 1){

            //업체상세 모델에 데이터를 저장
            this.compdModel = JSON.parse(JSON.stringify(param[0]));
        }        
    }

    //업체 그리드 행 2개 이상 선택시 업체상세 그리드 초기화
    checkSelectRow(e: any){

        //선택한 체크박스 감지
        let compmData = this.compmGridConfig.gridApi.getSelectedNodes();

        if(compmData.length > 1){

            //회계기 정보 그리드 초기화
            this.compdGridConfig.gridApi.setRowData([]);
        }
    }

    
    //조회 버튼 이벤트
    onTapQuery(){
        
    }
    
    //신규 버튼 이벤트
    onTapNew(){
        //저장 타입 변경
        this.saveType = 'insert';

        //그리드 클릭 비활
        this.compmGridConfig.gridClickOption = true;
        this.compdGridConfig.gridClickOption = true;

        //저장 버튼 활성화
        this.authButton.allKillBtnControll();
        this.authButton._authButtonDisabled.saveBtn = false;
        
        //회사코드의 선택된 행 데이터 가져오기
        let compmRows = this.compmGridConfig.gridApi.getSelectedRows();
        let compdRows = this.compdGridConfig.gridApi.getSelectedRows();
        
        //업체선택 후 신규버튼 클릭 시 회사코드정보, 회계기상세정보 모두 입력
        if(compmRows.length === 0 && compdRows.length > 0){
            this.comFun.alert(this.comFun.i18n('확인'), "회사코드를 선택해주세요");

            //선택초기화
            this.compdGridConfig.gridApi.deselectAll();

            //폼 초기화
            this.compdModel = new CompdModel();

        }else if((compmRows.length === 1 && compdRows.length === 0) || compmRows.length === 0){
            
            //폼 초기화
            this.compmModel = new CompRegistModel();
            this.compdModel = new CompdModel();
            
            //선택 초기화
            this.compmGridConfig.gridApi.deselectAll();
            this.compdGridConfig.gridApi.deselectAll();
            
            //회계기 정보 폼 활성화
            this.compmFormDisable = false;
            this.compdFormDisable = false;
            
            this.compmModel.rowType = 'insert';
            this.compdModel.rowType = 'insert';
            
            //사용여부를 지정하여 넘겨주기
            this.compmModel.useYn = 'Y';
            this.compdModel.useYn = 'Y';
            
            
        }else{//회계기상새정보 입력
            
            //폼 초기화
            //this.compmModel = new CompRegistModel();
            this.compdModel = new CompdModel();
            
            
            //회사정보, 회계기정보 폼 활성화
            //this.compmFormDisable = false;
            this.compdFormDisable = false;
            
            //선택초기화
            this.compdGridConfig.gridApi.deselectAll();
            
            //모델 상태 추가
            this.compmModel.rowType = '';
            this.compdModel.rowType = 'insert';
            
            //사용여부 추가
            //this.compmModel.useYn = 'Y';
            this.compdModel.useYn = 'Y';
        }

    }
    
    //수정버튼 이벤트
    onTapEdit(){
        this.saveType = 'edit';
        // if(this.comFun.isEmpty(this.compmModel.useCompNo)
        //     || this.comFun.isEmpty(this.compmModel.useCompNm)
        //     || this.comFun.isEmpty(this.compdModel.useCompKi)
        //     || this.comFun.isEmpty(this.compdModel.ceoNm)){
        //     // this.comAlert.showAlert('false','',`필수값을 입력하세요`, false);
        //     this.comFun.alert(this.comFun.i18n('확인'), "필수값 입력하세요");
        //     return;
        // }
        
        //저장 버튼 활성화
        this.authButton.allKillBtnControll();
        this.authButton._authButtonDisabled.saveBtn = false;
        
        //그리드 선택 여부 체크
        let compmCheck = this.compmGridConfig.gridApi.getSelectedRows();
        let cmopdCheck = this.compdGridConfig.gridApi.getSelectedRows();
        
        //폼들의 데이터 유무를 확인
        if(compmCheck.length > 0 && cmopdCheck.length === 0){
            //폼 활성화
            this.compmFormDisable = false;
            this.compmModel.rowType = 'update';
            
            //그리드 클릭 비활
            this.compmGridConfig.gridClickOption = true;
        }
        
        if(cmopdCheck.length > 0){
            //폼 활성화
            this.compdFormDisable = false;
            this.compdModel.rowType = 'update';
            
            //그리드 클릭 비활
            this.compdGridConfig.gridClickOption = true;
        }

    }
    
    //저장 버튼 이벤트
    onTapSave(){
        //필수항목 활성화
        this.textRequired = true;

        if(this.saveType === 'insert'){
            if(this.comFun.isEmpty(this.compmModel.useCompNo)
                || this.comFun.isEmpty(this.compmModel.useCompNm)
                || this.comFun.isEmpty(this.compdModel.useCompKi)
                || this.comFun.isEmpty(this.compdModel.ceoNm)){
                // this.comAlert.showAlert('false','',`필수값을 입력하세요`, false);
                this.comFun.alert(this.comFun.i18n('확인'), "필수값 입력하세요");
                return;
            }
        }else if(this.saveType === 'edit'){
            //수정 옵션에 따라서 나눠짐
        }

        let param = {
            header : [this.compmModel]
            ,   detail: [this.compdModel]
        }
        
        this.service.saveCompInfo(param).subscribe({
            next:(response: any) =>{
                if(response.stateCd === 'COMPMFIND'){//사업 신규 추가시 사업체 번호가 있을 경우
                    this.comFun.confirm(this.comFun.i18n('확인'), this.comFun.i18n('사업업체번호가 이미 존재합니다. 조회하시겠습니까?'), (e) => {
                        if (e === 'yes'){
                            //use_yn을 다시 Y로 바꿔주고 출력 시켜주기
                            //회사 이름 지워주기
                            this.compmModel.useCompNm = '';
                            
                            this.compmRestore(this.compmModel);

                        }else if(e === 'no'){
                            this.comFun.alert(this.comFun.i18n('확인'), "사업업체번호를 다시 작성해주세요");
                        }
                    });

                }else if(response.stateCd === 'COMPDFIND'){//신규 추가시 회계기 번호가 있을 경우
                    this.comFun.confirm(this.comFun.i18n('확인'), this.comFun.i18n('회계기가 이미 존재합니다. 조회하시겠습니까?'), (e) => {
                        if(e === 'yes'){
                            //use_yn을 다시 Y로 바꿔주고 출력 시켜주기
                            this.compdModel.useCompNo = this.compmModel.useCompNo;
                            this.compdRestore(this.compdModel);

                        }else if(e === 'no'){
                            this.comFun.alert(this.comFun.i18n('확인'), "회계기를 다시 작성해주세요");
                        }
                    });

                }else if(response.stateCd === 'EDITCOMPMFIND'){//사업체 수정시 사업코드가 있을 경우
                    this.comFun.alert(this.comFun.i18n('확인'), "이미 존재하고 있는 회사번호 입니다. 다시 입력해주세요");
                }else if(response.stateCd === 'EDITCOMPDFIND'){//회계기 수정시 회계기 번호가 있을 경우
                    this.comFun.alert(this.comFun.i18n('확인'), "이미 존재하고 있는 회계기번호 입니다. 다시 입력해주세요");
                }else if(response.stateCd === 'OK'){
                    //공용버튼 활성 제어
                    this.authButton.gridClickBtnDisableControll();
                    
                    //그리드 클릭 활성화
                    this.compmGridConfig.gridClickOption = false;
                    this.compdGridConfig.gridClickOption = false;
                    
                    this.compmModel = new CompRegistModel();
                    this.compdModel = new CompdModel();
                    
                    //폼 비활
                    this.compmFormDisable = true;
                    this.compdFormDisable = true;
                    
                    //선택 초기화
                    this.compmGridConfig.gridApi.deselectAll();
                    this.compdGridConfig.gridApi.deselectAll();
                    
                    //사업조회
                    this.apiSelectListHeader();
                }
                
            },
            error:(response: any) =>{
                console.log("error발생")
            }
        })
    }
    
    //바로 보내버리기
    //삭제 버튼 이벤트
    onTapDelete(){
        
        //체크박스가 체크된 행 데이터 가져오기
        let compmData = this.compmGridConfig.gridApi.getSelectedRows();
        let compdData = this.compdGridConfig.gridApi.getSelectedRows();
        
        let param = {
            header: compmData
        ,   detail: compdData
        }
        
        console.log('삭제', param)
        //모달 띄우고 물어보고 지우기
        // this.comAlert.showAlert('question','확인',`회사코드 ${compmData.length}개와 회계기 정보 ${compdData.length}를 삭제하시겠습니까?`, true, (btn:boolean)=>{
        // this.comFun.alert(this.comFun.i18n('확인'), "가맹상태를 선택해 주세요");   
        //     if(btn){
            this.comFun.confirm(this.comFun.i18n('확인'), this.comFun.i18n('회사코드 ' + compmData.length + '개와 회계기 정보 ' + compdData.length + '개를 삭제하시겠습니까?'), (e) => {
                //yes or no
                if (e === 'yes') {
                this.service.deleteComp(param).subscribe({
                    next: (response: any) => {
        
                        if(response.stateCd === 'OK'){
                            
                            //성공 모달 출력
                            //this.comAlert.showAlert('success','',`삭제 성공`, false)
                            this.comFun.alert(this.comFun.i18n('확인'), "삭제 성공");
                            
                            //모델 초기화
                            this.compmModel = new CompRegistModel();
                            this.compdModel = new CompdModel();
                            
                            //선택 초기화
                            this.compmGridConfig.gridApi.deselectAll();
                            this.compdGridConfig.gridApi.deselectAll();
                            
                            //사업조회
                            this.apiSelectListHeader();
                            
                        }
                    },
                    error: (response: any) => {
                        this.comAlert.showAlert('error','',`삭제 실패`, false);
                    }
                })
            }
        });
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

        //필수항목 활성화
        this.textRequired = false;
        
        //공용버튼 활성 제어
        this.authButton.gridClickBtnDisableControll();
        
        //그리드 클릭 활성화
        this.compmGridConfig.gridClickOption = false;
        this.compdGridConfig.gridClickOption = false;
        
        this.compmModel = new CompRegistModel();
        this.compdModel = new CompdModel();

        //회계끼 그리드 초기화
        this.compdGridConfig.clear();
        
        //폼 비활
        this.compmFormDisable = true;
        this.compdFormDisable = true;
        
        //선택 초기화
        this.compmGridConfig.gridApi.deselectAll();
        this.compdGridConfig.gridApi.deselectAll();
    }
    
    zipNoBtn = (event) => {
        // 팝업 호출 파라메터 셋팅
        let item = {
            id: 'app-dSearchAddr'
        }
    
        // 팝업 호출
        this.indexCmp.dialogView(item, (result) => {
            //결과처리 (무조건 List 형식으로 들어옴)
            if (result.length > 0) {
                // paramb :this.codeModel.aa;
            } else {
                // this.codeModel.bb = result[0].bb;
                // 화면 버튼 모드 설정
            }
        });
    }

    reprPersonBtn = (event) =>{

    }

    //업체 정보 복구
    compmRestore(cmModel){
        
        this.service.compmRestore(cmModel).subscribe({
            next: (response: any) => {
                if(response.stateCd === 'RESTORE'){
                    this.comFun.alert(this.comFun.i18n('확인'), "복구 성공");
                }else if(response.stateCd === 'OK'){
                    this.comFun.alert(this.comFun.i18n('확인'), "이미 존재합니다.");
                }
                
                //조회
                this.apiSelectListHeader();

                //초기화 이벤트
                this.onTapCancel()
            },
            error: (response: any) => {
                this.comAlert.showAlert('error','',`오류 발생`, false);
            }
        })

    }

    //회계기 정보 복구
    compdRestore(cdModel){

        this.service.compdRestore(cdModel).subscribe({
            next: (response: any) => {
                if(response.stateCd === 'RESTORE'){
                    this.comFun.alert(this.comFun.i18n('확인'), "복구 성공");
                }else if(response.stateCd === 'OK'){
                    this.comFun.alert(this.comFun.i18n('확인'), "존재합니다.");
                }

                //조회
                this.apiSelectListHeader();

                //초기화 이벤트
                this.onTapCancel()
            },
            error: (response: any) => {
                this.comAlert.showAlert('error','',`오류 발생`, false);
            }
        })
    }

    //사업번호 검색
    searchBtn(rawValue: string){
        
        //검색할 업체번호 저장
        this.searchModel.useCompNm = rawValue;

        //조회
        this.apiSelectListHeader();
    }
}