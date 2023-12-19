/**
 * @메뉴명 	    : 메뉴얼 Dialog
 * @기능		: 메뉴얼 조회 공통 Dialog
 * 부모화면에서 아래와 같이 호출한다
 * this.isMenualDialog 		-> 화면 표시 여부 true/false
 * this.menualNm			-> 메뉴얼 PDF 파일명
 * closeMenualDialog()      -> 코드 창이 닫히면 해당 함수를 만들어서 함수 안에 this.isDialogShowing = false; 추가
 * <app-menualDialog
        [isMenualDialog]="this.isMenualDialog"
        [menualNm]="this.menualNm"
        (closeMenualDialog)="closeMenualDialog()"
    ></app-menualDialog>
 * ===========================================================
 * 생성/수정일 			작성자 		비고 
 * -----------------------------------------------------------
 * 2021-08-04			최용권		최초생성									                        
 */

declare var Ext: any;
import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef, ElementRef } from '@angular/core';
import { EnvService } from '../../shared/env.service';
import { ComFunction } from '../../shared/com.function';
import { ComValidation } from '../../shared/com.validation';

@Component({
	selector: 'app-menualDialog',
	templateUrl: './menual.component.html',
})
export class DialogMenualComponent implements OnInit  {

	@Input() public route: any;

	@Input() public isMenualDialog : boolean = false;			//화면 표시 유무

	@Input() public menualNm : string;							//메뉴얼 파일명

	@Output() public closeMenualDialog: any = new EventEmitter();	//팝업창 닫기

	public serverUrl = this.envService.serverUrl;				//서버주소

	constructor(public envService: EnvService,
				public comFun: ComFunction, 
				public comVal: ComValidation, 
				private cd: ChangeDetectorRef,
				private hostElement: ElementRef) { }
	
	ngOnInit() { 
		const iframe = this.hostElement.nativeElement.querySelector('iframe')
		iframe.src = this.getMenualUrl();
	}

	ngOnChanges(){
        
    }

	//메뉴얼 url
	getMenualUrl(){

		//메뉴얼 호출 주소 셋팅
		if( !(this.menualNm.substr(0,1) === '/') ){
			this.menualNm = `/${this.menualNm}`;
		}
		return `${this.serverUrl}/menual${this.menualNm}`;
		
	}

	//팝업창 닫기버튼 이벤트
	onCancel(){
		this.isMenualDialog = false;
		this.cd.detectChanges();
	}

	//팝업창(다이얼로그) 창 사라질때 발생하는 이벤트
	onHide = () => {
		//부모 함수 호출
		this.closeMenualDialog.emit();
	}

}