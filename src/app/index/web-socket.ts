import * as Stomp from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';

export class WebSocket {

    private serverUrl : string;
    private empNo : string
    private stompClient  = null;
    private msgCallBack : Function;

    constructor(url: string, empNo: string, fun: Function) {
        this.serverUrl = url;
        this.empNo = empNo;
        this.msgCallBack = fun;
    }

    _connect() {
        const ws = new SockJS(`${this.serverUrl}/ws-endpoint`); 
        this.stompClient = Stomp.Stomp.over(ws);
        const _this = this;
        _this.stompClient.connect({}, function (frame) {
            //전체구독
            _this.stompClient.subscribe(`/topic/toast/${_this.empNo}`, function (event) {
                _this.onMessageReceived(event);
            });
            //개인구독
            // _this.stompClient.subscribe(`/user/queue/00000`, function (event) {
            //     console.log('특정함');
            //     _this.onMessageReceived(event);
            // });
        }, this.errorCallBack); 
    };

    _disconnect(callback? : Function) {
        if (this.stompClient !== null) {
            this.stompClient.disconnect();
            if( callback !== undefined ) callback();
        }
    }

    errorCallBack(error) {
        setTimeout(() => {
            this._connect();
        }, 5000);
    }

    _sendAll(param) {
        this.stompClient.send('/app/all', {}, JSON.stringify(param));
    }

    _sendUser(param) {
        this.stompClient.send('/app/user', {}, JSON.stringify(param));
    }

    onMessageReceived(event) {
        this.msgCallBack(JSON.stringify(event.body));
    }
}