import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EnvService } from '../../shared/env.service';
declare var $: JQuery | any;

@Component({
    selector: 'widget-full-calendar',
    templateUrl: './full.calendar.component.html'
})
export class FullCalendarComponent implements OnInit {

    public isCreateCalendar: boolean = false;

    constructor( public envService: EnvService ) {}
    ngOnInit(){}
    ngOnChanges(){
        if( this.eventModel !==  undefined) this.createFullCalendar();

    }

    public calendar : any;
    createFullCalendar(){

        //재호출시에 초기값으로 돌려놓음
        if( this.calendar !== undefined ){
            this.changeView();
            $('#calendar').fullCalendar('today');
        } 

        this.calendar = $('#calendar');
        if( this.isCreateCalendar ){
            this.calendar.fullCalendar('removeEvents');  //기존 이벤트 지우고
            this.calendar.fullCalendar('addEventSource',this.eventModel);    //다시 추가하고
        }else{
            this.isCreateCalendar = true;
            let that = this;
            this.calendar.fullCalendar({
                // locale: localStorage.getItem('lang'),
                plugins: [ 'dayGrid' ],
                height: 750,
                locale: 'ko',
                customButtons: {
                    customReSet: {
                        text: '달력',
                        click: function() {
                            that.changeView();
                        }
                    },
                    customPrevYear: {
                        icon: 'left-double-arrow', 
                        click: function() {
                            $('#calendar').fullCalendar('prevYear');
                            that.emitChangeDate( $('#calendar').fullCalendar('getDate') );
                        }
                    },
                    customPrev: {
                        icon: 'left-single-arrow', 
                        click: function() {
                            $('#calendar').fullCalendar('prev');
                            that.emitChangeDate( $('#calendar').fullCalendar('getDate') );
                        }
                    },
                    customToday: {
                        text: '오늘',
                        click: function() {
                            $('#calendar').fullCalendar('today');
                            that.emitChangeDate( $('#calendar').fullCalendar('getDate') );
                        }
                    },
                    customNext: {
                        icon: 'right-single-arrow', 
                        click: function() {
                            $('#calendar').fullCalendar('next');
                            that.emitChangeDate( $('#calendar').fullCalendar('getDate') );
                        }
                    },
                    customNextYear: {
                        icon: 'right-double-arrow', 
                        click: function() {
                            $('#calendar').fullCalendar('nextYear');
                            that.emitChangeDate( $('#calendar').fullCalendar('getDate') );
                        }
                    },
                },
                header: {
                    left: 'dayGridMonth',
                    center: 'title',
                    right: 'customReSet, customPrevYear,customPrev, customToday customNext,customNextYear'
                },
                navLinks: true, // can click day/week names to navigate views
                weekNumbers: true, // Determines if week numbers should be displayed on the calendar.
                weekNumbersWithinDays: true,
                eventColor: 'rgba(75, 192, 192, 0.2)',
                eventTextColor: 'black',
                //   eventBorderColor: 'red',
                //   eventBackgroundColor: '#f1c40f',
                editable: false,
                events: that.eventModel, // areas where "Meeting" must be dropped
                eventClick: this.calendarEventClick.bind(this),
                // dayClick: this.calendarDayClick.bind(this),
                selectable: true,
                selectHelper: true,
            });
        }
        
    }

    // fullCalendar
    public calendarEventClick(calEvent: any, jsEvent: any, view: any) {
        this.itemClick.emit(calEvent);
    }

    @Input() public eventModel : any;
    @Output() public itemClick = new EventEmitter();
    @Output() public changeDate = new EventEmitter();
    
    emitEvent(item: any){
        this.itemClick.emit(item);
    }

    //날짜 변경 이벤트
    emitChangeDate(date){
        this.changeDate.emit(date.format());
    }

    //월별 보기
    changeView(){
        this.calendar.fullCalendar('changeView','month');
    }

}