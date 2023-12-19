declare var Ext: any;
import { Injectable, Input, Type } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie';
import { HttpClient } from '@angular/common/http';
import { AgGridEvent } from 'ag-grid-community';

import * as CryptoJS from 'crypto-js';
import JSEncrypt from 'jsencrypt';

/**
 * 공통함수 
 */

@Injectable()
export class ComFunction {

    constructor( private translate: TranslateService) { }

    //@yhj20221018 그리드 변경 감지시 새로고침 함수
    onSortChanged(e: AgGridEvent) {
        e.api.refreshCells();
    }

    //다국어 처리
    i18n(text: string) {
        this.translate.get(text).subscribe((res: string) => { text = res; });
        return text;
    }

    
    /**
     * 접속자 위도경도 조회
     * @returns 
     * @example this.comFun.getPosition().then(pos=>{
                    console.log(pos.lng);
                    console.log(pos.lat);
                }).catch(err=>{
                    console.log(err);
                });
     */
    //@yhj20230330 감리 버그수정으로 인해 주석(쓰는곳 없음)
    // getPosition(): Promise<any> {
    //     return new Promise((resolve, reject) => {
    //         navigator.geolocation.getCurrentPosition(resp => {
    //             resolve({ lng: resp.coords.longitude, lat: resp.coords.latitude });
    //         },
    //             err => {
    //                 reject(err);
    //             });
    //     });
    // }

    //UUID 생성
    getUUID() {
        return uuidv4();
    }

    /**
     * ExtDatefield 설정
     * @param dateField 
     * @example (ready)="this.comFun.onReadyDateField($event)"
     */
    public onReadyDateField(dateField) {
        dateField.cmp.getPicker().setHeaderFormat('Y-m-d');
        dateField.cmp.getPicker().setNextText('다음달');
        dateField.cmp.getPicker().setPrevText('이전달');
    }

    /**
     * type empty check 
     * return true => empty
     * return false => not empty
     * @param val 
     * @example this.comFun.isEmpty(value)
     */
    public isEmpty(val: any) {

        let type = (typeof val);
        let result = true;

        if (val !== undefined && val != null) {
            if (type === 'object') {
                result = Object.keys(val).length === 0 ? true : false;
            } else {
                result = val === '' ? true : false;
            }
        }

        return result;

    }

    /**
     * @param val 
     * @param type string, number, boolean
     */
    public valEmpty(val: any, type?: string) {
        if (val === undefined || val === null) {

            if (type === 'number') {
                return 0;
            } else if (type === 'boolean') {
                return false;
            } else {
                return "";
            }
        }

        return val;
    }
    //±cal(일수) date return
    public getDate(cal?: number) {
        if (cal === undefined) cal = 0;
        let calDate = 0;
        let date = new Date();
        // calDate = cal > 0 ? date.setDate(date.getDate() + cal) : date.setDate(date.getDate() - cal);
        calDate = date.setDate(date.getDate() + cal);

        return new Date(calDate);
    }
    //@yhj GMT , 초 잘라서 일자까지만 리턴
    public getSubDate() {
        let today = new Date();

        let year = today.getFullYear();
        let month = ('0' + (today.getMonth() + 1)).slice(-2);
        let day = ('0' + today.getDate()).slice(-2);

        let dateString = year + '-' + month + '-' + day;

        return dateString;
    }

    //@yhj GMT , 초 잘라서 일자까지만 리턴
    //Date to string b1수기등록 메뉴떄문에 추가
    public getNextDateSetToString() {
        let stringDate = new Date();

        let gmtYear = stringDate.getFullYear();
        let gmtMonth = stringDate.getMonth();
        let gmtDay = stringDate.getDate() + 1;
        // let year = stringDate.getFullYear();
        // let month = stringDate.getMonth() + 1 < 10 ? `0${stringDate.getMonth() + 1}` : stringDate.getMonth() + 1;
        // let day = stringDate.getDate() < 10 ? `0${stringDate.getDate()+1}` : stringDate.getDate()+1;
        let realDate = new Date(gmtYear, gmtMonth, gmtDay);
        let year = realDate.getFullYear();
        //@yhj_20230102 달에도 10 안 넘을 경우 뒤에 0 추가
        let month = realDate.getMonth() + 1 < 10 ? `0${realDate.getMonth() + 1}` : realDate.getMonth() + 1;
        let day = realDate.getDate() < 10 ? `0${realDate.getDate()}` : realDate.getDate();

        return `${year}${month}${day}`;

    }

    //@yhj202216 다음날짜 파라미터 받아서 +1
    public getNextDateParamSetToString(param) {
        let stringDate = param;
        let intDate = parseInt(stringDate);
        let nextIntDay = stringDate.substring(6, 8);
        let intNextDay = parseInt(nextIntDay);

        let gmtYear = stringDate.substring(0, 4);
        let nextIntYear = parseInt(gmtYear);
        let gmtMonth = stringDate.substring(4, 6);
        let nextIntMonth = parseInt(gmtMonth);
        let paramDay = intNextDay + 1;
        let paramMonth = nextIntMonth - 1;
        let paramYear = nextIntYear;

        let realDate = new Date(paramYear, paramMonth, paramDay);
        let year = realDate.getFullYear();
        let month = realDate.getMonth() + 1 < 10 ? `0${realDate.getMonth() + 1}` : realDate.getMonth() + 1;
        let day = realDate.getDate() < 10 ? `0${realDate.getDate()}` : realDate.getDate();

        return `${year}${month}${day}`;

    }

    //±cal 년
    public getYear(cal?: number) {
        if (cal === undefined) cal = 0;
        let date = new Date();
        return cal > 0 ? date.getFullYear() + cal : date.getFullYear() - cal;
    }

    //±cal 월
    public getMonth(cal?: number) {
        if (cal === undefined) cal = 0;
        let date = new Date();
        return cal > 0 ? (date.getMonth() + cal) + 1 : (date.getMonth() - cal) + 1;
    }

    //±cal 일
    public getDay(cal?: number) {
        if (cal === undefined) cal = 0;
        let date = new Date();
        return cal > 0 ? date.getDate() + cal : date.getDate() - cal;
    }

    //Date to string
    // public getDateToString(date, sep?) {
    public getDateToString(date, sep?) {
        if (date == null) date = new Date();

        let stringDate = new Date(date);

        let year = stringDate.getFullYear();
        let month = stringDate.getMonth() + 1 < 10 ? `0${stringDate.getMonth() + 1}` : stringDate.getMonth() + 1;
        let day = stringDate.getDate() < 10 ? `0${stringDate.getDate()}` : stringDate.getDate();

        if (this.isEmpty(sep)) {
            return `${year}${month}${day}`;
        } else {
            return `${year}${sep}${month}${sep}${day}`;
        }
    }

    //String to Date
    public getStringToDate = (dateStr: string) => {

        if (dateStr != null) {
            let type = (typeof dateStr);

            if (type == 'string') {
                return new Date(dateStr);
            } else {
                return dateStr;
            }
        }

        // //숫자만 걸러냄
        // let regex = /[^0-9]/g;
        // var result = dateStr.replace(regex, "");

    }

    /**
     * 
     * @param title 알림창 제목
     * @param msg 알림창 내용
     * @param callBack ok버튼 콜백
     * @example this.comFun.alert('i', '확인', '이런식으로 콜', (e)=>{
                    console.log(e)
                });
     */

    public alert(title: string, msg: string, callBack?: Function) {
        if (this.isEmpty(callBack)) {
            Ext.Msg.show({
                title: title,
                message: msg,
            }).setBodyStyle('font-size: 14px; font-weight: bold; color: #000000');
        } else {
            Ext.Msg.alert(title, `<b>${msg}</b>`, callBack).setBodyStyle('font-size: 14px; font-weight: bold; color: #000000');
        }
    }

    /**
     * 
     * @param title 알림창 제목
     * @param msg 알림창 내용
     * @param callBack 버튼 콜백
     * @example this.comFun.alert('i', '확인', '이런식으로 콜', (e)=>{
                    console.log(e)
                });
     */
    public confirm(title: string, msg: string, callBack: Function) {
        // let fas_;
        // if( type === 'q' || type.toUpperCase() === 'Q' ){
        //     //질의
        //     fas_ = '<i class="fas fa-question" style="color: #0069d9;"></i>';
        // }else if( type === 'w' || type.toUpperCase() === 'W' ){
        //     //경고
        //     fas_ = '<i class="fas fa-exclamation" style="color: #e0a800;"></i>';
        // }else if( type === 'e' || type.toUpperCase() === 'E' ){
        //     //오류
        //     fas_ = '<i class="fas fa-times" style="color: red;"></i>';
        // }else if( type === 's' || type.toUpperCase() === 'S' ){
        //     //정상
        //     fas_ = '<i class="fas fa-check" style="color: #218838;"></i>';
        // }

        // title = this.isEmpty(fas_) === false ? `${fas_}  ${title}` : title;

        // Ext.Msg.confirm(title, `<b>${msg}</b>`, callBack);
        Ext.Msg.confirm(title, `<b>${msg}</b>`, callBack).setBodyStyle('font-size: 14px; font-weight: bold; color: #000000');

        //@yhj20220818 메시지박스 모듈 수정
        // Ext.Msg.setMinWidth(300);   //크기 조절
        // Ext.Msg.setMinHeight(200);  //높이 조절
        // Ext.Msg.confirm(title, `<b style="position: fixed;top: 0;margin-top: 60px;">${msg}</b>`, callBack).setBodyStyle('font-size: 15px; font-weight: bold; color: #000000;');
    }

    /**
     * 버튼 단축키 공통 셋팅
     * @param event 
     * @param that 
     */
    public keyMap(event, that) {
        new Ext.util.KeyMap({
            target: event.cmp.el,
            key: [112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 13],
            handler: (keyCode, e) => {
                switch (keyCode) {
                    case 112:
                        //F1 조회
                        that.btnDisable.searchBtn === false ? that.onTapQuery() : null;
                        break;
                    case 113:
                        //F2 저장		
                        that.btnDisable.saveBtn === false ? that.onTapSave() : null;
                        break;
                    case 114:
                        //F3 수정
                        that.btnDisable.modifyBtn === false ? that.onTapModify() : null;
                        break;
                    case 115:
                        //F4 삭제
                        that.btnDisable.deleteBtn === false ? that.onTapDelete() : null;
                        break;
                    case 116:
                        //F5 신규
                        that.btnDisable.newBtn === false ? that.onTapNew() : null;
                        break;
                    case 117:
                        //F6 승인요청
                        that.btnDisable.reqApprBtn === false ? that.onTapRequestAppr() : null;
                        break;
                    case 118:
                        //F7 승인
                        that.btnDisable.apprBtn === false ? that.onTapAppr() : null;
                        break;
                    case 119:
                        //F8 반려
                        that.btnDisable.rejectBtn === false ? that.onTapReject() : null;
                        break;
                    case 120:
                        //F9 엑셀
                        that.btnDisable.excelBtn === false ? that.onTapExcel() : null;
                        break;
                    case 121:
                        //F10 출력
                        that.btnDisable.reportBtn === false ? that.onTapReport() : null;
                        break;
                    case 122:
                        //F11 메뉴얼
                        that.btnDisable.menualBtn === false ? that.onTapMenual() : null;
                        break;
                    case 123:
                        //F12 취소
                        that.btnDisable.cancelBtn === false ? that.onTapCancel() : null;
                        break;
                    //@yhj_20220706 모바일에서 이동 버튼이 엔터인지 확인하기 위해 추가(확인필요)
                    case 13:
                        //enter 조회
                        that.btnDisable.searchBtn === false ? that.onTapQuery() : null;
                        break;
                    default:
                }
            },
            scope: 'this'
        });
    }

    // @ychan_20220629 
    // public keyMap_type2(event, that) {
    //     new Ext.util.KeyMap({
    //         target: event.cmp.el,
    //         key: [112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123],
    //         handler: (keyCode, e) => {
    //             switch (keyCode) {
    //                 case 112:
    //                     //F1 조회
    //                     that.btnViewMgr.btnDisable.searchBtn === false ? that.onTapQuery() : null;
    //                     break;
    //                 case 113:
    //                     //F2 저장		
    //                     that.btnViewMgr.btnDisable.saveBtn === false ? that.onTapSave() : null;
    //                     break;
    //                 case 114:
    //                     //F3 수정
    //                     that.btnViewMgr.btnDisable.modifyBtn === false ? that.onTapModify() : null;
    //                     break;
    //                 case 115:
    //                     //F4 삭제
    //                     that.btnViewMgr.btnDisable.deleteBtn === false ? that.onTapDelete() : null;
    //                     break;
    //                 case 116:
    //                     //F5 신규
    //                     that.btnViewMgr.btnDisable.newBtn === false ? that.onTapNew() : null;
    //                     break;
    //                 case 117:
    //                     //F6 승인요청
    //                     that.btnViewMgr.btnDisable.reqApprBtn === false ? that.onTapRequestAppr() : null;
    //                     break;
    //                 case 118:
    //                     //F7 승인
    //                     that.btnViewMgr.btnDisable.apprBtn === false ? that.onTapAppr() : null;
    //                     break;
    //                 case 119:
    //                     //F8 반려
    //                     that.btnViewMgr.btnDisable.rejectBtn === false ? that.onTapReject() : null;
    //                     break;
    //                 case 120:
    //                     //F9 엑셀
    //                     that.btnViewMgr.btnDisable.excelBtn === false ? that.onTapExcel() : null;
    //                     break;
    //                 case 121:
    //                     //F10 출력
    //                     that.btnViewMgr.btnDisable.reportBtn === false ? that.onTapReport() : null;
    //                     break;
    //                 case 122:
    //                     //F11 메뉴얼
    //                     that.btnViewMgr.btnDisable.menualBtn === false ? that.onTapMenual() : null;
    //                     break;
    //                 case 123:
    //                     //F12 취소
    //                     that.btnViewMgr.btnDisable.cancelBtn === false ? that.onTapCancel() : null;
    //                     break;
    //                 default:
    //             }
    //         },
    //         scope: 'this'
    //     });
    // }

    public getDateTime() {
        //yyyyMMddHHmmss
        var today = new Date();
        var year = today.getFullYear();
        var month = ('0' + (today.getMonth() + 1)).slice(-2);
        var day = ('0' + today.getDate()).slice(-2);

        var hours = ('0' + today.getHours()).slice(-2);
        var minutes = ('0' + today.getMinutes()).slice(-2);
        var seconds = ('0' + today.getSeconds()).slice(-2);

        var dateString = year + month + day + hours + minutes + seconds;
        return dateString;
    }

    public date() {
        //yyyyMMdd
        var today = new Date();
        var year = today.getFullYear();
        var month = ('0' + (today.getMonth() + 1)).slice(-2);
        var day = ('0' + today.getDate()).slice(-2);

        var dateString = year + month + day;
        return dateString;
    }

    public time() {
        //HHmmss
        var today = new Date();
        var hours = ('0' + today.getHours()).slice(-2);
        var minutes = ('0' + today.getMinutes()).slice(-2);
        var seconds = ('0' + today.getSeconds()).slice(-2);

        var dateString = hours + minutes + seconds;
        return dateString;
    }

    public dateTime() {
        // yyyyMMddhhmmss
        return this.date() + this.time();
    }

    /***************************************************************************
     *  ag-grid 추가로 인한 메소드
     */
    /**
     * 그리드 행번호
     */
    public gridRowNo(params) {
        // @ychan_20211129 합계필드에서 No 출력 안되게끔 수정
        // return params.node.rowIndex + 1;
        if (params.data[0] !== "Σ")
            return params.node.rowIndex + 1;
    }

    /**
     * 그리드 합계 필드 생성
     */
    public gridBottomSumRow(gridApi: any, gridColumnApi: any, columns: Array<string>) {
        let allColumns = {};
        let firstCol = "";
        let index = 0;
        gridColumnApi.getAllGridColumns().forEach(item => {
            if (index === 0) {
                firstCol = item.colId;
                index++;
            }
            allColumns[item.colId] = null;
        });

        columns.forEach(el => {
            gridApi.forEachNodeAfterFilter((rowNode) => {
                if (rowNode.data[el]) {
                    allColumns[el] += Number(rowNode.data[el]);
                }
            });
        });

        allColumns[firstCol] = "Σ";
        return allColumns;
    }

    /**
     * 그리드 합계 필드 생성 (테스트)
     */
    public gridBottomRow(gridApi: any, gridColumnApi: any) {
        let allColumns = {};
        let firstCol = "";
        let index = 0;
        gridColumnApi.getAllGridColumns().forEach(item => {
            if (index === 0) {
                firstCol = item.colId;
                index++;
            }
            allColumns[item.colId] = null;
        });

        allColumns[firstCol] = "Σ";
        return allColumns;
    }

    /**
     * 그리드 컬럼 자동 크기 조정
     */
    public autoSizeColumn(columnApi: any, skipHeader?: boolean) {

        let allColumnIds = [];
        if (skipHeader === undefined) skipHeader = false;

        columnApi.getAllColumns().forEach(function (column) {
            allColumnIds.push(column.colId);
        });

        columnApi.autoSizeColumns(allColumnIds, skipHeader);
    }

    /**
     * 그리드 컬럼 값 갱신
     */
    public gridColRef(value, gridApi, rowId, field) {
        if (!this.isEmpty(value)) {
            let rowNode = gridApi.getRowNode(rowId);
            rowNode.setDataValue(field, value);
            rowNode.setDataValue('rowStat', "U");
        }
    }

    // 그리드 RowStat 제어
    public gridRowStatControl(value, gridApi, rowId) {
        let rowNode = gridApi.getRowNode(rowId);
        rowNode.setDataValue('rowStat', value);
    }

    /**
     * 필드 포커스 이동시 갱신 작업
     * (blur)="this.comFun.blurField($event.sender.rawValue, this.gridMain.gridApi, this.formModel, this.gridMain.rowId, 'localGovNm')"
     */
    public blurField(value, gridApi, paramModel, rowId, fieldId) {
        if (!this.isEmpty(value) && rowId !== undefined) {
            //값이 변경될때만 갱신
            if (paramModel[fieldId] != value) {
                paramModel[fieldId] = value;
                this.gridColRef(value, gridApi, rowId, fieldId);
            }
        }
        else {
            paramModel[fieldId] = value;
        }
    }
    //그리드 엑셀내보내기(grid명 대부분 gridMain)
    public onBtnExport(grid, route) {
        var excelParams = {
            fileName: route.text
        }
        grid.gridApi.exportDataAsCsv(excelParams);
    }

    /**
     * 그리드 데이터 삭제
     */
    public gridRowDelete(gridApi) {
        const selectedData = gridApi.getSelectedRows();
        if (selectedData.length === 0) {
            Ext.toast('대상이 없습니다.!');
        } else {
            const items = [];
            selectedData.forEach(el => {
                el.rowStat = 'D';
                items.push(el);
            });

            gridApi.applyTransaction({ update: items });
        }
    }

    /**
     * 그리드 데이터 추가
     */
    public gridRowCreate(gridApi, item?, index?) {

        if (item === undefined) {
            item = {
                rowStat: 'C'
            }
        } else {
            item.rowStat = 'C';
        }

        gridApi.applyTransaction({
            add: [item],
            addIndex: index,
        });
    }

    // 그리드 선택 초기화
    public gridClearRowSelect(gridMain) {
        gridMain.rowId = undefined;
    }

    /**
     * 그리드 상단 고정 바 포멧
     */
    public gridTopFormat(params) {
        if (params.node.rowPinned) {
            return {
                component: 'customPinnedRowRenderer',
                params: { style: { 'font-weight': 'bold' } },
            };
        } else {
            return undefined;
        }
    }
    //****************************************************************************************** */

    // 문자열 앞 Padding 처리
    public fillZero(width, str) {
        return str.length >= width ? str : new Array(width - str.length + 1).join('0') + str;//남는 길이만큼 0으로 채움
    }

    // 시작일, 종료일 차이 계산
    public subDate(stDate, endDate) {
        let stYy = Number(stDate.substring(0, 4));
        let stMm = Number(stDate.substring(4, 6));
        let stDd = Number(stDate.substring(6, 8));

        let st = new Date(stYy, stMm, stDd);

        let endYy = Number(endDate.substring(0, 4));
        let endMm = Number(endDate.substring(4, 6));
        let endDd = Number(endDate.substring(6, 8));

        let dt = new Date(endYy, endMm, endDd);

        let retSubDate = Math.abs(st.getTime() - dt.getTime()) / (1000 * 60 * 60 * 24);
        return retSubDate
    }

    // 입력 년/월 마지막 날짜 계산
    public monthLastDay(pY: any, pM: any) {
        var lastDay = 31;

        //@yhj_20220217 마지막 날짜 계산.
        switch (pM) {
            case 2: //윤달 계산 (년도가 4로 나누어 떨어지면서 100으로 나뉘지 않으면서 그중에 400으로 나뉘어지면 윤년-> 29일)
                if (pY % 4 == 0 && pY % 100 != 0 || pY % 4 == 0 && pY % 400 == 0) // ||보다 &&가 우선순위가 먼저임
                {
                    lastDay = 29;
                } else {
                    lastDay = 28;
                }
                break;
            case 4:
            case 6:
            case 9:
            case 11:
                lastDay = 30;
        }

        return lastDay;
    }

    // @ychan_20220413
    // 그리드 row 삭제 함수
    // 그리드가 선택된 상태에서 호출하면 선택된 row 삭제 됨.
    // grid : grid 객체
    public removeGridRow(grid: any) {
        //@ychan_20230113 splice 사용법 잘못되었음
        // let selectedRowData = grid.gridApi.getSelectedRows();
        // grid.rowData.splice(grid.rowData.findIndex((e) => e === selectedRowData));
        // grid.gridApi.applyTransaction({ remove: selectedRowData });

        // 데이터 범위삭제. 삭제를 원하는 ROW 와 SIZE 를 같이 입력해야한다.
        // grid.rowData.splice(grid.rowId, 1);

        //@yhj20230118 선택한 index 알아내기
        let rowIndex = grid.gridApi.getFocusedCell().rowIndex;
        //@yhj20230118 @수정 셀클릭이벤트는 인덱스를 넘겨주지않는다
        grid.rowData.splice(rowIndex, 1);
        // 화면상에 보여지는 Grid Row 삭제
        grid.gridApi.applyTransaction({ remove: grid.gridApi.getSelectedRows() });
        // 단순히 삭제만 했을경우 Index가 밀리는 현상 확인. 다시 SetRow 필요
        grid.gridApi.setRowData(grid.rowData);
    }

    // 주민번호 분할 처리
    // 조건 : 주민번호는 모델에 juminNo, juminNo1, juminNo2 가 선언되어있어야 한다.
    //        서버에서 넘어온 juminNo는 juminNo1, juminNo2 로 자동 분할된다.
    public divideJuminNo(model: any) {
        var num = model.juminNo;

        // 비어있을경우
        if (this.isEmpty(num))
            return;

        // 숫자로만 구성되어있지 않을경우
        if (!num.match(/^[0-9]*$/))
            return;

        // // 주민번호 길이가 아닐경우
        // if(num.length != 13)
        //     return;

        // model.juminNo1 = num.substring(0, 6);
        // model.juminNo2 = num.substring(6, 13);


        // 주민번호 길이가 아닐경우
        if (num.length === 13) {
            model.juminNo1 = num.substring(0, 6);
            model.juminNo2 = num.substring(6, 13);
        }
        else if (num.length === 7) {
            model.juminNo1 = num.substring(0, 6);
            model.juminNo2 = num.substring(6, 7);
        }
        else {
            return;
        }
    }

    // 주민번호 조합 처리
    public mergeJuminNo(model: any) {

        var num1 = model.juminNo1;
        var num2 = model.juminNo2;

        // @yhj _ 20220610 비어있을경우 리턴
        if (this.isEmpty(num1) && this.isEmpty(num2))
            return;

        model.juminNo = this.valEmpty(model.juminNo1) + this.valEmpty(model.juminNo2);
    }

    // 주민번호 조합 처리
    public combineJuminNo(model: any) {

        var num1 = model.juminNo1;
        var num2 = model.juminFirstNo;
        var num3 = model.juminNo2;

        // @yhj _ 20220610 비어있을경우 리턴
        if (this.isEmpty(num1) && this.isEmpty(num2) && this.isEmpty(num3))
            return;

        model.juminNo = this.valEmpty(model.juminNo1) + this.valEmpty(model.juminFirstNo) + this.valEmpty(model.juminNo2);
    }

    // 사업자번호 분할 처리
    // 조건 : 사업자번호는 모델에 coNo, coNo1, coNo2, coNo3 가 선언되어있어야 한다.
    //        서버에서 넘어온 coNo는 coNo1, coNo2, coNo3 로 자동 분할된다.
    public divideCoNo(model: any) {
        var num = model.coNo;

        // 비어있을경우
        if (this.isEmpty(num))
            return;

        // 숫자로만 구성되어있지 않을경우
        if (!num.match(/^[0-9]*$/))
            return;

        // 사업자번호 길이가 아닐경우
        if (num.length != 10)
            return;

        model.coNo1 = num.substring(0, 3);
        model.coNo2 = num.substring(3, 5);
        model.coNo3 = num.substring(5, 10);
    }

    // 사업자번호 조합 처리
    public mergeCoNo(model: any) {
        var num1 = model.coNo1;
        var num2 = model.coNo2;
        var num3 = model.coNo3;

        // @yhj _ 20220610 비어있을경우 리턴
        if (this.isEmpty(num1) && this.isEmpty(num2) && this.isEmpty(num3))
            return;

        model.coNo = this.valEmpty(model.coNo1) + this.valEmpty(model.coNo2) + this.valEmpty(model.coNo3);

    }

    // 전화번호 분할 처리
    // 조건 : 전화번호는 모델에 telNo, telNo1, telNo2, telNo3 가 선언되어있어야 한다.
    //        서버에서 넘어온 telNo는 telNo1, telNo2, telNo3 로 자동 분할된다.
    public divideTelNo(model: any) {
        var num = model.telNo;

        // 비어있을경우
        if (this.isEmpty(num))
            return;

        // // 구분자가 정확하지 않을경우 처리
        // if (!num.match(/^[\-\.0-9+]*$/)) 
        //     return null;

        var cut = num.split('-');
        model.telNo1 = cut[0];
        model.telNo2 = cut[1];
        model.telNo3 = cut[2];
    }

    // 전화번호 조합 처리
    public mergeTelNo(model: any) {

        var num1 = model.telNo1;
        var num2 = model.telNo2;
        var num3 = model.telNo3;

        // @yhj _ 20220610 비어있을경우 리턴
        if (this.isEmpty(num1) && this.isEmpty(num2) && this.isEmpty(num3))
            return;


        model.telNo = this.valEmpty(model.telNo1) + "-" + this.valEmpty(model.telNo2) + "-" + this.valEmpty(model.telNo3);

    }

    // 휴대폰번호 분할 처리
    // 조건 : 전화번호는 모델에 phoneNo, phoneNo1, phoneNo2, phoneNo3 가 선언되어있어야 한다.
    //        서버에서 넘어온 phoneNo는 phoneNo1, phoneNo2, phoneNo3 로 자동 분할된다.
    public dividePhoneNo(model: any) {
        var num = model.phoneNo;

        // 비어있을경우
        if (this.isEmpty(num))
            return;

        // // 구분자가 정확하지 않을경우 처리
        // if (!num.match(/^[\-\.0-9+]*$/)) 
        //     return null;

        var cut = num.split('-');
        model.phoneNo1 = cut[0];
        model.phoneNo2 = cut[1];
        model.phoneNo3 = cut[2];
    }

    // 전화번호 조합 처리
    public mergePhoneNo(model: any) {

        var num1 = model.phoneNo1;
        var num2 = model.phoneNo2;
        var num3 = model.phoneNo3;

        // @yhj _ 20220610 비어있을경우 리턴
        if (this.isEmpty(num1) && this.isEmpty(num2) && this.isEmpty(num3))
            return;

        model.phoneNo = this.valEmpty(model.phoneNo1) + "-" + this.valEmpty(model.phoneNo2) + "-" + this.valEmpty(model.phoneNo3);
    }

    // 관리자 암호 생성 (02)월 + (02)일 + (1) 월X일 끝1자리
    public adminKey() {
        var dt = this.date();
        var dtY = dt.substring(0, 4);
        var dtM = dt.substring(4, 6);
        var dtD = dt.substring(6, 8);
        var key = (parseInt(dtM) * parseInt(dtD)) % 10

        return dtM + dtD + key;
    }

    // 팩스번호 분할 처리
    // 조건 : 팩스번호는 모델에 faxNo, faxNo1, faxNo2, faxNo3 가 선언되어있어야 한다.
    //        서버에서 넘어온 faxNo faxNo1, faxNo2, faxNo3 로 자동 분할된다.
    public divideFaxNo(model: any) {
        var num = model.faxNo;

        // 비어있을경우
        if (this.isEmpty(num))
            return;

        // // 구분자가 정확하지 않을경우 처리
        // if (!num.match(/^[\-\.0-9+]*$/)) 
        //     return null;

        var cut = num.split('-');
        model.faxNo1 = cut[0];
        model.faxNo2 = cut[1];
        model.faxNo3 = cut[2];
    }

    // 팩스번호 조합 처리
    public mergeFaxNo(model: any) {
        model.faxNo = this.valEmpty(model.faxNo1) + "-" + this.valEmpty(model.faxNo2) + "-" + this.valEmpty(model.faxNo3);
    }


    // //**************************************************************************
    // // osh_20210923
    // // 그리드 컬럼 랜더러 : 전화번호, 휴대폰번호 포맷팅
    // telNoFormat = (dt: any) => {
    //     if (dt === null || dt === undefined || this.isEmpty(dt))
    //         return dt;

    //     if (dt !== undefined && dt.length === 8) {
    //         return dt.replace(/([0-9]{4})([0-9]{4})/, "$1-$2");
    //     } else if (dt.length > 8) {
    //         return dt.replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/, "$1-$2-$3");
    //     } else {
    //         return dt;
    //     }
    // }

    // // 그리드 컬럼 랜더러 : 주민번호 포맷팅
    // juminFormat = (dt: any) => {
    //     if (dt === null || dt === undefined || this.isEmpty(dt))
    //         return dt;

    //     if (dt !== undefined && dt.length === 13) {
    //         const rExp = /(\d{6})(\d{1})(\d{6})/;
    //         return dt.replace(rExp, '$1-$2$3');
    //     } else {
    //         return dt;
    //     }
    // }

    // // 그리드 컬럼 랜더러 : 사업자 번호 포맷팅
    // coNoFormat = (dt: any) => {
    //     if (dt === null || dt === undefined || this.isEmpty(dt))
    //         return dt;

    //     if (dt !== undefined && dt.length == 10) {
    //         let repx = /(\d{3})(\d{2})(\d{5})/;
    //         return dt.replace(repx, '$1-$2-$3')
    //     } else {
    //         return dt;
    //     }
    // }

    // // 일자 컬럼 랜더러 : (yyyyMMddHHmmss -> yyyy-MM-dd HH:mm:ss)
    // dateFormat = (dt: any) => {
    //     if (dt === null || dt === undefined || this.isEmpty(dt))
    //         return dt;

    //     if (dt.length == 14) {
    //         let repx = /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/;
    //         return dt.replace(repx, '$1-$2-$3 $4:$5:$6')
    //     } else {
    //         return dt;
    //     }
    // }

    /*
        계정 권한 ComboBox Select => Data 변환
    */
    // public userAuthCbSelectToData(val: any, type?: string) {
    //     switch (val) {
    //         case "1":
    //             // 관리자
    //             return "Admin";
    //         case "2":
    //             // 일반사용자
    //             return "User";
    //     }

    //     return val;
    // }
    // /**************************************************************************

    // // 그리드 row추가 함수
    // funcAddRowData(grid : any, inputRow : any)
    // {
    //     const rowData = [];
    //     rowData.push(inputRow);

    //     grid.gridApi.forEachNode(node => 
    //     {
    //         console.log(node.data);

    //         rowData.push(node.data);
    //     });

    //     grid.rowData = [];
    //     grid.rowData = rowData;	                                    // 그리드 데이터 교체

    //     //grid.gridApi.setFocusedCell(0, "frcCd");                    // 포커스 이동

    //     return grid;
    // }

    // 그리드 row추가 함수
    funcAddRowData(grid: any, inputRow: any) {
        const rowData = [];
        rowData.push(inputRow);

        grid.rowData.forEach(element => {
            rowData.push(element);
        });

        grid.rowData = [];
        grid.rowData = rowData;	                                    // 그리드 데이터 교체

        return grid;
    }


    // 그리드 row추가 함수
    // funcAddRowData(grid : any, gRow : Array<any>, inputRow : any)
    // {
    //     const rowData = [];
    //     rowData.push(inputRow);

    //     gRow.forEach(element => {
    //         console.log(element);

    //         rowData.push(element);
    //     });

    //     grid.rowData = rowData;
    //     return gRow;
    // }


    // @ychan_20230127 계정관리 소속정보 추가
    // 그리드 중복체크 (가맹점, 대표명, 활성화구역, 파일)
    funcDupCheckGridData(arrList: Array<any>, target: any, type: string) {
        let bRet = false;

        // 비교대상이 없을경우
        if (arrList.length === 0) {
            return false;
        }

        for (let i = 0; i < arrList.length; i++) {
            switch (type) {
                case 'Frc':
                    if (arrList[i].frcCd === target) {
                        if (arrList[i].useYn === 'N')
                            bRet = false;   // 삭제한 내역 재등록 시 발생
                        else
                            bRet = true;    // 중복확인
                    }
                    break;
                case 'Ceo':
                    if (arrList[i].juminNo === target) {
                        if (arrList[i].useYn === 'N')
                            bRet = false;   // 삭제한 내역 재등록 시 발생
                        else
                            bRet = true;    // 중복확인
                    }
                    break;
                case 'Group':
                    if (arrList[i].marketCd === target) {
                        if (arrList[i].useYn === 'N')
                            bRet = false;   // 삭제한 내역 재등록 시 발생
                        else
                            bRet = true;    // 중복확인
                    }
                    break;
                case 'File':
                    if (arrList[i].fileNm === target) {
                        if (arrList[i].useYn === 'N')
                            bRet = false;   // 삭제한 내역 재등록 시 발생
                        else
                            bRet = true;    // 중복확인
                    }
                    break;
                case 'Asso':
                    if (arrList[i].assoCd === target) {
                        if (arrList[i].useYn === 'N')
                            bRet = false;   // 삭제한 내역 재등록 시 발생
                        else
                            bRet = true;    // 중복확인
                    }
                    break;
                case 'UserDept':    // 계정관리 소속정보 제어
                    if (arrList[i].deptCd === target) {
                        if (arrList[i].useYn === 'N')
                            bRet = false;   // 삭제한 내역 재등록 시 발생
                        else
                            bRet = true;    // 중복확인
                    }
                    break;
            }
        }

        return bRet;
    }

    // 응답 모델의 메시지 처리
    SetResMessage(resMessage: string) {
        let errMsg = "";
        switch (resMessage) {
            case "9999":
            case "9998":
            case "9997":
                errMsg = "통신오류 [CODE : " + resMessage + "]<br>관리자 확인요망";
                break;
            default:
                errMsg = resMessage;
                break;
        }

        return errMsg;
    }

    public divideJumin(model: any) {
        var num = model.juminNo;

        // 비어있을경우
        if (this.isEmpty(num))
            return;

        // 숫자로만 구성되어있지 않을경우
        if (!num.match(/^[0-9]*$/))
            return;

        // // 주민번호 길이가 아닐경우
        // if(num.length != 13)
        //     return;

        // model.juminNo1 = num.substring(0, 6);
        // model.juminNo2 = num.substring(6, 13);


        // 주민번호 길이가 아닐경우
        if (num.length === 13) {
            model.juminNo1 = num.substring(0, 6);
            model.juminNo2 = num.substring(6, 7);
        }
        else if (num.length === 7) {
            model.juminNo1 = num.substring(0, 6);
            model.juminNo2 = num.substring(6, 7);
        }
        else {
            return;
        }
    }

    CheckMaxLength(event) {
        let value = event.sender.rawValue;
        let maxLength = event.sender._maxLength;
        if (value !== undefined) {
            let byteLength = value.replace(/[\0-\x7f]:(0-\u07ff]:(.))/g, "$&$1$2").length;

            if (byteLength > maxLength)
                value = value.substring(0, maxLength)
        }
        else {
            // undefined 일경우 value 값 셋팅
            // 한글일 경우 글자가 넘어갈때 (앙-> 아아) undefined 오류발생
            value = event.sender.target.value;
        }

        return value;
    }

    // Grid Row 추가함수
    girdRowAdd(grid, row) {
        this.gridRowCreate(grid.gridApi, row);
        grid.rowData.splice(grid.rowData, 0, row);
        grid.gridApi.setRowData(grid.rowData);
    }

    // api 응답처리
    apiErrorCheck(param) {
        let bRet = false;
        switch (param) {
            case '-99':
                // API Exception
                //this.alert(this.i18n('오류'), 'API Exception');
                this.alert(this.i18n('오류'), '[서버 오류발생]<br><br>작업처리중 문제가 발생했습니다.<br>콜센터 연락처 : 1588-4716');
                break;
            case '-98':
                // Interceptor Error [key 없음]
                this.alert(this.i18n('오류'), '통신오류 [CODE : ' + param + ']<br>다른곳에서 동일한 ID로 로그인되었습니다.');
                break;
            case '-97':
                // Interceptor Error [복호화 오류]
                this.alert(this.i18n('오류'), '통신오류 [CODE : ' + param + ']<br>관리자 확인요망');
                break;
            case '-96':
                // Interceptor Error [Session 오류]
                this.alert(this.i18n('오류'), '통신오류 [CODE : ' + param + ']<br>관리자 확인요망');
                break;
            case '-95':
                // 첨부파일 오류
                this.alert(this.i18n('오류'), '첨부파일 오류 - 파일을 확인 해주세요.');
                break;
            case '-94':
                // 첨부파일 오류
                this.alert(this.i18n('오류'), '승인할 수 없는 자료입니다. (ASIS 자료)');
                break;
            case '-93': // @ychan_20230209 세션관리
                // 세션 없음
                window.location.reload();
                break;
            default:
                bRet = true;
                break;
        }

        return bRet;
    }

    // 콤보박스 지역정보 셋팅
    setComboBoxLocalValue(userInfo: any, cbsSfLocalGovCd: any, cbsSfLocalDetailCd: any) {
        for (let i = 0; i < userInfo.userDept.length; i++) {
            // 시도 코드 cbsSfLocalGovCd
            let localGovCd = userInfo.userDept[i].localGovCd;
            let localGovNm = userInfo.userDept[i].localGovNm;

            cbsSfLocalGovCd.push({ "comboId": localGovCd, "comboNm": localGovNm + '-' + localGovCd, "comboData": localGovNm });

            // 시군구 코드 cbsSfLocalDetailCd
            if (userInfo.userDept[i].localDetailCd !== undefined) {
                let localDetailCd = userInfo.userDept[i].localDetailCd;
                let localDetailNm = userInfo.userDept[i].localDetailNm;

                cbsSfLocalDetailCd.push({ "comboId": localDetailCd, "comboNm": localDetailNm + '-' + localDetailCd, "comboData": localDetailNm });
            }
        }
    }

    //********************************************************************************************* */
    // 전문암호화
    private rsaKey: any;
    private aesKey: any;
    private aesIv: any;

    //AES key SET
    public setEncryptKey(param: any) {

        // let encrypt = new JSEncrypt();
        // encrypt.setPrivateKey(this.rsaKey);
        // this.aesKey = encrypt.decrypt(param.aesKey);
        // this.aesIv = encrypt.decrypt(param.aesIv);

        this.aesKey = param.aesKey;
        this.aesIv = param.aesIv;
    }

    //암호화
    public encrypt(param: any) {
        const cipher = CryptoJS.AES.encrypt(param, CryptoJS.enc.Utf8.parse(this.aesKey), {
            iv: CryptoJS.enc.Utf8.parse(this.aesIv),
            padding: CryptoJS.pad.Pkcs7,
            mode: CryptoJS.mode.CBC,
        });

        return cipher.toString();
    }

    //복호화
    public decrypt(param: any) {
        const cipher = CryptoJS.AES.decrypt(param, CryptoJS.enc.Utf8.parse(this.aesKey), {
            iv: CryptoJS.enc.Utf8.parse(this.aesIv),
            padding: CryptoJS.pad.Pkcs7,
            mode: CryptoJS.mode.CBC,
        });

        return JSON.parse(cipher.toString(CryptoJS.enc.Utf8));
    }
    //********************************************************************************************* */

    // 랜덤값 출력함수
    // pField : "abcdeft...."
    // pLength : 결과 길이
    public getRandom(pField : string, pLength : number) {
        let sRet = ""; 
        let baseField = pField;
        for (let i = 0; i < pLength; i++) {

            //6자리 랜덤값 난수 추출
            sRet += baseField.charAt(Math.floor(Math.random() * baseField.length));
        }
        return sRet;
    }
}