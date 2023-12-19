declare var Ext: any;
import { Component, OnInit, Input } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { IndexComponent } from 'src/app/index/index.component';
import { UserMngtModel, UserMngtService } from './service/userMngt.server';
import { ComFunction } from 'src/app/shared/com.function';
import { ComValidation } from 'src/app/shared/com.validation';
import { EnvService } from 'src/app/shared/env.service';
import { CommonService } from 'src/app/shared/common-service';
import { AgGridConfig } from 'src/app/shared/ag-Grid-Config';
import { UserGridColums } from './gridColums/userGrid-Colums';
import { LoginGridColums } from './gridColums/loginGrid-Colums';
import { AuthGridColums } from './gridColums/authGrid-Colums';
import { ComAlert } from 'src/app/shared/com.alert';

@Component({
    templateUrl: 'userMngt.component.html',
    styleUrls: [ './userMngt.component.scss'],
    providers: [CommonService, UserMngtService],
})

export class UserMngtComponent implements OnInit {

    @Input() public route: any;

    public searchModel:UserMngtModel = new UserMngtModel();

    //공통코드
	public codeModel : any;

    private comAlert: ComAlert = new ComAlert();

    public isFormDisabled: boolean = true;

    //사용자 그리드 기본 설정 & 컬럼 정의
    userGridConfig: AgGridConfig = new AgGridConfig();
    userGridColums!: UserGridColums;

    //사용자 상세 보기 모델
    userModel : any

    //사용자 로그인 정보 그리드 기본 설정 & 컬럼 정의
    loginGridConfig: AgGridConfig = new AgGridConfig();
    loginGridColums!: LoginGridColums;

    //사용자 권한 정보 그리드 기본 설정 & 컬럼 정의
    authGridConfig: AgGridConfig = new AgGridConfig();
    authGridColums!: AuthGridColums;

    public btnDisable = {
		searchBtn 	: false,			//조회
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
        private service: UserMngtService,
        public indexCmp: IndexComponent){

    }

    ngOnInit(){

        //화면에서 사용할 공통코드 초기화
        let param = {
            codes: [
                'USE_YN', 'USER_TNK', 'USER_POS', 'USER_ECOMP', 'USER_LCOMP'
            ]
        };
        this.commService.getCommonCodes(param).subscribe({
            next:(resp: any) =>{
                this.codeModel = resp.data;
            },
            complete:() =>{
                //콩통코드 조회 처리후 그리드 컬럼 생성
                this.userGridColums = new UserGridColums(this.userGridConfig, this);
                this.loginGridColums = new LoginGridColums(this.loginGridConfig, this);
                this.authGridColums = new AuthGridColums(this.authGridConfig, this);
            }
        })
    }

    onTapQuery(){
        //초기화
        this.userGridConfig.clear();
        this.loginGridConfig.clear();
        this.authGridConfig.clear();

        this.service.selectUserMngtList(this.searchModel).subscribe({
            next: (response: any) => {
                if( response.stateCd === 'OK' || response.stateCd === 'NO_DATA'){
                    this.userGridConfig.dataSource = response;
                }else{
                    this.comAlert.showAlert('error', '', response.stateMsg, false);
                }
            },
            error: (error: any) =>{
                this.comAlert.showAlert('error', '', `통신오류!!`, false);
            }
        })
    }

    onTapSave(){

    }

    onTapNew(){

    }

    onTapDelete(){

    }

    onTapCancel(){
        
    }

    userGridSelectionChanged(e: any){
        
    }
}