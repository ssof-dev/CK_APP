import { Injectable } from '@angular/core';
declare var Ext: any;
/**
 * validation function
 */
@Injectable()
export class ComValidation {

    /**
     * 영어 및 숫자만 입력 검증
     * @param value 
     * @returns 
     */
    validationEnNum = (value) => {
        if (!value.match(/^[a-zA-Z0-9_\.]+$/)) {
            return '숫자 및 영어만 입력하세요';
        } else {
            return true;
        }
    }

    /**
     * 한글 및 숫자만 입력 검증
     * @param value 
     * @returns 
     */
    validationKrNum = (value) => {
        if (!value.match(/^[가-힣a-zA-Z0-9]+$/)) {
            return '한글 및 숫자만 입력하세요';
        } else {
            return true;
        }
    }

    /**
     * 숫자만 입력
     * @param value 
     * @returns 
     */
    validationNum = (value) => {
        if (!value.match(/^[0-9]*$/)) {
            return '숫자만 입력하세요';
            
        } else {
            return true;
        }
    }

    /**
     * 소수점 콤마 숫자
     * @param value 
     * @returns 
     */
    validationNumFmt = (value) => {
        if (!value.match(/^(\d|-)?(\d|,)*\.?\d*$/)) {
            return '숫자만 입력하세요!!';
        } else {
            return true;
        }
    }

    /**
     * 영어만 입력
     * @param value 
     * @returns 
     */
    validationEn = (value) => {
        if (!value.match(/^[a-zA-Z]*$/)) {
            return '영어만 입력하세요';
        } else {
            return true;
        }
    }

    /**
     * 한글만 입력
     * @param value 
     * @returns 
     */
    validationKr = (value) => {
        if (!value.match(/^[가-힣]+$/)) {
            return '한글만 입력하세요';
        } else {
            return true;
        }
    }

    /**
     * 숫자 하이픈(-) 입력
     * @param value 
     * @returns 
     */
    validationNumHyphen = (value) => {
        if (!value.match(/^[\-\.0-9+]*$/)) {
            return `숫자 및 '-'만 입력하세요`;
        } else {
            return true;
        }
    }

    /**
     * 이메일 양식
     * @param value 
     * @returns 
     */
    validationEmail = (value) => {
        if (!value.match(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+$/)) {
            return 'E-Mail 양식을 확인하세요';
        } else {
            return true;
        }
    }

    /**
     * 한글 + 공백 @ychan_20220906
     * @param value 
     * @returns 
     */
     validationKrSpace = (value) => {
        if (!value.match(/^[가-힣 ]+$/)) {
            return '한글만 입력하세요';
        } else {
            return true;
        }
    }

    // validationJuminFmt = (value) => {
    //     var jumin1 = value.juminNo1
    //     var jumin2 = value.juminNo2;
    //     var yy = jumin1.substr(0, 2); // 년도
    //     var mm = jumin1.substr(2, 2); // 월
    //     var dd = jumin1.substr(4, 2); // 일
    //     var gender = jumin2.substr(0, 1); // 성별
    //     var msg, ss, cc;

    //     if (yy < "00" || yy > "99" || mm < "01" || mm > "12" || dd < "01" || dd > "31") {
    //         Ext.toast("주민등록번호 앞자리를 다시 입력하세요.");
    //         return false;
    //     }
    //     if (gender < "1" || gender > "4") {
    //         Ext.toast("주민등록번호 뒷자리를 다시 입력하세요.");
    //         return false;
    //     }

    //     if (!value.match(/^(\d|-)?(\d|,)*\.?\d*$/)) {
    //         Ext.toast('숫자만 입력하세요');
    //         return '숫자만 입력하세요!!';
    //     } else {
    //         return true;
    //     }

    // }
    //

    /**
     * 
     * @param value 
     * @returns 
     * @yhj_@20220623 주민번호 앞자리 체크
     *  \d{3}: 1-2번째(년도) 숫자 0-9
        [0-1]: 3번째(월도 앞자리) 0,1
        \d{1}: 4번째(월도 뒷자리) 숫자 0-9
        [0-3]: 5번째(일자 앞자리) 0,1,2,3
        \d{1}: 6번째(일자 뒷자리) 숫자 0-9
        /^\d{2}0[1-9]|1[0-2][0-3]\d{1}/
            /^\d{2}[0-1]\d{1}[0-3]\d{1}/
     */
    validationFirstJumin = (value) =>{
       
        if (!value.match(/^[0-9]*$/)) {
            return '숫자만 입력하세요!!';
        }

        if(value.length != 6)
            return ' ';

        let yy = value.substr(0,2);
        let mm = value.substr(2,2); 
        let dd = value.substr(4,2);

        if((mm < 1 || mm > 12) || (dd < 1 || dd > 31))
            return '주민번호 이상';

        return true;
    }
    /**
     * 
     * @param value 
     * @returns 
     * @yhj_@20220623 주민번호 뒷자리 체크
     * [1-8]: 첫번째(성별) 90년대생 1,2 2000년대생 3,4 
     * 외국인 90년대생 : 5,7 , 외국인 2000년대생 6,8
     * \d{6}: 2-7번째(뒷자리 6자리) 숫자 0-9
     */
    validationEndJumin = (value) => {
        if (!value.match(/^[0-9]*$/)) {
            return '주민번호 뒷자리를 확인하세요.';
        } else {
            return true;
        }
    }

    // validationPw = (value) => {
    //     if (!value.match(/^(?=.*[a-zA-Z])(?=.*[0-9]).{8,20}$/)) {
    //         return '8~20자 영문 대 소문자, 숫자를 사용하세요.';
    //     } else {
    //         return true;
    //     }
    // }
    
    //@yhj20230926 공단 요청으로 인해 특수문자 포함 10자리로 변경
    validationPw = (value) => {
        if (!value.match(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{10,20}$/)) {
            return '10~20자 특수문자 하나 이상 포함 ,영문 대 소문자, 숫자를 사용하세요.';
        } else {
            return true;
        }
    }
}