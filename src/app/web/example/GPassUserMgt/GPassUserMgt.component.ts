/**
* ===========================================================
* 생성/수정일 					작성자          내용
* ===========================================================
* 2022-07-01 15:34:23                         최초생성
*/
declare var Ext: any;
import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { GPassUserMgtModel } from './model/GPassUserMgt.model';
import { ApiHttpServiceImpl } from '../../../shared/api-http-service-impl';
import { EnvService } from '../../../shared/env.service';
import { ComFunction } from '../../../shared/com.function';
import { ComValidation } from '../../../shared/com.validation';
import { HttpErrorResponse } from '@angular/common/http';
import { IndexComponent } from 'src/app/index/index.component';
import { ComConst } from 'src/app/shared/com.const';
import { GridMain } from './grid/GridMain';
import { ComFormat } from 'src/app/shared/com.format';
import { ButtonViewManager } from 'src/app/shared/buttonViewManager';

@Component({
	selector: 'app-GPassUserMgt',
	templateUrl: './GPassUserMgt.component.html',
	providers: [ApiHttpServiceImpl],
})

export class GPassUserMgtComponent implements OnInit {
	@Input() public route: any;

	// ****************************
	// Base
	public FormPanelCmp: any;		// Form Component
	public searchFormCmp: any;		// Search Form Component 
	// ****************************

	// ****************************
	// Model
	public searchModel: GPassUserMgtModel = new GPassUserMgtModel();	// search Model
	public formModel: GPassUserMgtModel = new GPassUserMgtModel();		// form model
	// ****************************

	// ****************************
	// Grid
	public gridMain: GridMain = new GridMain(this.comFun, this.comFormat);
	// ****************************

	// ****************************
    // Business
	public btnViewMgr: ButtonViewManager = new ButtonViewManager(this.comConst);	// 화면제어
	// ****************************

	// ****************************
	// cbs(comboBox Store)
	public cbsUseYn: any = [
		{ comboId: 'Y', comboNm: 'Y' },
		{ comboId: 'N', comboNm: 'N' }
	];
	// ****************************

	// ****************************
	// 기초변수
	public isEditForm	: boolean = true;	// Form Edit 제어
	public isEditSearch	: boolean = false;	// select Field Edit 제어
	public isEditUserId	: boolean = true;	// 사용자 ID Disable
	public isRequired : boolean = true;
	// ****************************

	constructor(
		private apiHttpServiceImpl: ApiHttpServiceImpl,
		public envService: EnvService,
		public comFun: ComFunction,
		public comVal: ComValidation,
		public indexCmp: IndexComponent,
		public comConst: ComConst,
		public comFormat: ComFormat) { }

	//*******************************************************[INIT]>>>
	// Init
	ngOnInit() {
		this.btnViewMgr.ChangeViewMode(this.comConst.BTN_MODE_INIT);
	}

	// Form Panel Component
	onFormPanelReady(event) {
		this.FormPanelCmp = event.cmp;
	}

	// Search Panel Component
	onSearchFormReady(event) {
		this.searchFormCmp = event.cmp;
	}
	//*******************************************************[INIT]<<<

	//*******************************************************[EVENT]>>>
	// [BUTTON]
	// 조회 버튼
	onTapQuery(event) {
		// 조회 통신
		this.apiSelectList(this.searchModel);
	}

	// 신규 버튼
	onTapNew(event) {
		this.btnViewMgr.ChangeViewMode(this.comConst.BTN_MODE_NEW);

		// 초기화
		this.funcFieldClear("F");

		// formfield 활성화
		this.isEditForm = false;
		this.isEditUserId = false;	// 사용자 ID 수정
	}

	// 수정 버튼
	onTapModify(event) {
		if(this.gridMain.rowId === undefined){
			return;
		}

		this.btnViewMgr.ChangeViewMode(this.comConst.BTN_MODE_MODIFY);

		// formfield 활성화
		this.isEditForm = false;
		this.isEditUserId = true;	// 사용자 ID 수정불가

		// 그리드 상태 수정(수정모드)
		this.comFun.gridRowStatControl("U", this.gridMain.gridApi, this.gridMain.rowId);
	}

	// 삭제 버튼
	onTapDelete(event) {
		if(this.gridMain.rowId === undefined){
			return;
		}

		this.btnViewMgr.ChangeViewMode(this.comConst.BTN_MODE_DELETE);
		this.comFun.confirm(this.comFun.i18n('삭제'), this.comFun.i18n('alertDeleteMsg'), (e) => {
			//yes or no
			if (e === 'yes') {
				// api 호춣
				this.apiDeleteForm();
			}
			else {
				this.btnViewMgr.BeforeMode();
			}
		});
	}

	// 저장 버튼
	onTapSave(event) {
		if (this.FormPanelCmp.isValid() === true) {
			this.comFun.confirm(this.comFun.i18n('저장'), this.comFun.i18n('alertSaveMsg'), (e) => {
				if (e === 'yes') {
					// 모드 저장
					this.btnViewMgr.ChangeViewMode(this.comConst.BTN_MODE_SAVE);
					// api 호출
					this.apiSaveForm(this.btnViewMgr.beforeTaskMode, this.formModel); // 수정, 신규모드
				}
			});
		}
	}

	// 취소 버튼
	onTapCancel(event) {
		if (this.btnViewMgr.taskMode === this.comConst.BTN_MODE_NEW || this.btnViewMgr.taskMode === this.comConst.BTN_MODE_MODIFY) {
			if(this.gridMain.rowId !== undefined){
				// 그리드 상태 수정(수정모드)
				this.comFun.gridRowStatControl("", this.gridMain.gridApi, this.gridMain.rowId);
			}

			const rowData = [];
			this.gridMain.gridApi.forEachNode(node => rowData.push(node.data));

			if (rowData.length > 0) {
				this.btnViewMgr.ChangeViewMode(this.comConst.BTN_MODE_SEARCH);
				this.funcFieldClear("F");	// 필드 초기화
			} else {
				this.btnViewMgr.ChangeViewMode(this.comConst.BTN_MODE_INIT);
				this.funcFieldClear("ALL");	// 필드 초기화
			}
		}
		else {
			if (Object.keys(this.formModel).length !== 0) {
				this.btnViewMgr.ChangeViewMode(this.comConst.BTN_MODE_SEARCH);
				this.funcFieldClear("F");	// 필드 초기화
			} else {
				this.btnViewMgr.ChangeViewMode(this.comConst.BTN_MODE_INIT);
				this.funcFieldClear("ALL");	// 필드 초기화
			}
		}
	}
	
	//[COMBO BOX]
	// 삭제여부 select
	onSelectCbDeleteYn(event) {
		let comboId = event.newValue.data.comboId

		if(!this.comFun.isEmpty(comboId))
		{
			this.comFun.blurField(comboId, this.gridMain.gridApi, this.formModel, this.gridMain.rowId, 'deleteYn');
			this.formModel.deleteYn = comboId;
		}
	}
	//*******************************************************[EVENT]<<<

	//*******************************************************[GRID]>>>
	// grid 초기화
	onReadyGrid(event) {
		this.gridMain.gridApi = event.api;
		this.gridMain.gridColumnApi = event.columnApi;

		// 조회 통신
		this.apiSelectList(this.searchModel);
	}

	// grid row 이벤트
	agGridRowEvent(params) {
		if (this.btnViewMgr.taskMode === this.comConst.BTN_MODE_NEW || this.btnViewMgr.taskMode === this.comConst.BTN_MODE_MODIFY) {
			this.comFun.alert(this.comFun.i18n('확인'), "입력 중에는 선택 할 수 없습니다.");
		}
		else {
			// 삭제 row 선택 불가
			if (params.data.rowStat === "D")
				this.funcFieldClear("F");
			else {
				this.gridMain.rowId = params.node.id; //선택한 row id 저장

				// 서버 조회
				this.apiSelectOne(params.data);
			}
		}
	}
	//*******************************************************[GRID]<<<

	//*******************************************************[API]>>>
	// api 조회
	apiSelectOne(paramModel : any) {
		// 모드 저장
		this.btnViewMgr.ChangeViewMode(this.comConst.BTN_MODE_SEARCH);

		if (this.searchFormCmp.isValid() === true) {
			this.apiHttpServiceImpl.selectList("/api/sample/GPassUserMgt/selectList", paramModel).subscribe(
				(res: any) => {
					// FormModel 출력
					if (res.success === true) {
						var jsonRes = JSON.parse(res.resModel);
						this.formModel = jsonRes[0];
						// this.formModel.userPass = '';
					}
					else {
						this.comFun.alert(this.comFun.i18n('확인'), "조회 결과가 없습니다.");
					}
				},
				(err: HttpErrorResponse) => { //1-오류시
					this.comFun.alert(this.comFun.i18n('오류'), this.comFun.i18n('alertErrorMsg'));
				}
			);
		} else {
			this.comFun.alert(this.comFun.i18n('경고'), this.comFun.i18n('alertFormValidateMsg'));
		}
	}

	// api 조회
	apiSelectList(paramModel : any) {
		// 모드 저장
		this.btnViewMgr.ChangeViewMode(this.comConst.BTN_MODE_SEARCH);

		if (this.searchFormCmp.isValid() === true) {
			this.apiHttpServiceImpl.selectList("/api/sample/GPassUserMgt/selectList", paramModel).subscribe(
				(res: any) => {
					this.funcFieldClear("F");	// 초기화

					// 그리드 영역 출력
					if (res.success === true) {
						this.btnViewMgr.ChangeViewMode(this.comConst.BTN_MODE_SEARCH);
						var jsonRes = JSON.parse(res.resModel);
						this.gridMain.rowData = jsonRes;
					}
					else {
						this.comFun.alert(this.comFun.i18n('확인'), "조회 결과가 없습니다.");
						this.gridMain.rowData = [];
					}
				},
				(err: HttpErrorResponse) => { //1-오류시
					this.comFun.alert(this.comFun.i18n('오류'), this.comFun.i18n('alertErrorMsg'));
				}
			);
		} else {
			this.comFun.alert(this.comFun.i18n('경고'), this.comFun.i18n('alertFormValidateMsg'));
		}
	}

	// api 삭제
	apiDeleteForm() {
		if (this.searchFormCmp.isValid() === true) {
			let reqModel = new GPassUserMgtModel();
			reqModel = this.formModel;
			reqModel.deleteYn = 'Y';

			this.apiHttpServiceImpl.selectList("/api/sample/GPassUserMgt/deleteUserMgt", reqModel).subscribe(
				(res: any) => { //1-성공시
					// 초기화
					this.funcFieldClear("F");
					// 조회 모드 변경
					this.btnViewMgr.ChangeViewMode(this.comConst.BTN_MODE_SEARCH);
					// 그리드 Row 삭제
					this.comFun.gridRowDelete(this.gridMain.gridApi);
				},
				(err: HttpErrorResponse) => { //1-오류시
					this.comFun.alert(this.comFun.i18n('오류'), this.comFun.i18n('alertErrorMsg'));
				}
			);
		} else {
			this.comFun.alert(this.comFun.i18n('경고'), this.comFun.i18n('alertFormValidateMsg'));
		}
	}

	// api 저장
	apiSaveForm(mode, saveMd) {
		if (this.FormPanelCmp.isValid() === true) {
			// 키값만 조회한다.
			this.apiHttpServiceImpl.selectList("/api/sample/GPassUserMgt/selectList", { 'userId': saveMd.userId }).subscribe(
				(res: any) => {
					if (res.success === true) {
						// 조회 성공
						switch (mode) {
							case this.comConst.BTN_MODE_MODIFY:
								// UPDATE
								this.apiSaveForm_update(saveMd);
								break;
							case this.comConst.BTN_MODE_NEW:
							default:
								this.comFun.alert(this.comFun.i18n('경고'), "저장할 수 없습니다. <br>중복된 아이디가 있습니다.");
								this.btnViewMgr.BeforeMode();
								break;
						}
					} else {
						// 조회 실패
						switch (mode) {
							case this.comConst.BTN_MODE_NEW:
								// INSERT
								this.apiSaveForm_insert(saveMd);
								break;
							case this.comConst.BTN_MODE_MODIFY:
							default:
								this.comFun.alert(this.comFun.i18n('경고'), "저장할 수 없습니다. <br>데이터를 확인해 주세요.");
								this.btnViewMgr.BeforeMode();
								break;
						}
					}
				},
				(err: HttpErrorResponse) => { //1-오류시
					this.comFun.alert(this.comFun.i18n('경고'), this.comFun.i18n('alertFormValidateMsg'));
					this.btnViewMgr.BeforeMode();
				}
			);
		} else {
			this.comFun.alert(this.comFun.i18n('경고'), this.comFun.i18n('alertFormValidateMsg'));
			this.btnViewMgr.BeforeMode();
		}
	}

	// 유저 정보 저장 (insert)
	apiSaveForm_insert(saveMd) {
		this.apiHttpServiceImpl.saveForm("/api/sample/GPassUserMgt/insertUserMgt", saveMd).subscribe(
			(res: any) => {
				if (res.success === true) {
					// 초기화
					this.funcFieldClear("F");
					// 조회 모드 변경
					this.btnViewMgr.ChangeViewMode(this.comConst.BTN_MODE_SEARCH);
					//***************************************************
					// 그리드 정렬 (신규데이터 최상단 위치저장)
					const rowData = [];

					rowData.push(saveMd);
					rowData[0].rowStat = "C";

					this.gridMain.gridApi.forEachNode(node => rowData.push(node.data)); // 기존 데이터 불러오기
					this.gridMain.rowData = rowData;	// 그리드 데이터 교체
					this.gridMain.gridApi.setFocusedCell(0, "localGovCd"); // 포커스 이동
					//***************************************************
				}
				else {
					this.comFun.alert(this.comFun.i18n('오류'), this.comFun.i18n('alertErrorMsg'));
					this.btnViewMgr.BeforeMode();
				}
			},
			(err: HttpErrorResponse) => {
				this.comFun.alert(this.comFun.i18n('오류'), this.comFun.i18n('alertErrorMsg'));
				this.btnViewMgr.BeforeMode();
			}
		);
	}

	// 유저 정보 저장 (update)
	apiSaveForm_update(saveMd) {
		this.apiHttpServiceImpl.saveForm("/api/sample/GPassUserMgt/updateUserMgt", saveMd).subscribe(
			(res: any) => {
				if (res.success === true) {
					// 초기화
					this.funcFieldClear("F");
					// 조회 모드 변경
					this.btnViewMgr.ChangeViewMode(this.comConst.BTN_MODE_SEARCH);
				}
				else {
					this.comFun.alert(this.comFun.i18n('오류'), this.comFun.i18n('alertErrorMsg'));
					this.btnViewMgr.BeforeMode();
				}
			},
			(err: HttpErrorResponse) => {
				this.comFun.alert(this.comFun.i18n('오류'), this.comFun.i18n('alertErrorMsg'));
				this.btnViewMgr.BeforeMode();
			}
		);
	}
	//*******************************************************[API]<<<

	//*******************************************************[POPUP]>>>
	//###################################
	// openPopup 팝업 Sample
	//###################################
	openPopup = () => {
		// 팝업 모드 변경
		this.btnViewMgr.ChangeViewMode(this.comConst.BTN_MODE_POPUP);

		// 팝업 호출 파라메터 셋팅
		let item = {
			id: 'app-dPopupSample',
			paramA: '파라메터 테스트'
		}

		// 팝업 호출
		this.indexCmp.dialogView(item, (result) => {
			//결과처리 [List]
			
		});
		this.btnViewMgr.BeforeMode();
	}
	//*******************************************************[POPUP]<<<

	//*******************************************************[FUNC]>>>
	// 필드 초기화
	funcFieldClear(flag) {
		this.comFun.gridClearRowSelect(this.gridMain);	// 그리드 선택 초기화
		switch (flag) {
			case "F":	// FormField
				this.formModel = new GPassUserMgtModel();
				this.isEditForm = true;
				this.isEditUserId = true;
				break;
			case "S":	// SearchField
				this.searchModel = new GPassUserMgtModel();
				break;
			case "A":
			default:	// ALL
				this.gridMain.rowData = [];
				this.formModel = new GPassUserMgtModel();
				this.isEditForm = true;
				this.isEditSearch = true;
				this.isEditUserId = true;
				break;
		}
	}
	//*******************************************************[FUNC]<<<
}