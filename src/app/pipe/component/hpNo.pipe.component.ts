import{ Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'hpNo'
})
export class hpNoPipecomponent implements PipeTransform{

    transform(hpNo: any) {
        //전화번호, 핸드폰번호 000-0000-0000 형식 표시
        if( hpNo !== undefined && hpNo.length == 11 ){
            return hpNo.replace( /(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/, "$1-$2-$3");
        }else{
            return hpNo;
        }
    }
}