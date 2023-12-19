import { Injectable } from '@angular/core';

// 2017년 7월 10일에 발표된 Angular v.4.3.0 버전에 HttpClientModule이 추가되었습니다.
// Angular에는 원래 @angular/http 패키지로 제공하던 HttpModule이 있었지만, 
// HttpClientModule은 좀 더 편한 방식으로 HTTP 요청을 보낼 수 있습니다.
// HTTP 요청에 인터셉터를 적용할 수도 있다.
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ComFunction } from '../shared/com.function';

export class imgResponse{
    imageUrl: string;
}

export interface UploadResponse {
    imageUrl: string;
}
//@yhj20230731 index.html 개발자도구 URL 노출로 경로 변경하여 선언
export class serverUrl {
    // <input type="hidden" name="serverUrl" value="http://localhost:8080"/> 
    // <input type="hidden" name="serverUrl_In" value="https://ongift.sbiz.or.kr"/> 
    // <input type="hidden" name="serverUrl_Out" value="https://ongift.or.kr"/> 
    // <input type="hidden" name="serverUrl_DevSvr" value="http://192.168.220.153:8080"/>
    
    serverUrl        : string = "http://localhost:8090";         //개발PC
    serverRealUrl    : string = "http://43.200.13.60:8090";     //운영
}

@Injectable()
export class ApiHttpService {
    private API_SERVER_URL : string = '';
    private sessionKey: string = '';
    
    //@ychan_20230131 UI 버전정보 저장
    private uiVersion: string = ''; // ui 버전정보

    public getServerUrls : serverUrl = new serverUrl();

    //@ychan_20230410 전문암호화
    constructor(private http: HttpClient, public comFun: ComFunction) { 
        let url : any;
        if (document.location.href.indexOf('localhost') > 0)
            url = this.getServerUrls.serverUrl; // 개발PC
        else
            url = this.getServerUrls.serverRealUrl; // 운영서버

        // URL 셋팅
        this.API_SERVER_URL = url
        
        // Session Key 셋팅
        let getKey : any;
        getKey = document.getElementsByName('_s_key_');  
        this.sessionKey = getKey[0].value;

        //@ychan_20230131 UI 버전정보 저장
        let getKey2 : any;
        getKey2 = document.getElementsByName('_s_uiVer_');  
        this.uiVersion = getKey2[0].value; 
    }

    public getServerUrl(){
        return this.API_SERVER_URL;
    }

    //@ychan_20230131 UI 버전정보 저장
    public getUiVersion(){
        return this.uiVersion;
    }

    public getEcdKey(){
        let key = encodeURIComponent(this.sessionKey);
        // let key = encodeURIComponent('SZz8pNIQtSxuHST20C59awo48nrX4X0zXM+SpmAYrZv/04mWlBspMHJyU+6qksg5');
        //console.log(key);
        return key;
    }

    public httpGet(api, param) {
        return this.http.get(`${this.API_SERVER_URL}${api}`, param);
    }

    public httpPost(api, param) {
        // // @ychan_20230410
        // return this.http.post(`${this.API_SERVER_URL}${api}?_ryan=${this.getEcdKey()}`, param);

        let headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
        let encryptParam = this.comFun.encrypt(JSON.stringify(param));
        
        return this.http.post<any>(`${this.API_SERVER_URL}${api}`, encryptParam, {headers:headers}); 
    }

    public httpFileUpload(api, param, files){

        let formData: FormData = new FormData();
        //@ychan_20230410 암호화
		// for( const key in param ){
		// 	formData.append(key, param[key]);

		// }

        formData.append('form', this.comFun.encrypt(JSON.stringify(param)));

        for(let i = 0; i < files.length; i++){
            formData.append('files', files[i]);    
        }
        return this.http.post(`${this.API_SERVER_URL}${api}?_ryan=${this.getEcdKey()}`, formData, {
			headers:{
                enctype : 'multipart/form-data'
            },
		});
    }

    public httpArrFileUpload(api, param, files){

        let formData: FormData = new FormData();
        //@ychan_20230410 암호화
		//formData.append('arrForm', JSON.stringify(param));
        formData.append('arrForm', this.comFun.encrypt(JSON.stringify(param)));

        for(let i = 0; i < files.length; i++){
            formData.append('files', files[i]);    
        }
        return this.http.post(`${this.API_SERVER_URL}${api}?_ryan=${this.getEcdKey()}`, formData, {
			headers:{
                enctype : 'multipart/form-data'
            },
		});
    }

    public httpExcelUpload(api, param, excel){

        let formData: FormData = new FormData();
		for( const key in param ){
			formData.append(key, param[key]);
		}
        formData.append('excel', excel);

        return this.http.post(`${this.API_SERVER_URL}${api}?_ryan=${this.getEcdKey()}`, formData, {
			headers:{
                enctype : 'multipart/form-data'
            },
		});
    }

    public httpFileDownload(api, param): Observable<Blob>{
        return this.http.post(`${this.API_SERVER_URL}${api}?_ryan=${this.getEcdKey()}`, param, {
            headers:{
                sessionKey : this.sessionKey
            },
            responseType: 'blob'
        });
    }

    public uploadImage(api, param): Observable<HttpEvent<imgResponse>>{
        return this.http.post<imgResponse>(`${this.API_SERVER_URL}${api}?_ryan=${this.getEcdKey()}`, param, {
            headers:{
                enctype : 'multipart/form-data'
            },
            reportProgress: true,
            observe: 'events'
        });
    }

    public httpArrData(api, param){

        let formData: FormData = new FormData();

        //@ychan_20230410
		// formData.append('arrForm', JSON.stringify(param));

        // return this.http.post(`${this.API_SERVER_URL}${api}?_ryan=${this.getEcdKey()}`, formData, {
		// 	headers:{
        //         enctype : 'multipart/form-data'
        //     },
		// });

        let headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
        let encryptParam = this.comFun.encrypt(JSON.stringify(param));

        return this.http.post(`${this.API_SERVER_URL}${api}?_ryan=${this.getEcdKey()}`, encryptParam, {headers:headers});
    }

}