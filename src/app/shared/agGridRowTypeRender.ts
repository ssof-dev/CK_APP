import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
    selector: 'rowType-cell',
    template: `
    <button type="button" title="실행취소" class="btn btn-sm" [style]="this.display" (click)="click()" (mouseover)="mous('add')" (mouseout)="mous('out')">
        <i [ngClass]="this.iconStyle"></i>
    </button>
    <!-- <span class="rowType-cell" style="width:100%">
        <i [ngClass]="this.iconStyle"></i>
        <i class="undo dx-icon dx-icon-revert" style="display: none"></i>
    <span> -->
    `,
    styles:[
        `
            .cell-update{
                color: #5cb85c;
            }

            .cell-insert{
                color: #337ab7;
            }

            .cell-delete{
                color: #d43f3a;
            }
        `
    ]
})
export class AgGridRowTypeRender implements ICellRendererAngularComp {
    public iconStyle: string = "";
    private _param!: any;
    public display: string = "display: none;";

    isEmpty(val:any): boolean{
        if( val === undefined || val === null || val === '' ){
            return true;
        }else{
            return false;
        }
    }

    mous = (e:any) =>{
        if( !this.isEmpty(this.iconStyle) ){
            if( e == 'add' ){
                this.iconStyle = 'dx-icon dx-icon-revert';
            }else{
                this.setRowType(this._param);
            }
        }
    }

    click = () =>{
        if( this._param.value == 'insert' ){
            //신규 추가 취소
            this._param.agGridConfig.remove(this._param.data);
        }else if ( this._param.value == 'update' || this._param.value == 'delete' ){
            /**
             * 수정 및 삭제취소
             */
            this._param.agGridConfig.undo(this._param);
        }
    }

    agInit(params: ICellRendererParams): void {
        this.setRowType(params);
        this._param = params;
    }

    refresh(params: ICellRendererParams): boolean {
        this.setRowType(params);
        this._param = params;
        return true;
    }

    private setRowType(params: ICellRendererParams) {

        let rowType = params.value;

        if( !this.isEmpty(rowType) ){
            this.display = "display: inline;";
            if (rowType === 'update') {
                this.iconStyle = 'cell-update dx-icon dx-icon-clearformat';
            } else if (rowType === 'insert') {
                this.iconStyle = 'cell-insert dx-icon dx-icon-add';
            } else if (rowType === 'delete') {
                this.iconStyle = 'cell-delete dx-icon dx-icon-trash';
            }
        }else{
            this.display = "display: none;";
            this.iconStyle = "";
        }

    }
}