import{ Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'ymd'
})
export class ymdPipecomponent implements PipeTransform{

    transform(ymd: any) {
        //yyyy-mm-dd 형식 표시
        if( ymd !== undefined && ymd.length == 6 ){
            return ymd.replace(/(\d{4})(\d{2})/g, '$1-$2');
        }
        else if( ymd !== undefined && ymd.length == 8 ){
            return ymd.replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3');
        }
        else if(ymd !== undefined && ymd.length == 14){
            return ymd.replace(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/g, '$1-$2-$3 $4:$5:$6');
        }
        else{
            return ymd;
        }
    }
}