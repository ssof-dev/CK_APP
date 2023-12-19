import { Component, ViewEncapsulation, OnInit, Input } from '@angular/core';
import { EnvService } from '../../shared/env.service';
import { ComFunction } from '../../shared/com.function';
import { stringify } from 'querystring';

@Component({
    selector: 'widget-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: [
        './calendar.css'
    ],
    encapsulation: ViewEncapsulation.None,
})
export class CalendarComponent implements OnInit {

    @Input() public calendarModel: any;

    //달력 년월 
	public year: number;
	public month: number;

	//년월 증감 감소
	public addYear: number = 0;
    public addMonth: number = 0;
    
    public days: any;
    public arrayDay: any;
    
    constructor( public envService: EnvService, public comFun: ComFunction ) {
        
    }
    
    ngOnInit(){}
    ngOnChanges(){
        this.year = this.comFun.getYear(this.addYear);
        this.month = this.comFun.getMonth(this.addMonth);
        
        this.getDayCount(this.year, this.month);
    }

    public getArrayNum(val: number){
        return new Array(val).fill(0).map((x,i)=>i);
    }

    //달력 만들기
    public getDayCount(year, month){
        let count = new Date(year, month, 0).getDate();
        this.days = new Array();
        for(let i: number = 0; i <= count -1; i++){
            let num = i+1;
            this.days.push({
                day : num
            ,   week: new Date(`${year}-${month}-${num}`).getDay()  /* 요일 0:일요일, 1:월요일... */
            });
        }
        this.arrayDay = this.days;
    }

    //달력(일) 클래스 스타일 정의
    public dayClass(item: any){

        let classNm: string;

        if( item.week == 0 ){
            classNm = 'line-r line-l sun';
        }else if( item.week == 6){
            classNm = 'line-r sat';
        }else{
            classNm = 'line-r';
        }

        //1일은 왼쪽 라인선 추가
        classNm = item.day == 1 ? `${classNm} line-l` : classNm;

        return classNm;
    }
    
}