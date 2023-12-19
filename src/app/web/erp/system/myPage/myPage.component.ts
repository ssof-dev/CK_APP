declare var Ext: any;
import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { IndexComponent } from 'src/app/index/index.component';
import { MyPageModel, MyPageService } from './service/myPage.server';
import { ComFunction } from 'src/app/shared/com.function';
import { ComValidation } from 'src/app/shared/com.validation';
import { EnvService } from 'src/app/shared/env.service';
import { CommonService } from 'src/app/shared/common-service';
import { AgGridConfig } from 'src/app/shared/ag-Grid-Config';
import { ComAlert } from 'src/app/shared/com.alert';

@Component({
    templateUrl: 'myPage.component.html',
    styleUrls: ['./myPage.component.scss'],
    providers: [ CommonService, MyPageService ],
})

export class MyPageComponent implements OnInit{

    public formModel: MyPageModel = new MyPageModel(); //form model

    private comAlert: ComAlert = new ComAlert();

    //Hidden 요소
    labelHidden: boolean = false;
    textDisabled: boolean = true;

    //입력된 userId 저장소
    inputId: string = '';

    //입력된 userNkn 저장소
    inputNkn: string = '';

    public btnDisable = {
		searchBtn 	: true,			    //조회
		saveBtn		: true,				//저장
		modifyBtn	: false,			//수정
		deleteBtn	: true,			    //삭제
		newBtn		: true,			    //신규
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
        private service: MyPageService,
        public indexCmp: IndexComponent){

    }

    ngOnInit(){
        this.apiSelectList(this.formModel);
    }

    //로그인 상세 정보 조회
    apiSelectList(param){
        this.service.selectList({'userId':this.envService.userInfo.userId}).subscribe({
            next: (resp: any) => {
                if( resp.stateCd === 'OK' || resp.stateCd === 'NO_DATA'){

                    //resp의 결과 값에서 data목록에서 0번쨰를 넣어준다.
                    this.formModel = JSON.parse(JSON.stringify(resp.data[0]))
                }

            },
            error: (error: any) =>{
                this.comAlert.showAlert('error', '', `통신오류!!`, false);
            }
        })
    }

    //수정 버튼
    labelHiddenEvent(){

        //히든 요소 변경
        this.labelHidden = true;

        //저장버튼 활성화/ 수정버튼 비활
        this.btnDisable.saveBtn = false;
        this.btnDisable.modifyBtn = true;
    }

    //저장 버튼
    saveInfo(inputNkn){
        //아이디를 변경해야 하는가? 아이디 변경시 오류 발생


        // //아이디가 변경되지 않았을 경우
        // if(inputId === '' || inputId === null){
        //     inputId = this.formModel.userId;
        // }

        //닉네임이 변경되지 않았을 경우
        if(inputNkn === '' || inputNkn === null){
            inputNkn = this.formModel.userNkn;
        }

        let param = {
            userId: this.formModel.userId, 
            inputUserNkn: inputNkn,
            rowType: 'update'
        }

        console.log(param);

        this.service.svaeUserInfo(param).subscribe({
            next:(response: any) =>{

                if(response.stateCd === "OK"){
                    //저장버튼 비활/ 수정버튼 활성화
                    this.btnDisable.saveBtn = true;
                    this.btnDisable.modifyBtn = false;

                    //히든 요소 변경
                    this.labelHidden = false;
    
                    this.formModel = new MyPageModel();
                    //다시 조회
                    this.apiSelectList(this.formModel);
                }
            },
            error:(error: any) =>{
                console.log('오류입니다.')
            }
        })
    }

    //취소 버튼
    cencleBtn(){
        this.labelHidden = false;

        //저장버튼 비활/ 수정버튼 활성화
        this.btnDisable.saveBtn = true;
        this.btnDisable.modifyBtn = false;
    }

}