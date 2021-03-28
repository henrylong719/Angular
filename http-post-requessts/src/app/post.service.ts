import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";

import { Post } from "./post.model";

@Injectable({ providedIn: "root" })
export class PostService {
  constructor(private http: HttpClient) {}

  createAndStorePost(title: string, content: string) {
    const postData: Post = { title: title, content: content };

    // Send Http request
    // request only sent when it is subscribed
    this.http
      .post<{ name: string }>(
        "https://ng-guide-bc7ef-default-rtdb.firebaseio.com/posts.json",
        postData
      )
      .subscribe((responseData) => {
        console.log(responseData);
      });
  }

  fetchPosts() {
    return (
      this.http
        // indicate response body type
        .get<{ [key: string]: Post }>(
          "https://ng-guide-bc7ef-default-rtdb.firebaseio.com/posts.json"
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
          })
        )
    );
  }
}
