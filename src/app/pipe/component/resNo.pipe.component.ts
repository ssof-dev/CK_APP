import{ Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'resNo'
})
export class resNoPipecomponent implements PipeTransform{

    /**
     * @param resNo 주민번호
     * @param type  기본: 000000-0000000 표시, 1: 000000-******* 표시
     * @returns 
     */
    transform(resNo: any, type?: string) {
        //주민번호 000000-0000000 표시
        if( resNo !== undefined && resNo.length == 13 ){
            let repx = /(\d{6})(\d{1})(\d{6})/;
            return type === undefined ? resNo.replace(repx, '$1-$2$3') : resNo.replace(repx, '$1-$2******');
        }else{
            return resNo;
        }
    }
}