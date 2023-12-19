import { Component, OnInit, Input, AfterViewInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EnvService } from '../shared/env.service';

import { TabzItem } from './tabz-item';

// Deshboard : Module, Component
import { DeshboardModule } from '../web/main/dashboard/deshboard.module';
import { DashboardComponent } from '../web/main/dashboard/dashboard.component';

@Component({
    selector: 'app-index-dashboard',
    template: `<ng-template #container></ng-template>`
})
export class IndexDashboardComponent implements OnInit, OnDestroy, AfterViewInit {

    @Input() public node: any;
    @ViewChild('container', {read: ViewContainerRef}) viewContainerRef: ViewContainerRef;

    constructor(private router: Router, 
                private ar: ActivatedRoute,
                private _componentFactoryResolver: ComponentFactoryResolver,
                private envService: EnvService ) { 
    }

    ngOnInit() {
    }

    ngOnDestroy() {}

    ngAfterViewInit() {
        setTimeout(()=>{
            const dashboardItem = this.getDashboardItem(this.node);
            const componentFactory = this._componentFactoryResolver.resolveComponentFactory(dashboardItem.component);
            this.viewContainerRef.clear();
            const componentRef = this.viewContainerRef.createComponent(componentFactory);

            componentRef.instance.route = this.node;
            // node값을 Component에 주입한다. 사용 방법은 @Input()을 선언한다.
            // @Input() public route: any;
        },0)
    }

    getDashboardItem(node) {
        // console.log('%c route name => ', 'background: #222; color: yellow', route);
        
        return new TabzItem(DashboardComponent, {node: node});

        // return new TabzItem(DashboardMobileComponent, {node: node});
    }
}