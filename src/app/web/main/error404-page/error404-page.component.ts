declare var Ext: any;
import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'app-error404-page',
	templateUrl: './error404-page.component.html',
	styleUrls: [
        './error404-page.component.scss'
    ],
	providers: [],
})
export class Error404PageComponent implements OnInit {
	@Input() public route: any;

	constructor() {
	}
	
	ngOnInit() {
	}
}
