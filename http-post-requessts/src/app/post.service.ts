import {
  HttpClient,
  HttpEventType,
  HttpHeaders,
  HttpParams,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject, throwError } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";

import { Post } from "./post.model";

@Injectable({ providedIn: "root" })
export class PostService {
  constructor(private http: HttpClient) {}

  errorMsg = new Subject<string>();

  createAndStorePost(title: string, content: string) {
    const postData: Post = { title: title, content: content };

    // Send Http request
    // request only sent when it is subscribed
    this.http
      .post<{ name: string }>(
        "https://ng-guide-bc7ef-default-rtdb.firebaseio.com/posts.json",
        postData,
        {
          // receive the whole response data (including header body status etc.) otherwise, only body response
          observe: "response",
        }
      )
      .subscribe(
        (responseData) => {
          console.log(responseData);
        },
        (error) => {
          this.errorMsg.next(error.message);
        }
      );
  }

  fetchPosts() {
    // attach multiple params
    let searchParams = new HttpParams();
    searchParams = searchParams.append("print", "pretty");
    searchParams = searchParams.append("custom", "key");

    return (
      this.http
        // indicate response body type
        .get<{ [key: string]: Post }>(
          "https://ng-guide-bc7ef-default-rtdb.firebaseio.com/posts.json",

          // add http header
          {
            headers: new HttpHeaders({ "Custom-Header": "Hello" }),
            // https://ng-guide-bc7ef-default-rtdb.firebaseio.com/posts.json?print=pretty
            // params: new HttpParams().set("print", "pretty"),

            // https://ng-guide-bc7ef-default-rtdb.firebaseio.com/posts.json?print=pretty&custom=key
            params: searchParams,

            // default json, it can also be text etc.
            responseType: "json",
          }
        )
        .pipe(
          map((responseData) => {
            const postsArray: Post[] = [];

            for (const key in responseData) {
              if (responseData.hasOwnProperty(key)) {
                postsArray.push({ ...responseData[key], id: key });
              }
            }
            return postsArray;
          }),
          catchError((errorRes) => {
            // do some genetic tasks (e.g. send to analytics server etc.)
            return throwError(errorRes);
          })
        )
    );
  }

  deletePosts() {
    return this.http
      .delete(
        "https://ng-guide-bc7ef-default-rtdb.firebaseio.com/posts.json/",
        {
          observe: "events",
        }
      )
      .pipe(
        tap((event) => {
          console.log(event);
          if (event.type === HttpEventType.Sent) {
            // ...
          }
          if (event.type === HttpEventType.Response) {
            console.log(event.body);
          }
        })
      );
  }
}
