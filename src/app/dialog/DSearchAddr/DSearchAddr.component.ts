	declare var Ext: any;
	import {
	Component,
	OnInit,
	Input,
	Output,
	EventEmitter,
	ChangeDetectorRef
	} from '@angular/core';
	import {
	EnvService
	} from '../../shared/env.service';
	import {
	ComFunction
	} from '../../shared/com.function';
	import {
	ComValidation
	} from '../../shared/com.validation';
	import {
	HttpErrorResponse
	} from '@angular/common/http';
	import {
	ApiHttpServiceImpl
	} from '../../shared/api-http-service-impl';
	import {
	EgcZipcodeModel
	} from './model/egcZipcode.model';
	import {
	GridMain
	} from './grid/GridMain';
	import {
	IndexComponent
	} from 'src/app/index/index.component';


	@Component({
	selector: 'app-dSearchAddr',
	templateUrl: './dSearchAddr.component.html',
	providers: [ApiHttpServiceImpl],
	})
	export class DSearchAddrComponent implements OnInit {

	@Input() public route: any;
	// ****************************
	// Base
	// 팝업 리턴 모델
	public resultModel = new Array < any > ();
	public isDlSearchAddrDialog: boolean = false;
	// ****************************

	// ****************************
	// Model
	public searchModel: EgcZipcodeModel = < EgcZipcodeModel > {};
	// ****************************

	// ****************************
	// Edit (disable) isEdit변수명
	public isApiResponse: boolean;
	// ****************************

	// ****************************
	// Requied isReq

	// ****************************

	// ****************************
	// Grid
	public gridMain: GridMain = new GridMain(this.comFun);
	// ****************************

	// ****************************
	// Business
	public rowStackNum: number; //이전페이지, 다음페이지 버튼 상호작용시 사용자에게 보여지는 그리드 로우 누적 갯수
	public lastIndex: number; //lastIndex 마지막 페이지 로우 갯수 저장, isApiResponse 통신중에는 버튼 비활성화
	public btnDisable: any;
	// ****************************

	constructor(private apiHttpServiceImpl: ApiHttpServiceImpl,
		public envService: EnvService,
		public comFun: ComFunction,
		public comVal: ComValidation,
		private cd: ChangeDetectorRef,
		public indexCmp: IndexComponent) {}

	ngOnInit() {
		// const iframe = this.hostElement.nativeElement.querySelector('iframe')
		// iframe.src = this.getMenualUrl();
		this.isDlSearchAddrDialog = true;

		// @osh_20210915 필드 값 초기화
		this.searchModel.offset = 1;
		this.searchModel.pageSize = 10;
		this.searchModel.pageUnit = 0;
		this.searchModel.keyword = '';
		this.rowStackNum = 0;
		this.lastIndex = 0;
		this.isApiResponse = false;

		this.btnDisable = {
			searchBtn: false
		}
	}

	ngOnChanges() {}

	//팝업창 닫기버튼 이벤트
	onCancel() {
		this.isDlSearchAddrDialog = false;
	}

	//팝업창(다이얼로그) 창 사라질때 발생하는 이벤트
	onHide() {

		// 리턴값 셋팅
		this.indexCmp.modalParam.sendItem = this.resultModel;

		// 팝업 종료처리
		this.indexCmp.modalParam.eventComplet = true;
	}

	dlSearchAddrTrigger(event) {
		this.searchModel.keyword = event.sender.rawValue;
		if (event.e.keyCode === 13) {
			this.onTapQuery();
		}
	}

	// 조회 이벤트
	onTapQuery = () => {
		this.searchModel.offset = 1;
		this.callApiAddr(this.searchModel, "주소 정보가 없습니다.", 0);
	}

	//주소 그리드 이전 페이지
	preOnTapQuery() {
		this.searchModel.offset--;
		if (this.searchModel.offset < 1) {
			this.searchModel.offset++;
			return;
		}
		this.callApiAddr(this.searchModel, "주소 정보가 없습니다.", -1);
	}

	//주소 그리드 다음 페이지
	nextOnTapQuery() {
		this.searchModel.offset++;
		if (this.searchModel.pageUnit <= this.rowStackNum) {
			this.searchModel.offset--;
			return;
		}
		this.callApiAddr(this.searchModel, "주소 정보가 없습니다.", 1);
	}

	/**
	 * @param searchModel          
	 * @param alertMsg             안내 메세지
	 * @param curPageControlNum    0 : 조회버튼, 1 : 다음 페이지, -1 : 이전 페이지
	 */
	// public callApiAddr(searchModel: Object, alertMsg: string, curPageControlNum: number): void {

	//    //주소검색 필드가 ''(빈칸), undefined 일때 함수 빠져나옴
	//    if( !this.searchModel?.search ) {
	//       this.curPageController(curPageControlNum);
	//       return;
	//    }
	//    this.isApiResponse = true;
	//    this.gridMain.gridApi.showLoadingOverlay();

	//    this.apiHttpServiceImpl.selectList('/api/comm/egcZipcodeWebSearch', searchModel).subscribe(
	//       (res: any) => {
	//          /**
	//           * @success
	//           */
	//          if( res.length > 0 ){
	//             this.gridMain.rowData = res;
	//             switch(curPageControlNum) {
	//                case  0:
	//                   this.rowStackNum = res.length;
	//                   this.searchModel.pageSize = res[0]?.pageSize ?? 0;
	//                   break;
	//                case -1:
	//                   if( this.lastIndex > 0 && this.lastIndex < this.searchModel.pageUnit ){
	//                      this.rowStackNum = (+this.rowStackNum) - this.lastIndex;
	//                      this.lastIndex = 0;
	//                   }else{
	//                      this.rowStackNum = (+this.rowStackNum) - res.length;
	//                   }
	//                   break;
	//                case  1:
	//                   this.rowStackNum += res.length;
	//                   break;
	//             }
	//             this.isApiResponse = false;
	//             this.gridMain.gridApi.hideOverlay();
	//          }else{
	//             this.curPageController(curPageControlNum);
	//             this.isApiResponse = false;
	//             this.comFun.alert(this.comFun.i18n('확인'), alertMsg);
	//             this.gridMain.gridApi.hideOverlay();
	//          }
	//       },
	//       (err: HttpErrorResponse) => {
	//          /**
	//           * @error
	//           */
	//          this.curPageController(curPageControlNum);
	//          this.isApiResponse = false;
	//          this.comFun.alert(this.comFun.i18n('오류'), this.comFun.i18n(alertMsg));
	//          this.gridMain.gridApi.hideOverlay();
	//       }
	//    );
	// }

	public callApiAddr(searchModel: Object, alertMsg: string, curPageControlNum: number): void {

		//주소검색 필드가 ''(빈칸), undefined 일때 함수 빠져나옴
		if (!this.searchModel ?.keyword) {
			this.curPageController(curPageControlNum);
			return;
		}
		this.isApiResponse = true;
		this.gridMain.gridApi.showLoadingOverlay();

		this.apiHttpServiceImpl.selectList('/api/comm/egcZipcodeWebSearch', this.searchModel).subscribe(
			(res: any) => {

				if (res.success === false) {
					// ***************************************
					// 통신 실패
					// ***************************************
					// 통신응답 처리
					if (this.comFun.apiErrorCheck(res.resCd) === true) {
						// 프로세스 처리
						switch (res.resCd) {
							case '-1':
								this.comFun.alert(this.comFun.i18n('확인'), alertMsg);
								break;
						}
					}

					this.curPageController(curPageControlNum);
					this.isApiResponse = false;
					this.gridMain.gridApi.hideOverlay();
					return;
				} else {
					// ***************************************
					// 통신 성공
					// ***************************************
					// Json String -> 객체
					var jsonRes = res.data;
					
					this.gridMain.rowData = jsonRes;
					switch (curPageControlNum) {
						case 0:
							//관련지번까지 불러온 이후로는 건수가 안맞아 페이지 넘버로 수정
							// this.rowStackNum = jsonRes.length;
							this.rowStackNum = this.searchModel.offset;
							// this.searchModel.pageSize = res[0]?.pageSize ?? 0;
							this.searchModel.pageUnit = Math.ceil(res ?.count / 10) ?? 0;
							break;
						case -1:
							if (this.lastIndex > 0 && this.lastIndex < this.searchModel.pageSize) {
								this.rowStackNum = (+this.rowStackNum) - this.lastIndex;
								this.lastIndex = 0;
							} else {
								this.rowStackNum = (+this.rowStackNum) - 1
							}
							break;
						case 1:
							this.rowStackNum += 1;
							break;
					}
					this.isApiResponse = false;
					this.gridMain.gridApi.hideOverlay();
				}
			},
			(err: HttpErrorResponse) => {
				/**
				 * @error
				 */
				this.curPageController(curPageControlNum);
				this.isApiResponse = false;
				this.comFun.alert(this.comFun.i18n('오류'), this.comFun.i18n(alertMsg));
				this.gridMain.gridApi.hideOverlay();
			}
		);
	}

	// @osh_20210914 검색 파라미터로 넘길 pageIndex 관리 메서드
	public curPageController(curPageControlNum: Number): void {
		switch (curPageControlNum) {
			case -1:
				this.searchModel.offset++;
				break;
			case 1:
				this.searchModel.offset--;
				break;
			default:
				return;
		}
	}

	// @Output() public rowClick: any = new EventEmitter(); // 그리드로우 클릭했을때

	//그리드 로우 클릭 이벤트
	onSelectRow(param) {
		// result 저장
		this.resultModel.push(param.data);

		// 종료처리
		this.isDlSearchAddrDialog = false;

		// this.rowClick.emit(params.data);

		// @ychan_20220214 종료이벤트 변경
		// this.onHide();
		// this.isDlSearchAddrDialog = false;
		// this.cd.detectChanges();
	}
	onGridReadyFn(event) {
		this.gridMain.gridApi = event.api;
		this.gridMain.gridColumnApi = event.columnApi;
	}

	// @Output() public sendAllData: any = new EventEmitter();      // 닫을때 모든 그리드 데이터 보내기
	}