import { Component, OnInit, Input, AfterViewInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { TabzItem } from './tabz-item';

// Blank Page : Module, Component
import { Error404PageModule } from '../web/main/error404-page/error404-page.module';
import { Error404PageComponent } from '../web/main/error404-page/error404-page.component';

import { TabzLoaderWeb } from '../web/tabz-loader.web';

@Component({
    selector: 'app-index-tabz',
    template: `<ng-template #container></ng-template>`,
	providers: [TabzLoaderWeb],
})
export class IndexTabzComponent implements OnInit, OnDestroy, AfterViewInit {

    @Input() public node: any;
    @ViewChild('container', {read: ViewContainerRef}) viewContainerRef: ViewContainerRef;

    public tabzList = [];
    
    constructor(private router: Router, 
                private ar: ActivatedRoute,
                private _componentFactoryResolver: ComponentFactoryResolver,
                public tabzLoaderWeb: TabzLoaderWeb) { 

        this.tabzList = this.tabzList.concat(this.tabzLoaderWeb.GetTabzList());
    }

    ngOnInit() {        
    }

    ngOnDestroy() {
    }

    ngAfterViewInit() {
        const tabzItem = this.getTabzItem(this.node);
        const componentFactory = this._componentFactoryResolver.resolveComponentFactory(tabzItem.component);
        this.viewContainerRef.clear();
        const componentRef = this.viewContainerRef.createComponent(componentFactory);

        componentRef.instance.route = this.node;
        // node값을 Component에 주입한다. 사용 방법은 @Input()을 선언한다.
        // @Input() public route: any;
    }

    getTabzItem(node) { 
        for( let i in this.tabzList ){
            if (this.tabzList[i].id == node.id) {
                // console.log('%c route name => ', 'background: #222; color: yellow', route);
                return new TabzItem(this.tabzList[i].component, {node: node});
            }
        }

        // 지정된 메뉴가 없으면 404 표시
        return new TabzItem(Error404PageComponent, {node: node});
    }
}
