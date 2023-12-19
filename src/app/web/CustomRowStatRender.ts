import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
    selector: 'rowStat-cell',
    template: `
    <span>
        <i [ngClass]="this.fontStyle"></i>
    <span>
    `,
})
export class CustomRowStatRender implements ICellRendererAngularComp {
    public fontStyle = null;

    agInit(params: any): void {
        this.setRowStat(params);
    }

    refresh(params: any): boolean {
        this.setRowStat(params);
        return true;
    }

    private setRowStat(params) {
        if (params.value === 'U') {
            this.fontStyle = 'fas fa-eraser';
        } else if (params.value === 'C') {
            this.fontStyle = 'fas fa-plus';
        } else if (params.value === 'D') {
            this.fontStyle = 'fas fa-minus';
        } else {
            this.fontStyle = params.value;
        }
    }
}