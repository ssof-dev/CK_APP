declare var Ext: any;
import { Injectable } from '@angular/core'; 
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http'; 
import { Observable, throwError } from 'rxjs'; 
import { catchError, map } from 'rxjs/operators';
import { EnvService } from './env.service';
import { ComFunction } from './com.function';

/**
 * 통신 오류 Interceptor
 * 통신 오류 로그를 공통으로 처리하거나 나중에 활용 할 수 있을거같아서 추가함
 */
@Injectable() 
export class HttpInterceptorService implements HttpInterceptor { 

    constructor(private comFun: ComFunction){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> { 
        let request: HttpRequest<any>;

        request = req.clone({
            setHeaders: {
            }
        });

        return next.handle(request).pipe( 
            map((res:any) => {
                //공통으로 복호화 처리
                let body: any = res.body;
                if( body !== undefined ){
                    if( body.encrypt !== undefined ){
                        res.body = this.comFun.decrypt(body.encrypt);
                    }
                }
                return res;
            }),
            catchError((res:any) => {
                //공통으로 복호화 처리
                let error: any = res.error;
                if( error !== undefined ){
                    if( error.encrypt !== undefined ){
                        res.error = this.comFun.decrypt(error.doFilter);
                    }
                }
                
                return throwError(() => res);
            })
        );
    }
}
