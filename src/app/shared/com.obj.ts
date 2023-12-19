import { Injectable } from "@angular/core";

@Injectable()
export class ObjTextField {
    label           :   string;   // 오브젝트 명
    value           :   string;   // 값
    disable         :   boolean;  // 활성화여부 비활성화:true 활성화:false
    required        :   boolean;  // 필수입력값

    maxLength       :   number;   // 최대 입력글자수
    textAlign       :   string;   // Text 정렬
    placeholder     :   string;   // Info 메시지
    requiredMessage :   string;   // 필수입력값 메시지
    confirm         :   string;   // 유효성 검사
}

export class ObjDateField {
    label           :   string;
    value           :   string;
    disable         :   boolean;
    required        :   boolean;

    dateFormat      :   string;
    clearable       :   boolean;
    requiredMessage :   string;
    confirm         :   string;
}

export class ObjComboBox {
    label           :   string;
    value           :   string;
    disable         :   boolean;
    required        :   boolean;

    store           :   any;
    placeholder     :   string;
    editable        :   boolean;
    valueField      :   string;
    displayField    :   string;
    queryMode       :   string;
    clearable       :   boolean;
    textAlign       :   string;
    forceSelection  :   boolean;
    requiredMessage :   string;
    confirm         :   string;
    focus           :   boolean;
}

export class ObjNumberField {
    label           :   string;
    value           :   string;
    disable         :   boolean;
    required        :   boolean;

    maxLength       :   number;
    textAlign       :   string;
    placeholder     :   string;
    requiredMessage :   string;
    confirm         :   string;
}

export class ObjIconButton {
    iconCls         :   string;
}

export class ComObj{
    public SetTextField(
            label:string, value:string, disable:boolean, required:boolean, maxLength:number, 
            textAlign:string, placeholder:string, requiredMessage:string)
    {
        let sRet = new ObjTextField();

        sRet.label = label;
        sRet.value = value;
        sRet.disable = disable;
        sRet.required = required;

        sRet.maxLength = maxLength;
        sRet.textAlign = textAlign;
        sRet.placeholder = placeholder;
        sRet.requiredMessage = requiredMessage;

        return sRet;
    }

    public SetDateField(label:string, value:string, disable:boolean, required:boolean, dateFormat:string, clearable:boolean, requiredMessage:string)
    {
        let sRet = new ObjDateField();

        sRet.label = label;
        sRet.value = value;
        sRet.disable = disable;
        sRet.required = required;

        sRet.dateFormat = dateFormat;
        sRet.clearable = clearable;
        sRet.requiredMessage = requiredMessage;
        return sRet;
    }

    public SetComboBox(
        label:string, value:string, disable:boolean, required:boolean, store:any,
        placeholder:string, editable:boolean, valueField:string, displayField:string, queryMode:string, 
        clearable:boolean, textAlign:string, forceSelection:boolean, requiredMessage:string)
    {
        let sRet = new ObjComboBox();

        sRet.store = store;

        sRet.label = label;
        sRet.value = value;
        sRet.disable = disable;
        sRet.required = required;

        sRet.placeholder = placeholder;
        sRet.editable = editable;
        sRet.valueField = valueField;
        sRet.displayField = displayField;
        sRet.queryMode = queryMode;
        sRet.clearable = clearable;
        sRet.textAlign = textAlign;
        sRet.forceSelection = forceSelection;
        sRet.requiredMessage = requiredMessage;

        return sRet;
    }

    public SetNumberField(label:string, value:string, disable:boolean, required:boolean, maxLength:number, textAlign:string, placeholder:string, requiredMessage: string)
    {
        let sRet = new ObjNumberField();

        sRet.label = label;
        sRet.value = value;        
        sRet.disable = disable;
        sRet.required = required;

        sRet.textAlign = textAlign;
        sRet.placeholder = placeholder;
        sRet.requiredMessage = requiredMessage;
        return sRet;
    }

    public SetIconButton(iconCls: string)
    {
        let sRet = new ObjIconButton();

        sRet.iconCls = iconCls;
        return sRet;
    }
}