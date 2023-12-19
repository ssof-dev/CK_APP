import{ Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'frcCd'
})
export class frcCdPipecomponent implements PipeTransform{

    transform(ymd: any) {
        //yyyy-mm-dd 형식 표시
        if( ymd !== undefined && ymd.length == 11 ){
            return ymd.replace(/(\d{2})(\d{3})(\d{6})/g, '$1-$2-$3');
        }
        else{
            return ymd;
        }
    }
}
