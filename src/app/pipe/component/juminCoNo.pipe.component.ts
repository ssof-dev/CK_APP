import{ Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'juminCoNo'
})
export class juminCoNoPipecomponent implements PipeTransform{

    /**
     * @param juminCoNo 주민번호 조건에 맞을시 000000-******* 표시
     * 아니라면 사업자번호 000-00-***** 표시
     * @returns 
     */
    transform(juminNo: any) {
        //주민번호 000000-******* 표시
        //사업자번호 000-00-***** 표시
        if( juminNo !== undefined && juminNo.length == 13 ){
            let repxJumin = /(\d{6})(\d{1})(\d{6})/;
            return  juminNo.replace(repxJumin, '$1-$2******');
        }else{
            let repxCoNo = /(\d{3})(\d{2})(\d{5})/;
            return juminNo.replace(repxCoNo, '$1-$2-*****');
        }
    }
}