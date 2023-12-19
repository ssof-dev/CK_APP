import{ Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'bizNo'
})
export class bizNoPipecomponent implements PipeTransform{

    /**
     * @param bizNo 사업자번호
     * @param type  기본 : 000-00-00000 표시, 1: 000-00-***** 표시
     * @returns 
     */
    transform(bizNo: any, type?: string) {
        if( bizNo !== undefined && bizNo.length == 10 ){
            let repx = /(\d{3})(\d{2})(\d{5})/;
            return type === undefined ? bizNo.replace(repx, '$1-$2-$3') : bizNo.replace(repx, '$1-$2-*****');
        }else{
            return bizNo;
        }
    }
}