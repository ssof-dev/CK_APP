import { Injectable } from '@angular/core';

/**
 * validation function
 */
@Injectable()
export class ComConst {
   // private _BTN_MODE_INIT           = 'INIT';
   // private _BTN_MODE_SEARCH         = 'SEARCH';
   // private _BTN_MODE_SAVE           = 'SAVE';
   // private _BTN_MODE_MODIFY         = 'MODIFY';
   // private _BTN_MODE_MODIFY_MULTI   = 'MODIFY_MULTI';
   // private _BTN_MODE_DELETE         = 'DELETE';
   // private _BTN_MODE_NEW            = 'NEW';
   // private _BTN_MODE_EXCEL_IMPORT   = 'EXCEL_IMPORT';
   // private _BTN_MODE_EXCEL_EXPORT   = 'EXCEL_EXPORT';
   // private _BTN_MODE_CANCEL         = 'CANCEL';
   // private _BTN_MODE_POPUP          = 'POPUP';      // @ychan_20220214 팝업 모드 추가

   // get BTN_MODE_INIT()              { return this._BTN_MODE_INIT; }
   // get BTN_MODE_SEARCH()            { return this._BTN_MODE_SEARCH; }
   // get BTN_MODE_SAVE()              { return this._BTN_MODE_SAVE; }
   // get BTN_MODE_MODIFY()            { return this._BTN_MODE_MODIFY; }
   // get BTN_MODE_MODIFY_MULTI()      { return this._BTN_MODE_MODIFY_MULTI; }
   // get BTN_MODE_DELETE()            { return this._BTN_MODE_DELETE; }
   // get BTN_MODE_NEW()               { return this._BTN_MODE_NEW; }
   // get BTN_MODE_EXCEL_IMPORT()      { return this._BTN_MODE_EXCEL_IMPORT; }
   // get BTN_MODE_EXCEL_EXPORT()      { return this._BTN_MODE_EXCEL_EXPORT; }
   // get BTN_MODE_CANCEL()            { return this._BTN_MODE_CANCEL; }
   // get BTN_MODE_POPUP()            { return this._BTN_MODE_POPUP; }

   // private _TYPE_NOTICE   = '1';
   // private _TYPE_FILE_DATA   = '2';

   // get TYPE_NOTICE()              { return this._TYPE_NOTICE; }
   // get TYPE_FILE_DATA()              { return this._TYPE_FILE_DATA; }

   public BTN_MODE_INIT           = 'INIT';
   public BTN_MODE_SEARCH         = 'SEARCH';
   public BTN_MODE_SAVE           = 'SAVE';
   public BTN_MODE_MODIFY         = 'MODIFY';
   public BTN_MODE_MODIFY_MULTI   = 'MODIFY_MULTI';
   public BTN_MODE_DELETE         = 'DELETE';
   public BTN_MODE_NEW            = 'NEW';
   public BTN_MODE_EXCEL_IMPORT   = 'EXCEL_IMPORT';
   public BTN_MODE_EXCEL_EXPORT   = 'EXCEL_EXPORT';
   public BTN_MODE_CANCEL         = 'CANCEL';
   public BTN_MODE_POPUP          = 'POPUP';      // @ychan_20220214 팝업 모드 추가

   public TYPE_NOTICE   = '1';
   public TYPE_FILE_DATA   = '2';

   // Clear 모드 선언
   public CLEAR_MODE_SEARCH   = 'S';
   public CLEAR_MODE_FORM  = 'F';
   public CLEAR_MODE_GRID  = 'G';
   public CLEAR_MODE_ALL   = 'A';

   // Required 메시지
   public REQUIRED_MSG_DEFAULT = '필수값입니다.';

   public CONST_RIGHT = 'right';
   public CONST_LEFT = 'left';
}