import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Observable, from, switchMap, finalize, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderInterceptorService implements HttpInterceptor {
  // constructor(private loadingController: LoadingController) {}
  // intercept(
  //   req: HttpRequest<any>,
  //   next: HttpHandler
  // ): Observable<HttpEvent<any>> {
  //   return from(
  //     this.loadingController.getTop().then((hasLoader) => {
  //       if (!hasLoader) {
  //         return this.loadingController
  //           .create({
  //             spinner: 'circular',
  //             translucent: true,
  //           })
  //           .then((loading) => loading.present());
  //       } else {
  //         return Promise.resolve();
  //       }
  //     })
  //   ).pipe(
  //     switchMap(() => next.handle(req)),
  //     finalize(() => {
  //       this.loadingController.getTop().then((hasLoader) => {
  //         if (hasLoader) {
  //           this.loadingController.dismiss();
  //         }
  //       });
  //     })
  //   );
  // }
  private activeRequests: number = 0;
  isLoading: any;

  constructor(public loadingController: LoadingController) {}

 async showLoader() {
    if (!this.isLoading) {
      this.isLoading = true;
      return await this.loadingController.create({
        spinner: 'circular',
        translucent: true,
        cssClass: 'ion-loader-custom-class',
      }).then(loader => {
        loader.present().then(() => {
          if (!this.isLoading) {
            loader.dismiss();
          }
        });
      });
    }
  }

  async hideLoader() {
    this.isLoading = false;
    return await this.loadingController.getTop().then(loader => {
      if (loader) {
        loader.dismiss();
      }
    });
  }


  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log("---------active request ------------");
    console.log(req);
    console.log(this.activeRequests);

    if (this.activeRequests === 0) {
      from(this.showLoader()).subscribe();
    }
    this.activeRequests++;

    return next.handle(req).pipe(
      catchError((error:any) => {
        console.error("HTTP Request Error:", error);
        return throwError(error);
      }),
      finalize(() => {
        this.activeRequests--;
        if (this.activeRequests === 0) {
          from(this.hideLoader()).subscribe();
        }
      })
    );
  }
}
