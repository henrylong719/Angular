# Angular



## Observable

<img src="/Users/henrylong/Angular/Angular/images/observable.png" alt="observable" style="zoom:50%;" />



### custom observable

```typescript

// home.component.ts

import { Component, OnDestroy, OnInit } from "@angular/core";
import { interval, Observable, Subscription } from "rxjs";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor() {}

  private firstObsSubscription: Subscription;

  ngOnInit() {
    // this.firstObsSubscription = interval(1000).subscribe((count) => {
    //   console.log(count);
    // });

    const customIntervalObservable = new Observable((observer) => {
      let count = 0;
      setInterval(() => {
        observer.next(count);

        if (count === 2) {
          observer.complete();
        }

        if (count > 3) {
          observer.error(new Error("Count is greater than 3!"));
        }

        count++;
      }, 1000);
    });

    this.firstObsSubscription = customIntervalObservable.subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.log(error.message);
      },
      () => {
        console.log("Completed!");
      }
    );
  }
  ngOnDestroy() {
    this.firstObsSubscription.unsubscribe();
  }
}

```



### Operators

<img src="/Users/henrylong/Angular/Angular/images/operators.png" alt="operators" style="zoom:50%;" />





```typescript

// home.component.ts

  ngOnInit() {
    // this.firstObsSubscription = interval(1000).subscribe((count) => {
    //   console.log(count);
    // });

    const customIntervalObservable = new Observable((observer) => {
      let count = 0;
      setInterval(() => {
        observer.next(count);

        if (count === 2) {
          observer.complete();
        }

        if (count > 3) {
          observer.error(new Error("Count is greater than 3!"));
        }

        count++;
      }, 1000);
    });

    this.firstObsSubscription = customIntervalObservable
      .pipe(
        filter((data) => {
          return data > 0;
        }),
        map((data: number) => {
          return "Round" + (data + 1);
        })
      )
      .subscribe(
        (data) => {
          console.log(data);
        },
        (error) => {
          console.log(error.message);
        },
        () => {
          console.log("Completed!");
        }
      );
  }
```





### Subject



Only use subjects to **communicate  across components** through **services**

<img src="/Users/henrylong/Angular/Angular/images/Subject.png" alt="Subject" style="zoom:50%;" />



**Example**

1. create `user.service.ts` allow user component and app component communicating

```typescript

// user.service.ts

import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({ providedIn: "root" })
export class UserService {
  statusUpdated = new EventEmitter<boolean>();
}

```



2. add button in the `user.component.html`

```html

<p>
  User with <strong>ID {{ id }}</strong> was loaded
</p>
<button class="btn btn-primary" (click)="onActivated()">Activate</button>

```



3. in the `user.component.ts`, add `onActivated` and emit event



```typescript

import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { UserService } from "../user.service";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"],
})
export class UserComponent implements OnInit {
  isActivated: boolean = false;

  id: number;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
    });
  }

  onActivated() {
    this.isActivated = !this.isActivated;
    this.userService.statusUpdated.emit(this.isActivated);
  }
}

```



4. in the `app.component.ts`, subscribe the event

```typescript

export class AppComponent implements OnInit {
  isActivated: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.statusUpdated.subscribe((status: boolean) => {
      this.isActivated = status;
    });
  }
}

```



5. in the `app.component.html` ,render the event

```typescript

<div class="container">
  <div class="row">
    <div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
      <a routerLink="/">Home</a> |
      <a [routerLink]="['user', 1]"> User 1 </a>
      |
      <a [routerLink]="['user', 2]"> User 2 </a>
    </div>
  </div>
  <hr />

  <p *ngIf="isActivated">Activated!</p>

  <hr />
  <div class="row">
    <div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
      <router-outlet></router-outlet>
    </div>
  </div>
</div>

```



<img src="/Users/henrylong/Angular/Angular/images/Subject2.png" alt="Subject2" style="zoom:50%;" />



**Use Subject** 



Only use subjects to **communicate  across components** through **services**



In the `user.service.ts` ,replace `eventEmitter` with `Subject`

```typescript

import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({ providedIn: "root" })
export class UserService {
  statusUpdated = new Subject<boolean>();
}

```



For the `onActivated` in the `user.component.ts` , replace `emit()` with `next()`



```typescript

  onActivated() {
    this.isActivated = !this.isActivated;
    this.userService.statusUpdated.next(this.isActivated);
  }

```



