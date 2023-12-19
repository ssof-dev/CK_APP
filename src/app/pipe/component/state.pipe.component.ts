import{ Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'state'
})
export class statePipecomponent implements PipeTransform{

    transform(state: any) {
        //상태표시
        if (state === '0') {
            return '갱신필요'
        } else if (state === '1') {
            return '갱신완료';
        } else {
            return '';
        }
    }
}