
import { Injectable } from "@angular/core";
import { ComFunction } from "./com.function";
declare var Ext: any;

@Injectable()
export class ComFormat {

    comFum: ComFunction = new ComFunction(null);

    //Ext 필드 콤마
    public extComma(param) {
        return Ext.util.Format.number(param, "0,000");
    }

    //천단위 콤마
    public comma(str) {
        str = String(str);
        if (isNaN(str)) {
            return 0;
        } else {
            return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
        }
    }

    //콤마 삭제
    public uncomma(str) {
        str = String(str);
        return str.replace(/[^\d]+/g, '');
    }


    /*
    * 그리드 빈칸 포멧
    */
    public gridStringEmpty(param) {
        let val = param.value;
        if (val === undefined || val === null) {
            return '';
        }
    }

    /**
     * 그리드 콤마 포멧
     */
    commaFmt(param: any) {
        let val = param.value;
        if( val === '' || val === undefined ){
            return 0;
        }else{
            return Math.floor(val).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
        }
    }

    /**
     * 그리드 날짜 포멧
     */
    public gridDateFormatter(param) {
        let val = param.value;
        if (val === undefined || val === null) {
            return val;
        } else {
            // @ychan_20220120 그리드 합계 수량표현시 포멧깨지는 문제 수정
            // return `${val.substring(0, 4)}-${val.substring(4, 6)}-${val.substring(6, 8)}`;

            if (val.length == 8) {
                let repx = /(\d{4})(\d{2})(\d{2})/;
                return val.replace(repx, '$1-$2-$3');
            }
            else if (val.length == 6) {
                let repx = /(\d{4})(\d{2})/;
                return val.replace(repx, '$1-$2');
            }
        }
    }

    /**
     * Ag Grid 날짜 포멧
     * @param param
     * @returns
     */
    dateFmt(param: any) {
        let val = param.value;
        if (val === undefined || val === null) {
            return val;
        } else {

            if (val.length == 14) {
                //년월일시분초
                let repx = /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/;
                return val.replace(repx, '$1-$2-$3 $4:$5:$6');
            }
            else if (val.length == 12) {
                //년월일시분
                let repx = /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})/;
                return val.replace(repx, '$1-$2-$3 $4:$5');
            }else if (val.length == 8) {
                //년월일
                let repx = /(\d{4})(\d{2})(\d{2})/;
                return val.replace(repx, '$1-$2-$3');
            }else if (val.length == 6) {
                //년월
                let repx = /(\d{4})(\d{2})/;
                return val.replace(repx, '$1-$2');
            }else{
                return val;
            }

        }
    }


     /**
     * 그리드(ag-grid) 사업자번호 포맷
     */
         public gridCoNoFormatter(param) {
            let val = param.value;
            if (val === undefined || val === null) {
                return val;
            } else {
                let repx = /(\d{3})(\d{2})(\d{5})/;
                return val.replace(repx, '$1-$2-$3');
            }
        }

    /**
     * Ag Grid 전화번호 포맷
     * @param param
     * @returns
     */
    telFmt(param:any){
        let val = param.value;
        if (val === undefined || val === null) {
            return val;
        } else {
            let repx = /(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/;
            return val.replace(repx, '$1-$2-$3');
        }
    }

    /**
     * Ag Grid 핸드폰번호 포맷
     * @param param 
     * @returns 
     */
    celFmt(param:any){
        let val = param.value;
        if (val === undefined || val === null) {
            return val;
        } else {
            let repx = /(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/;
            return val.replace(repx, '$1-$2-$3');
        }
    }

    //그리드 셀렉트박스 편집셀 데이터 양식 처리
    selectBoxOption(parmas: any){
        
        let values: Array<string> = new Array;
        if( parmas !== undefined ){
            parmas.forEach((item: any)=>{
                values.push(item.cdData);
            });
        }
        return values;
        
    }

    //그리드 셀렉트박스 참조 데이터
    selectBoxRefData(parmas: any){
        let result: any = {};
        if( parmas !== undefined ){
            parmas.forEach((item: any)=>{
                let key = item.cdData;
                let value = item.cdNm
                result[key] = value;
            });
        }

        return result;
    }

    //그리드 셀렉트박스 값 선택시 화면에 표시할 값 처리
    selectBoxFmt(value: any, params: any){
        let findObj = params.find( (item:any) => item.cdNm === value);

        return findObj.cdNm;
    }

}