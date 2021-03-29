import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";

export class AuthInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log("Request is on the way");
    console.log(req.url);

    const modifiedRequest = req.clone({
      headers: req.headers.append("Auth", "xyzs"),
    });

    // after "handle" to manipulate http response data
    return next.handle(modifiedRequest);
  }
}
