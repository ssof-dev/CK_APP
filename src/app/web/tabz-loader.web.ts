import { TabzLoader } from '../index/tabz-loader';
import { TabzModule } from './tabz.module';

// Example Cmp
import { CenterFormComponent } from './example/centerForm/centerForm.component';
import { CenterGridComponent } from './example/centerGrid/centerGrid.component';
import { CenterTreeComponent } from './example/centerTree/centerTree.component';
import { LeftGridCenterFormComponent } from './example/leftGridCenterForm/leftGridCenterForm.component';
import { LeftGridCenterGridComponent } from './example/leftGridCenterGrid/leftGridCenterGrid.component';
import { LeftGridTopFormBottomGridComponent } from './example/leftGridTopFormBottomGrid/leftGridTopFormBottomGrid.component';
import { LeftGridTopGridBottomFormComponent } from './example/leftGridTopGridBottomForm/leftGridTopGridBottomForm.component';
import { LeftTreeCenterFormComponent } from './example/leftTreeCenterForm/leftTreeCenterForm.component';
import { LeftTreeCenterGridComponent } from './example/LeftTreeCenterGrid/leftTreeCenterGrid.component';
import { TopFormBottomGridComponent } from './example/topFormBottomGrid/topFormBottomGrid.component';
import { TopGridBottomFormComponent } from './example/topGridBottomForm/topGridBottomForm.component';
import { GPassUserMgtComponent } from './example/GPassUserMgt/GPassUserMgt.component';
import { GPassNoticeMgtcomponent } from './example/GPassNoticeMgt/GPassNoticeMgt.component';

import { CodeMngtComponent } from './erp/system/codeMngt/codeMngt.component';
import { UserMngtComponent } from './erp/system/userMngt/userMngt.component';
import { CompRegistComponent } from "./erp/accounting/registration/compRegist/compRegist.component";
import { MyPageComponent } from './erp/system/myPage/myPage.component';


// import { NoticeTestcomponent } from './TaskAdmin/NoticeTest/NoticeTestcomponent';
// import { FrcMgtTmpComponent } from './TaskMst/FrcMgtTmp/FrcMgtTmp.component';

export class TabzLoaderWeb implements TabzLoader {

    private tabzList = [
        // Example Cmp
        { id: '/code-mngt', component: CodeMngtComponent },
        { id: '/user-mngt', component: UserMngtComponent },
        { id: '/acc-comp-reg', component: CompRegistComponent },
        { id: 'app-MyPage', component: MyPageComponent},


    ];

    private webMenu: any = [
        {
            id: "Example", name: "Example", text: "Example", iconCls: "x-fa fa-info", leaf: false, children: [
                { id: "app-CenterForm", name: "CenterForm", text: "CenterForm", iconCls: "x-fa fa-terminal", leaf: true },
                { id: "app-CenterGrid", name: "CenterGrid", text: "CenterGrid", iconCls: "x-fa fa-terminal", leaf: true },
                { id: "app-CenterTree", name: "CenterTree", text: "CenterTree", iconCls: "x-fa fa-terminal", leaf: true },
                { id: "app-LeftGridCenterForm", name: "LeftGridCenterForm", text: "LeftGridCenterForm", iconCls: "x-fa fa-terminal", leaf: true },
                { id: "app-LeftGridCenterGrid", name: "LeftGridCenterGrid", text: "LeftGridCenterGrid", iconCls: "x-fa fa-terminal", leaf: true },
                { id: "app-LeftGridTopFormBottomGrid", name: "LeftGridTopFormBottomGrid", text: "LeftGridTopFormBottomGrid", iconCls: "x-fa fa-terminal", leaf: true },
                { id: "app-LeftGridTopGridBottomForm", name: "LeftGridTopGridBottomForm", text: "LeftGridTopGridBottomForm", iconCls: "x-fa fa-terminal", leaf: true },
                { id: "app-LeftTreeCenterForm", name: "LeftTreeCenterForm", text: "LeftTreeCenterForm", iconCls: "x-fa fa-terminal", leaf: true },
                { id: "app-LeftTreeCenterGrid", name: "LeftTreeCenterGrid", text: "LeftTreeCenterGrid", iconCls: "x-fa fa-terminal", leaf: true },
                { id: "app-TopFormBottomGrid", name: "TopFormBottomGrid", text: "TopFormBottomGrid", iconCls: "x-fa fa-terminal", leaf: true },
                { id: "app-TopGridBottomForm", name: "TopGridBottomForm", text: "TopGridBottomForm", iconCls: "x-fa fa-terminal", leaf: true },
                { id: "app-GPassUserMgt", name: "GPassUserMgt", text: "GPassUserMgt", iconCls: "x-fa fa-terminal", leaf: true },
                { id: "app-GPassNoticeMgt", name: "GPassNoticeMgt", text: "GPassNoticeMgt", iconCls: "x-fa fa-terminal", leaf: true },
                { id: "app-FrcApprovalMgt", name: "FrcApprovalMgt", text: "FrcApprovalMgt", iconCls: "x-fa fa-terminal", leaf: true },
                { id: "app-MyPage", name: "MyPage", text: "MyPage", iconCls: "x-fa fa-terminal", leaf: true },
            ],
        },
        {
            id: "app-TaskMst", name: "app-TaskStore", text: "기초자료관리", iconCls: "x-fa fa-info", leaf: false, children: [
                // { id: "app-FrcMgtTmp", name: "FrcMgtTmp", text: "가맹점관리_TMP", iconCls: "x-fa fa-terminal", leaf: true },
            ],
        },
        {
            id: "app-TaskStore", name: "app-TaskStore", text: "매장관리", iconCls: "x-fa fa-info", leaf: false, children: [
                { id: "app-MyAssoMgt", name: "MyAssoMgt", text: "매장관리-상인회", iconCls: "x-fa fa-terminal", leaf: true },
            ],
        },
        {
            id: "app-TaskExcg", name: "app-TaskExcg", text: "정산관리", iconCls: "x-fa fa-info", leaf: false, children: [
                { id: "app-SettExcgMgt", name: "SettExcgMgt", text: "상품권정산관리", iconCls: "x-fa fa-terminal", leaf: true },
                { id: "app-SettAdminMgt", name: "SettAdminMgt", text: "정산현황", iconCls: "x-fa fa-terminal", leaf: true },
            ],
        },
        {
            id: "app-TaskStat", name: "app-TaskStat", text: "테스트메뉴", iconCls: "x-fa fa-info", leaf: false, children: [
                { id: "app-InqKftcCardGift", name: "InqKftcCardGift", text: "카드거래내역조회-신협", iconCls: "x-fa fa-terminal", leaf: true },
                { id: "app-UserMgtUp", name: "UserMgtUp", text: "계정관리(신)", iconCls: "x-fa fa-terminal", leaf: true },
                { id: "app-MyPage", name: "MyPage", text: "MyPage", iconCls: "x-fa fa-terminal", leaf: true },
                { id: "app-ExcgLimitMgt", name: "ExcgLimitMgt", text: "한도상향-지자상인", iconCls: "x-fa fa-terminal", leaf: true },
                { id: "app-MyFrcMgt", name: "MyFrcMgt", text: "가맹점현황-한도상향", iconCls: "x-fa fa-terminal", leaf: true },
                { id: "app-BcB2ApprovalMgt", name: "BcB2ApprovalMgt", text: "b2신청관리", iconCls: "x-fa fa-terminal", leaf: true },
                { id: "app-BcB3Mgt", name: "BcB3Mgt", text: "B3역방향통신관리", iconCls: "x-fa fa-terminal", leaf: true },
                { id: "app-ExcgMgtDetail", name: "ExcgMgtDetail", text: "정산", iconCls: "x-fa fa-terminal", leaf: true },
                { id: "app-FrcChgApprovalMgt", name: "FrcChgApprovalMgt", text: "가맹변경신청", iconCls: "x-fa fa-terminal", leaf: true },
                { id: "app-InqFrcChgReq", name: "InqFrcChgReq", text: "갱신요청조회", iconCls: "x-fa fa-terminal", leaf: true },
                { id: "app-PrivacyLog", name: "PrivacyLog", text: "개인정보이력", iconCls: "x-fa fa-terminal", leaf: true },
                { id: "app-UserMgtLog", name: "UserMgtLog", text: "사용권한변경이력", iconCls: "x-fa fa-terminal", leaf: true },
                { id: "app-FrcLog", name: "FrcLog", text: "가맹점변경이력", iconCls: "x-fa fa-terminal", leaf: true },
                { id: "app-OnmallApply", name: "OnmallApply", text: "전통시장 신청", iconCls: "x-fa fa-terminal", leaf: true },
                { id: "app-OnmallApprovalMgt", name: "OnmallApprovalMgt", text: "전통시장 승인관리", iconCls: "x-fa fa-terminal", leaf: true },
            ],
        }
        
    ];

    public GetTabzList() {
        return this.tabzList;
    }

    public GetTabzMenu() {
        return this.webMenu;
    }

    public SetTabzMenu(menu: any) {
        this.webMenu = menu;
    }


}