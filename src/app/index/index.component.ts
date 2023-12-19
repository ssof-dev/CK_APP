declare var Ext: any;
import * as $ from 'jquery';
// import $ from 'jquery';
// declare var $: any;

import { Component, OnInit, Input, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { VERSION } from "@angular/core";
import { Index, CodeModel, ModalParam } from './shared/index.model';
import { IndexService } from './shared/index.service';
import { EnvService } from '../shared/env.service';
import { ComFunction } from '../shared/com.function';
import { TranslateService } from '@ngx-translate/core';
import { TabzLoaderWeb } from '../web/tabz-loader.web';
import { now } from 'd3';
import * as moment from 'moment';

Ext.require([
  'Ext.MessageBox'
]);

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  providers: [IndexService],
})
export class IndexComponent implements OnInit {
  @Input() public route: any;
  isCollapse: boolean = true;
  public nowMenuNode: any;  //마지막에 선택한 메뉴 node 정보

  //공통 팝업 정보 Model
  public modalParam: ModalParam = <ModalParam>{};

  //메뉴 tree store
  public treeStore: any;

  //즐겨찾기 tree store
  public treeStoreBm: any;

  public dashboardNode = { text: 'Home', iconCls: 'x-fa fa-home' };

  public tabStore: any = [
    { comboId: 'top', comboNm: 'Top' },
    { comboId: 'bottom', comboNm: 'Bottom' }
  ];

  //텝메뉴 위치
  public tabPos: string;

  //탭메뉴 수정 여부 확인(테스트중)
  public isEditMenu: boolean = false;

  //공통코드 Dialog 표시 유무
  public isCodeDialog: boolean = false;

  //공통코드 조회에 사용할 code Model
  public codeParamModel: CodeModel = <CodeModel>{};

  //호출한 페이지로 결과 전송할 code Model
  public sendCodeModel: CodeModel = <CodeModel>{};

  //grid store
  public codeGridStore = new Ext.data.Store({});

  //Grid Component 
  public codeGridCmp: any;

  public widthPanel : any;

  public tabMenuSize ='';

  constructor(private router: Router,
    private ar: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private indexService: IndexService,
    public envService: EnvService,
    public comFun: ComFunction,
    private translate: TranslateService,
    private el: ElementRef<HTMLElement>) {

    if (this.comFun.isEmpty(this.envService.progData)) {
      this.router.navigate(['login']);
    }

    // @ychan_20210924 사용자이름 초기화
    //this.envService.userInfo.userNm="cyg";
  }

  ngOnInit() {
    //tree menu create
    this.treeStore = new Ext.data.TreeStore({
      root: this.envService.progData
    });

    //뒤로가기 막기
    history.pushState(null, null, location.href);
    window.onpopstate = function () {
      //Ext.toast('뒤로가기는 지원하지 않습니다.');
      history.go(1);
    };

    //F1~F2키 기본 이벤트 제거
    $(document).keydown(function (e) {

      if (e.which === 112 || e.which === 113 || e.which === 114 ||
        e.which === 115 || e.which === 116 || e.which === 117 ||
        e.which === 118 || e.which === 119 || e.which === 120 ||
        e.which === 121 || e.which === 122 || e.which === 123
      ) {
        e.preventDefault();
      }
    });

      // //모바일 , pc  화면 다르게 출력
      // if (this.envService.userInfo.loginDevice === 'Android' || this.envService.userInfo.loginDevice === 'iOS') {
      //   //99.8% 부터 화면 안 나옴..
      //   this.tabMenuSize = '99.7%';
      // } else {
      //   this.tabMenuSize = '250px';
      // }

      this.tabMenuSize = '250px';

    //enter key event
    $(document).on('keydown', 'input, select, checkBox', function (e) {
      if (e.key === "Enter") {
        var self = $(this), form = self.parents('form:eq(0)'), focusable, next;
        focusable = form.find('input,a,select,button,textarea').filter(':visible');
        next = focusable.eq(focusable.index(this) + 1);
        try {
          if (!(next[0].type == 'submit' || next[0].type == 'file')) {
            next.focus();
          }
          return false;
        } catch (e) {
          return true;
        }
      }
    });

    //언어설정 콤보박스 기본값이 미설정이면 translate 기본값으로 똑같이 맞춰줌
    if (this.comFun.isEmpty(this.envService.langs)) {
      this.envService.langs = this.translate.getDefaultLang();
    }

    //텝메뉴 위치 지정
    //let tabBarPos = this.comFun.getCookie('tabPos')
    //this.tabPos = this.comFun.isEmpty(tabBarPos) === true ? this.envService.tabPos : tabBarPos;

  //=======================================================
  //비밀번호 변경 90일 경과 로직
  //=======================================================
  //오늘 날짜 계산
  // let today = new Date();

  // let year = today.getFullYear(); // 년도
  // let month = today.getMonth(); // 월
  // let date = today.getDate(); // 날짜

  // let todayDy = new Date(year, month, date);
  // //=======================================================
  // //비밀번호변경일자 가져오기
  // let pwDy = this.envService.userInfo.pwChgDy;

  // let getSubYy = pwDy.substring(0, 4); //년도
  // let getSubMm = pwDy.substring(4, 6); //월
  // let getSubDay = pwDy.substring(6, 8); //날짜
  // //넘버 포맷팅
  // let pwYear = Number(getSubYy);
  // let pwMonth = Number(getSubMm) - 1;
  // let pwDay = Number(getSubDay)

  // let pwChgDy = new Date(pwYear, pwMonth, pwDay);
  // //=====================================================
  // //일수 차이 계산
  // //=====================================================
  // //오늘 날짜와 변경 날짜 차이
  // let diff = Math.abs(todayDy.getTime() - pwChgDy.getTime());
  // //일수 차이
  // diff = Math.ceil(diff / (1000 * 60 * 60 * 24));
  // //=====================================================
  // //비밀변호 변경 90일 경과시 마이페이지 이동 -> 팝업노출
  // if (diff > 90) {
  //   setTimeout(() => {
  //     this.myPage()
  //     this.comFun.alert(this.comFun.i18n('확인'), this.comFun.i18n('비밀번호를 변경한지 90일이 경과하였습니다.<br>비밀번호를 변경해 주세요.'));
  //   }, 1000);
  // }
  //=======================================================

  }

  dialogView(item: any, callBack: Function) {

    this.modalParam = <ModalParam>{};       //초기화
    this.modalParam.nodeItem = item;        //팝업창 컴포넌트 정보
    this.modalParam.eventComplet = false;   //공통코드창 이벤트 완료유무 초기화

    let that = this;
    //이벤트 완료 감지하여 호출한 함수로 결과 전달
    Object.defineProperty(this.modalParam, 'eventComplet', {
      set(newValue) {
        if (newValue === true) {
          callBack(that.modalParam.sendItem);
        }

      }
    });
  }

  isEditMenuSwich() {
    this.isEditMenu = !this.isEditMenu;
  }

  //언어설정 변경
  switchLanguage(event) {
    this.translate.use(event.newValue);
  }

  //텝메뉴 위치 변경
  switchTabPos(event) {
    this.tabPos = event.newValue;
    //쿠키에 위치값 저장
    //this.comFun.putCookie('tabPos', this.tabPos);
  }

  //북바크 컴포넌트
  public bookMarkBtnCmp: any;
  onBookMarkBtnReady(event) {
    this.bookMarkBtnCmp = event.cmp;
  }

  //즐겨찾기
  public bookMarkNode: any;
  addBookMark() {
  }

  //설정
  onTabSetting(event) {
    this.isCollapse = !this.isCollapse;
  }

  //즐겨찾기 여부 확인
  isBookMark(tab) {
    //this.bookMarkBtnCmp.setIconCls('yellow x-fa fa-star');
  }

  menuMax = 8; // 최대갯수에서 -1을 해줘야 한다.
  //메뉴 선택 이벤트
  selectionchangeNavTreeList(event) {
    // @ychan_20221206 메뉴 최대갯수 제안
    if (this.tabs.length > this.menuMax - 1) {
      return;
    }

    let node = event.record;
    this.viewMenuController(node.data);
  }

  //선택된 메뉴 재선택
  onItemClickTreeList(event) {
    // @ychan_20221206 메뉴 최대갯수 제안
    if (this.tabs.length > this.menuMax - 1) {
      Ext.toast('메뉴표시 한도초과<br>사용하지 않는 메뉴를 닫아주세요.');
      return;
    }

    let node = event.info.node;
    this.viewMenuController(node.data);
  }

  //메뉴 표시 제어
  viewMenuController(node) {
    this.nowMenuNode = node;
    if (node.leaf){
      this.createTabMenu(node);

    }
  }

  //메뉴 페널 컴포넌트
  public menuTreePanelCmp: any;
  onMenuTreeListReady(event) {
    this.menuTreePanelCmp = event.cmp;
  }

  //즐겨찾기 페널 컴포넌트
  public bookMarkTreePanelCmp: any;
  onBookMarkTreeListReady(event) {
    this.bookMarkTreePanelCmp = event.cmp;
    //즐겨찾기는 숨김처리
    this.bookMarkTreePanelCmp.hide(true);
  }

  /**
   * 메뉴 표시 이벤트
   */
  public hideAppMenu: boolean = false;
  toggleAppMenu(event) {
    this.hideAppMenu = !this.hideAppMenu;
  };

  /**
 * tab compnent
 */
  public tabPanel: any;
  tabPanelReady(event) {
    this.tabPanel = event.cmp;
  }

  /**
   * 탭 선택
   */
  tabPanelAdded(event) {
    if (this.tabPanel != undefined) {
      this.tabPanel.setActiveItem(this.tabs.indexOf(this.tabs.length - 1));
    }
  }

  //tab menu 생성
  public tabs: Array<any> = new Array<any>();
  createTabMenu(node) {
    let isAdd = true; //[true] 탭추가, [false]탭추가 x
    for (let i = 0; i < this.tabs.length; i++) {
      //이미 탭에 생성 되어 있는 메뉴니까 해당 탭만 활성화 시킴
      if (this.tabs[i].id == node.id) {
        isAdd = false;
        this.tabPanel.setActiveItem(i + 1);
        break;
      }
    }

    //신규 탭 추가
    if (isAdd) {
      this.tabs = [...this.tabs, node];
      this.cd.detectChanges();
      this.tabPanel.setActiveItem(this.tabs.length + 1);

      //@ychan_20230510 불필요 삭제
      // 프로그램 실행 정보를 서버에 저장한다.
      // this.indexService.saveIndex(node);
    }

    //@ychan_20220421
    // //북바크 등록 여부 확인
    // this.isBookMark(node);
  }

  bootNavClick(obj, div) {

    let menu = document.getElementById('menu-tab');
    let bookMark = document.getElementById('bookMark-tab');

    if (div === 'B') {

      bookMark.className = 'nav-link active';
      menu.className = 'nav-link';
      this.menuTreePanelCmp.hide(true);
      this.bookMarkTreePanelCmp.show(true);
    } else {
      bookMark.className = 'nav-link';
      menu.className = 'nav-link active';
      this.menuTreePanelCmp.show(true);
      this.bookMarkTreePanelCmp.hide(true);
    }
  }

  //메뉴 컴포넌트
  public treeListCmp: any;
  onTreeListReady(event) {
    this.treeListCmp = event.cmp;
  }

  //즐겨찾기 컴포넌트
  public treeListCmpbm: any;
  onTreeListReadyBm(event) {
    this.treeListCmpbm = event.cmp;
  }

  //tree Filter
  public filterRegex: any;
  public filterVal: any;
  filterNav(event) {
    let newValue = event.newValue;
    this.filterVal = newValue;
    this.filterRegex = new RegExp(Ext.String.escapeRegex(newValue), "i");
    this.treeStore.filterBy(record => this.containsMatches(record));
  }

  //메뉴 노드 검색
  containsMatches(node) {
    try {
      if (node.data.name === undefined) {
        return node.data;
      } else {
        const found = node.data.name.match(this.filterRegex) || node.childNodes.some(child => this.containsMatches(child));
        //if (found) node.expand();
        node.data.text = node.data.name.replace(this.filterRegex, `<span style="color:#2196F3;font-weight:bold">${this.filterVal}</span>`);
        return found;
      }

    } catch (e) {
      console.error(e);
    }
  }

  //즐겨찾기 메뉴 검색
  public filterRegexBm: any;
  public filterValBm: any;
  filterBookMarkNav(event) {
    let newValue = event.newValue;
    this.filterValBm = newValue;
    this.filterRegexBm = new RegExp(Ext.String.escapeRegex(newValue), "i");
    this.treeStore.filterBy(record => this.containsMatchesBm(record));
  }

  //즐겨찾기 노드 검색
  containsMatchesBm(node) {
    try {
      if (node.data.name === undefined) {
        return node.data;
      } else {
        const found = node.data.name.match(this.filterRegexBm) || node.childNodes.some(child => this.containsMatchesBm(child));
        //if (found) node.expand();
        node.data.text = node.data.name.replace(this.filterRegexBm, `<span style="color:#2196F3;font-weight:bold">${this.filterValBm}</span>`);
        return found;
      }

    } catch (e) {
      console.error(e);
    }
  }

  /**
   * 탭 닫기
   */
  closeTab(tab, delId) {
    let closeItem = this.tabs.filter(t => t !== tab);
    for (let i = 0; i < this.tabs.length; i++) {
      if (this.tabs[i].id == delId) {
        //tab 페널이 가지고 있을 배열과 내부적으로 가지고 있는 배열에서 닫힌 탭 메뉴를 삭제한다
        closeItem.splice(i, 1);
        this.tabs.splice(i, 1);
        this.tabs = closeItem;
        break;
      }
    }
  }

  /**
   * 로그아웃
   */
  onConfirmLogout = () => {
    this.comFun.confirm("확인", "종료하시겠습니까", this.onConfirmResult.bind(this));
  }

  onConfirmResult(buttonId, value, opt) {
    if (buttonId == 'yes') {
      // JCNA: 일반 HTML과 혼용하기 위해 'router.navigate'을 'history.go(0)'로 대체한다.
      //this.router.navigate(['login']);
      
      //@yhj20230330 감리 - 버그수정 
      // location.href = location.href;
      window.location.reload();

      history.go(0);
    }
  }
  
  //@yhj20230414 마이페이지 버튼
  myPage() {
    let treeMenu = {
      id: "app-MyPage",
      name: "마이페이지",
      text: "마이페이지",
    }

    let isAdd = true; //[true] 탭추가, [false]탭추가 x
    for (let i = 0; i < this.tabs.length; i++) {
      //이미 탭에 생성 되어 있는 메뉴니까 해당 탭만 활성화 시킴
      if (this.tabs[i].id == treeMenu.id) {
        isAdd = false;
        this.tabPanel.setActiveItem(i + 1);
        break;
      }
    }

    //신규 탭 추가
    if (isAdd) {
      this.tabs = [...this.tabs, treeMenu];
      this.cd.detectChanges();
      this.tabPanel.setActiveItem(this.tabs.length + 1);
    }
    // //모바일에서 탭은생기나 안밀려나는 현상이 있었음
    // if (this.envService.userInfo.loginDevice === 'Android' || this.envService.userInfo.loginDevice === 'iOS') {
    //   this.toggleAppMenu(treeMenu);
    // }
  }

  //@yhj20230522 갱신신청 가맹점은 자동으로 메뉴이동.(가맹점-가맹점현황)
  // MyfrcMgtMenu() {
  //   let treeMenu = {
  //     id: "app-MyFrcMgt",
  //     name: "가맹점현황-가맹점",
  //     text: "가맹점현황-가맹점",
  //   }
  //   //모바일
  //   let treeMblMenu = {
  //     id: "app-MblMyFrcMgt",
  //     name: "가맹점현황-가맹점",
  //     text: "가맹점현황-가맹점",
  //   }

  //   //모바일에서 탭은생기나 안밀려나는 현상이 있었음
  //   if (this.envService.userInfo.loginDevice === 'Android' || this.envService.userInfo.loginDevice === 'iOS') {

  //     let isAdd = true; //[true] 탭추가, [false]탭추가 x
  //     for (let i = 0; i < this.tabs.length; i++) {
  //       //이미 탭에 생성 되어 있는 메뉴니까 해당 탭만 활성화 시킴
  //       if (this.tabs[i].id == treeMblMenu.id) {
  //         isAdd = false;
  //         this.tabPanel.setActiveItem(i + 1);
  //         break;
  //       }
  //     }

  //     //신규 탭 추가
  //     if (isAdd) {
  //       this.tabs = [...this.tabs, treeMblMenu];
  //       this.cd.detectChanges();
  //       this.tabPanel.setActiveItem(this.tabs.length + 1);
  //     }

  //     this.toggleAppMenu(treeMblMenu);
  //   }
  //   //웹일 경우
  //   else {
  //     let isAdd = true; //[true] 탭추가, [false]탭추가 x
  //     for (let i = 0; i < this.tabs.length; i++) {
  //       //이미 탭에 생성 되어 있는 메뉴니까 해당 탭만 활성화 시킴
  //       if (this.tabs[i].id == treeMenu.id) {
  //         isAdd = false;
  //         this.tabPanel.setActiveItem(i + 1);
  //         break;
  //       }
  //     }

  //     //신규 탭 추가
  //     if (isAdd) {
  //       this.tabs = [...this.tabs, treeMenu];
  //       this.cd.detectChanges();
  //       this.tabPanel.setActiveItem(this.tabs.length + 1);
  //     }
  //   }

  // }

}
