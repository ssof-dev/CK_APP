import { Component, OnInit, Input, AfterViewInit, OnChanges, ViewChild, ViewContainerRef, ComponentFactoryResolver, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { TabzItem } from './tabz-item';

import { ModalLoaderWeb } from '../web/modal-loader.web';

@Component({
    selector: 'app-index-modal',
    template: `<ng-template #container></ng-template>`,
	providers: [ModalLoaderWeb],
})
export class IndexModalComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {

    @Input() public node: any;
    @ViewChild('container', {read: ViewContainerRef}) viewContainerRef: ViewContainerRef;

    public modalList = [];
    
    constructor(private router: Router, 
                private ar: ActivatedRoute,
                private _componentFactoryResolver: ComponentFactoryResolver,
                public modalLoaderWeb: ModalLoaderWeb) { 

        this.modalList = this.modalList.concat(this.modalLoaderWeb.GetModalList());
    }

    ngOnInit() {}

    ngOnDestroy() {}

    ngOnChanges(){

        if( this.node != undefined ){
            const modalItem = this.getModalItem(this.node);
            // console.log(modalItem);
            const componentFactory = this._componentFactoryResolver.resolveComponentFactory(modalItem.component);
            this.viewContainerRef.clear();
            const componentRef = this.viewContainerRef.createComponent(componentFactory);
            componentRef.instance.route = this.node;
        }

        
    }

    ngAfterViewInit() {
        
    }

    getModalItem(node) { 
        let obj = this.modalList.find( item => item.id == node.id );
        // console.log(obj);
        return new TabzItem(obj.component, {node: node});
    }
}
