export class TopGridBottomFormModel {
    /**
     * 예제 model
     */
    textFieldVal    : string;   //텍스트필드 val
    urlFieldVal     : string;   //URL필드 val
    emailFieldVal   : string;   //E-mail필드 val
    numFieldVal     : number;   //숫자필드 val
    editFieldVal    : string;   //에디터 필드 val
    startDt         : string;   //달력
    checkVal        : string;   //체크박스
    toggleVal       : string;   //toggle
    comboVal        : string;   //combo(select)

    storeCd         :string;
    goodsBarcodeNo  :string;
    saleDate        :string;
    saleQty         :number;
    totalSaleAmt    :number;
    discountAmt     :number;
    netSaleAmt      :number;
    saleVat         :number;
    saleSupply      :number;
    rtnQty          :number;
    rtnAmt          :number;
    regDateTime     :number;
    profitAmt       :number;
}

/**
example.module.ts To Copy!!!
import { TopGridBottomFormComponent } from './topGridBottomForm/topGridBottomForm.component';

tabz-loader.web.ts To Copy!!!
import { TopGridBottomFormComponent } from './example/topGridBottomForm/topGridBottomForm.component';
{ id: "app-TopGridBottomForm", component: TopGridBottomFormComponent },
{ id: "app-TopGridBottomForm", name: "TopGridBottomForm", text: "TopGridBottomForm", iconCls: "x-fa fa-terminal", leaf: true },
*/