import Swal, { SweetAlertIcon, SweetAlertInput, SweetAlertPosition } from 'sweetalert2';

export class ComAlert{

    /**
     * Alert Message
     * @param icon 'success' | 'error' | 'warning' | 'info' | 'question'
     * @param title
     * @param message 
     * @param isCancelBtn
     * @param btnCallBack 
     */
    showAlert(icon: any, title: string, message: string, isCancelBtn: boolean, btnCallBack?: Function){

        let _icon: SweetAlertIcon = icon;

        Swal.fire({
            title: title,
            html: message,
            icon: _icon,
            showCancelButton: isCancelBtn,
            confirmButtonText: '확인',
            cancelButtonText: '닫기',
            allowOutsideClick: false,
        }).then((result: any) => {
            //콜백 함수 호출
            if (result.value) {
                if( btnCallBack !== undefined ) {
                    btnCallBack.call(this, true);
                }
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                if( btnCallBack !== undefined ) {
                    btnCallBack.call(this, false);
                }
            }
        });
    }

    /**
     * 특정값을 입력받는 Alert
     * @param title 
     * @param input 
     * @param label 
     * @param placeholder | 'text' | 'email' | 'password' | 'number' | 'tel' | 'textarea'
     * @param callBack 
     */
    showInputAlert(title: string, input: any, label: string, placeholder: string, callBack: Function){

        let _input: SweetAlertInput = input;

        Swal.fire({
            title: title,
            input: _input,
            inputLabel: label,
            inputPlaceholder: placeholder,
            confirmButtonText: '확인',
            cancelButtonText: '닫기',
            showCancelButton: true,
            allowOutsideClick: false,
        }).then((result: any) => {
            callBack.call(this, false);
        });
    }

    /**
     * 특정값을 입력받아 API 통신까지 하는 Alert
     * @param title 
     * @param serverApiUrl 
     * @param callBack 
     */
    showApiAlert(title: string, serverApiUrl: string, callBack: Function){
        Swal.fire({
            title: title,
            input: 'text',
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: '확인',
            showLoaderOnConfirm: true,
            allowOutsideClick: false,
            preConfirm: (param: any) => {
                return fetch(serverApiUrl)
                .then(response => {
                    if (!response.ok) {
                    throw new Error(response.statusText)
                    }
                    return response.json()
                })
                .catch(error => {
                    Swal.showValidationMessage(
                    `Request failed: ${error}`
                    )
                });
            },
        }).then((result: any) => {
            if (result.isConfirmed) {
                callBack.call(this, result);
            }
        })
    }

    /**
     * toast Message
     * @param icon 'success' | 'error' | 'warning' | 'info' | 'question'
     * @param title
     * @param position "top" | "top-start" | "top-end" | "top-left" | "top-right" | "center" | "center-start" | "center-end" | "center-left" | "center-right" | "bottom" | "bottom-start" | "bottom-end" | "bottom-left" | "bottom-right"
     */
    showToast(icon: any, title: string, position: any){
            
        let _icon: SweetAlertIcon = icon;
        let _position: SweetAlertPosition = position;

        Swal.fire({
            toast: true,
            position: _position,
            icon: _icon,
            title: title,
            iconColor: 'white',
            customClass: {
                popup: 'colored-toast'
            },
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true
        });
    }
}