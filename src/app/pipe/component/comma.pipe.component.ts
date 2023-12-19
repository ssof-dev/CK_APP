import{ Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'comma'
})
export class CommaPipeComponent implements PipeTransform{

    //@ychan_20230323 입력시 콤마 생성으로 max length 초과하는 문제 해결
    // transform(givenNumber: any) {

    //     //천단위 콤마
    //     let internationalNumberFormat = new Intl.NumberFormat('ko-KR');
    //     if( isNaN(givenNumber) ){
    //         return null;
    //     }else{
    //         return internationalNumberFormat.format(givenNumber); 
    //     }
    // }

    transform(givenNumber: any, disable?: boolean) {

        // 객체의 disable 값을 받아와서 활성화 상태이면 콤마를 적용안함.
        if(disable === false)
            return givenNumber;

        //천단위 콤마
        let internationalNumberFormat = new Intl.NumberFormat('ko-KR');
        if( isNaN(givenNumber) ){
            return null;
        }else{
            return internationalNumberFormat.format(givenNumber); 
        }
    }
}