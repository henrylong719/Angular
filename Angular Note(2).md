# Angular



## Routing

### set up routes

(read move out route module)

1. In the `app.module.ts`

```typescript
const appRoutes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: "", component: HomeComponent },
  { path: "users", component: UserComponent },
  { path: "servers", component: ServerComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UsersComponent,
    ServersComponent,
    UserComponent,
    EditServerComponent,
    ServerComponent,
  ],
  imports: [BrowserModule, FormsModule, RouterModule.forRoot(appRoutes)],
  providers: [ServersService],
  bootstrap: [AppComponent],
})
export class AppModule {}

```



2. in the `app.component.html`

```html
<div class="container">
  <div class="row">
    <div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
      <ul class="nav nav-tabs">
        <li
          role="presentation"
          routerLinkActive="active"
          [routerLinkActiveOptions]="{ exact: true }"
        >
          <a [routerLink]="['/']">Home</a>
        </li>
        <li role="presentation" routerLinkActive="active">
          <a routerLink="/servers">Servers</a>
        </li>
        <li role="presentation" routerLinkActive="active">
          <a [routerLink]="['/users']">Users</a>
        </li>
      </ul>
    </div>
  </div>
  <div class="row">
    <div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
      <router-outlet></router-outlet>
    </div>
  </div>
</div>


```



### Navigating Programmatically

```typescript
// home.component.ts

export class HomeComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  onLoadServers() {
    //complex calculation
    this.router.navigate(["/servers"]);
  }
}

```



**use relative path**



```typescript
// servers.component.ts

import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ServersService } from "./servers.service";

@Component({
  selector: "app-servers",
  templateUrl: "./servers.component.html",
  styleUrls: ["./servers.component.css"],
})
export class ServersComponent implements OnInit {
  public servers: { id: number; name: string; status: string }[] = [];

  constructor(
    private serversService: ServersService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.servers = this.serversService.getServers();
  }

  onReload() {
    // relativeTo: (current page)
    this.router.navigate(["servers"], { relativeTo: this.route });
  }
}

```



### Pass parameters to routes

1. add `  { path: "users/:id/:name", component: UserComponent },` to `appRoutes` in the `app.module.ts`
2. in the `user.component.ts`, add functions to get parameters

```typescript
import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"],
})
export class UserComponent implements OnInit, OnDestroy {
  user: { id: number; name: string };
  paramsSubscription: Subscription;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.user = {
      // snapshot can only work when entering from other different pages
      id: this.route.snapshot.params["id"],
      name: this.route.snapshot.params["name"],
    };

    // need to add an observable if there might be changes in the current page
    this.paramsSubscription = this.route.params.subscribe((params: Params) => {
      this.user.id = +params['id'];
      this.user.name = params.name;
    });
  }

  // for the params subscription, no need to unsubscribe (angular will do it automatically) but own defined observable needs to
  // be unsubscribed
  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }
}

```



### Query Parameters and Fragments



**Passing Query Parameters and Fragments**

1. add ` { path: "servers/:id/edit", component: ServersComponent },` to `app.module.ts`



​	**Add query parameters in the link**

2. in the `servers.component.ts`

```typescript
<div class="row">
  <div class="col-xs-12 col-sm-4">
    <div class="list-group">
      <a
        [routerLink]="['/servers', 5, 'edit']"
        [queryParams]="{ allowEdit: '1' }"
        fragment="loading"
        href="#"
        class="list-group-item"
        *ngFor="let server of servers"
      >
        {{ server.name }}
      </a>
    </div>
  </div>
  <div class="col-xs-12 col-sm-4">
    <button class="btn btn-primary" (click)="onReload()">Reload Page</button>
    <app-edit-server></app-edit-server>
    <hr />
    <app-server></app-server>
  </div>
</div>

```



​	**Add query parameters programmatically**



3. 

```typescript
 onLoadServer(id: number) {
    //complex calculation
    // this.router.navigate(["/servers"]);

    this.router.navigate(["/servers", id, "edit"], {
      queryParams: { allowEdit: "1" },
      fragment: "loading",
    });
  }

```



3. in the `edit-server.component.ts`

```typescript
  ngOnInit() {
    console.log(this.route.snapshot.queryParams);
    console.log(this.route.snapshot.fragment);

    // or
    this.route.queryParams.subscribe((query) => {
      console.log(query);
    });

    this.route.fragment.subscribe((frag) => {
      console.log(frag);
    });

    this.server = this.serversService.getServer(1);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

```



### Child (Nested) Routes



```typescript
// app.module.ts

const appRoutes: Routes = [
  { path: "", component: HomeComponent },
  {
    path: "users",
    component: UsersComponent,
    children: [{ path: ":id/:name", component: UserComponent }],
  },

  {
    path: "servers",
    component: ServersComponent,
    children: [
      { path: ":id", component: ServerComponent },
      { path: ":id/edit", component: EditServerComponent },
    ],
  },
];
```



In the `users.component.html` and `servers.component.html`, use ` <router-outlet></router-outlet>` in the corresponding area.



### Maintain the parameters in the url

In the `server.component.ts`

```typescript

  onEdit() {
    this.router.navigate(["edit"], {
      relativeTo: this.route,
      queryParamsHandling: "preserve",
    });
  }
```



### Redirecting and Wildcard Routes (random URL)



```typescript
const appRoutes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  {
    path: "users",
    component: UsersComponent,
    children: [{ path: ":id/:name", component: UserComponent }],
  },
  
  // put it in the last
  { path: "not-found", component: PageNotFoundComponent },
  { path: "**", redirectTo: "/not-found" },
];
```



### Move out route module



```typescript
// app-routing.module.ts

const appRoutes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  {
    path: "users",
    component: UsersComponent,
    children: [{ path: ":id/:name", component: UserComponent }],
  },

  {
    path: "servers",
    component: ServersComponent,
    children: [
      { path: ":id", component: ServerComponent },
      { path: ":id/edit", component: EditServerComponent },
    ],
  },
  { path: "not-found", component: PageNotFoundComponent },
  { path: "**", redirectTo: "/not-found" },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

```



```typescript
// app.module.ts

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UsersComponent,
    ServersComponent,
    UserComponent,
    EditServerComponent,
    ServerComponent,
    PageNotFoundComponent,
  ],
  imports: [BrowserModule, FormsModule, AppRoutingModule],
  providers: [ServersService],
  bootstrap: [AppComponent],
})
export class AppModule {}
```







### Protecting Routes with canActive

**source code**

`auth-guard.service.ts`

`auth.service.ts`

`app.module.ts`

`home.component.html`

`home.component.ts`



### Controlling Navigation with canDeactivate

`edit-server.component.ts`

`can-deactivate-guard.service.ts`

`app-routing.module.ts`

`app.module.ts`



### Passing static data to route

1. generate `error-page component ` and modify `error-page.component.ts` and `error-page.component.html`



```typescript
// error-page.component.html
<h4>{{ errorMessage }}</h4>



// error-page.component.ts
export class ErrorPageComponent implements OnInit {
  errorMessage: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // this.errorMessage = this.route.snapshot.data["message"];

    this.route.data.subscribe((data: Data) => {
      this.errorMessage = data["message"];
    });
  }
}

```



2. change corresponding routes in the `app-routing.module.ts`

```typescript
{
    path: "not-found",
    component: ErrorPageComponent,
    data: { message: "Page not found!" },
  },
    
```





### Resolving Dynamic Data with the resolve guard

.......











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



## Forms

<img src="/Users/henrylong/Angular/Angular/images/form.png" alt="form" style="zoom:50%;" />





<img src="/Users/henrylong/Angular/Angular/images/form2.png" alt="form2" style="zoom:50%;" />



### Template-Driven



```html

<!-- app.component.html  -->

<div class="container">
  <div class="row">
    <div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
      <form (ngSubmit)="onSubmit()" #f="ngForm">
        <!-- method 2 form (ngSubmit)="onSubmit(f)" #f="ngForm" -->
        <div id="user-data">
          <div class="form-group">
            <label for="username">Username</label>
            <input
              type="text"
              id="username"
              class="form-control"
              name="username"
              ngModel
            />
          </div>
          <button class="btn btn-default" type="button">
            Suggest an Username
          </button>
          <div class="form-group">
            <label for="email">Mail</label>
            <input
              type="email"
              id="email"
              class="form-control"
              name="email"
              ngModel
            />
          </div>
        </div>
        <div class="form-group">
          <label for="secret">Secret Questions</label>
          <select id="secret" class="form-control" name="secret" ngModel>
            <option value="pet">Your first Pet?</option>
            <option value="teacher">Your first teacher?</option>
          </select>
        </div>
        <button class="btn btn-primary" type="submit">Submit</button>
      </form>
    </div>
  </div>
</div>

```



```typescript

// app.component.ts

export class AppComponent {
  // method 1
  @ViewChild("f") signupForm: NgForm;

  suggestUserName() {
    const suggestedName = "Superuser";
  }

  // method 1
  onSubmit() {
    console.log(this.signupForm);
  }

  // method 2
  // onSubmit(form: NgForm) {
  //   console.log(form);
  // }
}


/* or

// shopping-edit.component.html

<form (ngSubmit)="onAddItem(f)" #f="ngForm">

// shopping-edit.component.ts

onAddItem(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
  }
}
*/

```



### Built-in Validators & Using HTML5 Validation



Which Validators do ship with Angular? 

Check out the Validators class: https://angular.io/api/forms/Validators - these are all built-in validators, though that are the methods which actually get executed (and which you later can add when using the reactive approach).

For the template-driven approach, you need the directives. You can find out their names, by searching for "validator" in the official docs: https://angular.io/api?type=directive - everything marked with "D" is a directive and can be added to your template.

Additionally, you might also want to enable HTML5 validation (by default, Angular disables it). You can do so by adding the `ngNativeValidate` to a control in your template.



```html

<!-- app.component.html  -->

<div class="container">
  <div class="row">
    <div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
      <form (ngSubmit)="onsubmit()" #f="ngForm">
        <!-- method 2 form (ngSubmit)="onSubmit(f)" #f="ngForm" -->
        <div id="user-data" ngModelGroup="userData" #userData="ngModelGroup">
          <div class="form-group">
            <label for="username">Username</label>
            <input
              type="text"
              id="username"
              class="form-control"
              name="username"
              ngModel
              required
            />
          </div>
          <button
            class="btn btn-default"
            type="button"
            (click)="suggestUserName()"
          >
            Suggest an Username
          </button>
          <div class="form-group">
            <label for="email">Mail</label>
            <input
              type="email"
              id="email"
              class="form-control"
              name="email"
              ngModel
              required
              email
              #email="ngModel"
            />
            <span class="help-block" *ngIf="!email.valid && email.touched"
              >Please enter a valid email</span
            >
          </div>
        </div>
        <p *ngIf="!userData.valid">User Data is invalid</p>
        
        <div class="form-group">
          <label for="secret">Secret Questions</label>
          <select
            id="secret"
            class="form-control"
            name="secret"
            [ngModel]="defaultQuestion"
          >
            <option value="pet">Your first Pet?</option>
            <option value="teacher">Your first teacher?</option>
          </select>
        </div>
        
        <!-- from assignment  -->
        <div class="form-group">
         <select
              name="subscription"
              id="subscription"
              class="form-control"
              ngModel
              #subscription="ngModel"
              [ngModel]="defaultSubscription"
            >
              <option
                *ngFor="let subscription of subscriptions"
                [value]="subscription"
              >
                {{ subscription }}
              </option>
            </select>
         </div>
        
        <div class="form-group">
          <textarea
            name="questionAnswer"
            cols="105"
            rows="10"
            [(ngModel)]="answer"
          ></textarea>
        </div>
        <p>Your answer: {{ answer }}</p>
        <div class="radio" *ngFor="let gender of genders">
          <label>
            <input
              type="radio"
              name="gender"
              [ngModel]="defaultGender"
              [value]="gender"
              required
            />
            {{ gender }}
          </label>
        </div>
        <button class="btn btn-primary" type="submit" [disabled]="!f.valid">
          Submit
        </button>
      </form>
    </div>
  </div>
</div>

<hr />

<div class="row" *ngIf="submitted">
  <div class="col-xs-12">
    <h3>Your Data</h3>
    <p>Username:{{ user.username }}</p>
    <p>Mail:{{ user.email }}</p>
    <p>Secret Question: Your first {{ user.secretQuestion }}</p>
    <p>Answer:{{ user.answer }}</p>
    <p>Gender: {{ user.gender }}</p>
  </div>
</div>

```





```typescript

// app.component.ts

import { Component, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  // method 1
  @ViewChild("f") signupForm: NgForm;

  genders = ["male", "female"];
  answer = "";
  defaultQuestion = "pet";
  defaultGender = this.genders[0];
  submitted = false;

  user = {
    username: "",
    email: "",
    secretQuestion: "",
    answer: "",
    gender: "",
  };

  suggestUserName() {
    const suggestedName = "Superuser";

    // setValue: set the whole form
    // this.signupForm.setValue({
    //   userData: {
    //     username: suggestedName,
    //     email: "",
    //   },

    //   secret: "pet",
    //   questionAnswer: "",
    //   gender: "male",
    // });

    // patchValue: overrides parts of the form

    this.signupForm.form.patchValue({
      userData: {
        username: suggestedName,
        email: "dsfdsf@dfsfds",
      },
      gender: "male",
    });
  }

  // method 1
  // onSubmit() {
  //   console.log(this.signupForm);
  // }

  // method 2
  // onSubmit(form: NgForm) {
  //   console.log(form);
  // }

  onsubmit() {
    this.submitted = true;
    this.user.username = this.signupForm.value.userData.username;
    this.user.email = this.signupForm.value.userData.email;
    this.user.secretQuestion = this.signupForm.value.userData.secret;
    this.user.answer = this.signupForm.value.questionAnswer;
    this.user.gender = this.signupForm.value.gender;

    this.signupForm.reset();
  }
}


```





```css

/* app.component.css */

form .ng-invalid.ng-touched {
  border: 1px solid red;
}

```



**Example 2 from assignment**

```html

<!-- app.component.html -->

<div class="container">
  <div class="row">
    <div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
      <form #signupForm="ngForm" (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label for="email"> Email: </label>

          <input
            type="email"
            id="email"
            name="email"
            class="form-control"
            required
            email
            ngModel
            #email="ngModel"
          />
          <span class="help-block" *ngIf="!email.valid && email.touched"
            >Please enter a valid email</span
          >
        </div>

        <div class="form-group">
          <label for="password"> Password: </label>
          <input
            type="password"
            id="password"
            name="password"
            class="form-control"
            required
            ngModel
            #password="ngModel"
          />

          <span class="help-block" *ngIf="!password.valid && password.touched"
            >Please enter a valid password</span
          >
        </div>

        <div class="form-group">
          <label for="subscriptions"></label>

          <select
            name="subscription"
            id="subscription"
            class="form-control"
            ngModel
            #subscription="ngModel"
            [ngModel]="defaultSubscription"
          >
            <option
              *ngFor="let subscription of subscriptions"
              [value]="subscription"
            >
              {{ subscription }}
            </option>
          </select>
        </div>

        <p *ngIf="!signupForm.valid && signupForm.touched">
          User Data is invalid
        </p>
        <button class="btn btn-primary" type="submit">Submit</button>
      </form>
    </div>
  </div>
</div>

```





```typescript

// app.component.ts

export class AppComponent {
  @ViewChild("signupForm") sgnForm: NgForm;

  subscriptions = ["Basic", "Advanced", "Pro"];

  defaultSubscription = "Advanced";

  onSubmit() {
    console.log(this.sgnForm.value.email);
    console.log(this.sgnForm.value.password);
    console.log(this.sgnForm.value.subscription);
  }
}

```





### Reactive

1. Import `ReactiveFormsModule` in the `app.module.ts`



```html


<!-- app.component.html  -->

<div class="container">
  <div class="row">
    <div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
      <!-- connect form to the signupForm -->
      <form [formGroup]="signupForm" (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label for="username">Username</label>
          <!-- connect username -->
          <input
            type="text"
            id="username"
            class="form-control"
            formControlName="username"
          />
          <span
            *ngIf="
              !signupForm.get('username').valid &&
              signupForm.get('username').touched
            "
            class="help-block"
            >Please enter a valid username!</span
          >
        </div>
        <div class="form-group">
          <label for="email">email</label>
          <input
            type="text"
            id="email"
            class="form-control"
            formControlName="email"
          />
          <span
            *ngIf="
              !signupForm.get('email').valid && signupForm.get('email').touched
            "
            class="help-block"
            >Please enter a valid email!</span
          >
        </div>
        <div class="radio" *ngFor="let gender of genders">
          <label>
            <input type="radio" [value]="gender" formControlName="gender" />{{
              gender
            }}
          </label>
        </div>
        <span *ngIf="!signupForm.valid && signupForm.touched" class="help-block"
          >Please enter a valid data!</span
        >

        <button class="btn btn-primary" type="submit">Submit</button>
      </form>
    </div>
  </div>
</div>

```



```typescript

// app.component.ts

import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  genders = ["male", "female"];
  signupForm: FormGroup;

  ngOnInit() {
    this.signupForm = new FormGroup({
      // new FormControl(default value, validators)

      username: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),

      gender: new FormControl("male"),
    });
  }
  onSubmit() {
    console.log("tes");
    console.log(this.signupForm);
  }
}

```





**Form group**



```html

<!-- app.component.ts  -->

<div class="container">
  <div class="row">
    <div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
      <!-- connect form to the signupForm -->
      <form [formGroup]="signupForm" (ngSubmit)="onSubmit()">
        <div formGroupName="userData">
          <div class="form-group">
            <label for="username">Username</label>
            <!-- connect username -->
            <input
              type="text"
              id="username"
              class="form-control"
              formControlName="username"
            />
            <span
              *ngIf="
                !signupForm.get('userData.username').valid &&
                signupForm.get('userData.username').touched
              "
              class="help-block"
              >Please enter a valid username!</span
            >
          </div>
          <div class="form-group">
            <label for="email">email</label>
            <input
              type="text"
              id="email"
              class="form-control"
              formControlName="email"
            />
            <span
              *ngIf="
                !signupForm.get('userData.email').valid &&
                signupForm.get('userData.email').touched
              "
              class="help-block"
              >Please enter a valid email!</span
            >
          </div>
        </div>

        <div class="radio" *ngFor="let gender of genders">
          <label>
            <input type="radio" [value]="gender" formControlName="gender" />{{
              gender
            }}
          </label>
        </div>

        <div formArrayName="hobbies">
          <h4>Your Hobbies</h4>
          <button class="btn btn-default" type="button" (click)="onAddHobby()">
            Add Hobby
          </button>

          <div
            class="form-group"
            *ngFor="let hobbyControl of getControls(); let i = index"
          >
            <input type="text" class="form-control" [formControlName]="i" />
          </div>
        </div>

        <span *ngIf="!signupForm.valid && signupForm.touched" class="help-block"
          >Please enter a valid data!</span
        >

        <button class="btn btn-primary" type="submit">Submit</button>
      </form>
    </div>
  </div>
</div>


```





```typescript

// app.component.ts

export class AppComponent implements OnInit {
  genders = ["male", "female"];
  signupForm: FormGroup;

  ngOnInit() {
    this.signupForm = new FormGroup({
      userData: new FormGroup({
        // new FormControl(default value, validators)
        username: new FormControl(null, Validators.required),
        email: new FormControl(null, [Validators.required, Validators.email]),
      }),

      gender: new FormControl("male"),
      hobbies: new FormArray([]),
    });
  }
  onSubmit() {
    console.log("tes");
    console.log(this.signupForm);
  }

  getControls() {
    return (<FormArray>this.signupForm.get("hobbies")).controls;
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get("hobbies")).push(control);
  }
}

```



**create custom validators**

```typescript

export class AppComponent implements OnInit {
  genders = ["male", "female"];
  signupForm: FormGroup;

  // 1. add forbiddenUsernames array
  forbiddenUsernames = ["Chris", "Andia"];

  ngOnInit() {
    this.signupForm = new FormGroup({
      userData: new FormGroup({
        // new FormControl(default value, validators)
        // 3. bring forbiddenNames to username validators
        username: new FormControl(null, [
          Validators.required,
          this.forbiddenNames.bind(this),
        ]),
        email: new FormControl(null, [Validators.required, Validators.email]),
      }),

      gender: new FormControl("male"),
      hobbies: new FormArray([]),
    });
  }

  // 2. add corresponding method
  forbiddenNames(control: FormControl): { [s: string]: boolean } {
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return { nameIsForbidden: true };
    }
    return null;
  }
}

```





```html


<!-- app.component.html  -->

<div class="container">
  <div class="row">
    <div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
      <!-- connect form to the signupForm -->
      <form [formGroup]="signupForm" (ngSubmit)="onSubmit()">
        <div formGroupName="userData">
          <div class="form-group">
            <label for="username">Username</label>
            <!-- connect username -->
            <input
              type="text"
              id="username"
              class="form-control"
              formControlName="username"
            />
            <span
              *ngIf="
                !signupForm.get('userData.username').valid &&
                signupForm.get('userData.username').touched
              "
              class="help-block"
            >
              <span
                *ngIf="
                  signupForm.get('userData.username').errors['nameIsForbidden']
                "
                >This name is invalid</span
              >

              <span
                *ngIf="signupForm.get('userData.username').errors['required']"
                >This field is invalid</span
              >
            </span>
          </div>
        </div>

      </form>
    </div>
  </div>
</div>


```



**Add Async Validator**

```typescript

// 1. create forbiddenEmails function

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === "test@test.com") {
          resolve({ emailIsForbidden: true });
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }
  
  
  
// 2.bring it to the email object
    email: new FormControl(
          null,
          [Validators.required, Validators.email],
          this.forbiddenEmails
		),
      
```



```typescript

// app.component.ts

export class AppComponent implements OnInit {
  genders = ["male", "female"];
  signupForm: FormGroup;

  // 1. add forbiddenUsernames array
  forbiddenUsernames = ["Chris", "Andia"];

  ngOnInit() {
    this.signupForm = new FormGroup({
      userData: new FormGroup({
        // new FormControl(default value, validators)
        // 3. bring forbiddenNames to username validators
        username: new FormControl(null, [
          Validators.required,
          this.forbiddenNames.bind(this),
        ]),
        email: new FormControl(
          null,
          [Validators.required, Validators.email],
          this.forbiddenEmails
        ),
      }),

      gender: new FormControl("male"),
      hobbies: new FormArray([]),
    });

    // this.signupForm.valueChanges.subscribe((value) => console.log(value));
    this.signupForm.statusChanges.subscribe((status) => console.log(status));

    // this.signupForm.setValue({
    //   userData: {
    //     username: "Max",
    //     email: "max@test.com",
    //   },
    //   gender: "male",
    //   hobbies: [],
    // });

    this.signupForm.patchValue({
      userData: {
        username: "Anna",
      },
    });
  }

  onSubmit() {
    console.log("tes");
    console.log(this.signupForm);

    this.signupForm.reset();
  }
}

```



**Example 2**

```html

<!-- app.component.html -->

<div class="container">
  <div class="row">
    <div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
      <form [formGroup]="projectForm" (ngSubmit)="onSaveProject()">
        <div class="form-group">
          <label for="name"> Project Name: </label>

          <input
            type="name"
            name="name"
            id="name"
            class="form-control"
            formControlName="projectName"
          />

          <span
            *ngIf="
              !projectForm.get('projectName').valid &&
              projectForm.get('projectName').touched
            "
          >
            Please enter a valid project name
          </span>
        </div>

        <div class="form-group">
          <label for="email"> Mail: </label>

          <input
            type="email"
            name="email"
            id="email"
            class="form-control"
            formControlName="email"
          />

          <span
            *ngIf="
              !projectForm.get('email').valid &&
              projectForm.get('email').touched
            "
          >
            Please enter a valid project name
          </span>
        </div>

        <div class="form-group">
          <label for="status">Project status</label>
          <select
            id="status"
            formControlName="projectStatus"
            class="form-control"
          >
            <option *ngFor="let status of projectStatus" [value]="status">
              {{ status }}
            </option>
          </select>
        </div>

        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  </div>
</div>


```



```typescript

// app.component.ts

import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { CustomValidators } from "./custom-validators";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  projectForm: FormGroup;
  projectStatus = ["Stable", "Critical", "Finished"];

  ngOnInit() {
    this.projectForm = new FormGroup({
      projectName: new FormControl(
        null,
        [Validators.required, CustomValidators.invalidProjectName],
        CustomValidators.asyncInvalidProjectName
      ),
      email: new FormControl(null, [Validators.required, Validators.email]),
      projectStatus: new FormControl("Critical"),
    });
  }

  onSaveProject() {
    console.log(this.projectForm.value);
  }
}

```



```typescript

// custom-validators.ts

import { FormControl } from "@angular/forms";
import { Observable } from "rxjs/Observable";

export class CustomValidators {
  static invalidProjectName(control: FormControl): { [s: string]: boolean } {
    if (control.value === "Test") {
      return { invalidProjectName: true };
    }
    return null;
  }

  static asyncInvalidProjectName(
    control: FormControl
  ): Promise<any> | Observable<any> {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (control.value === "Testproject") {
          resolve({ invalidProjectName: true });
        } else {
          resolve(null);
        }
      }, 2000);
    });
    return promise;
  }
}

```



## Pipes



Examples of using pipes



```html
{{ server.instanceType | uppercase }} 
{{ server.started | date: "fullDate" | upppercase }}
```



 [Reference](https://angular.io/api?query=pipe)



### Create custom pipes



**Shoten Pipe**

1. ceate `shorten.pipe.ts` or `ng g p shorten`

```typescript

import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "shorten",
})
export class ShortenPipe implements PipeTransform {
  transform(value: any, limit: number) {
    if (value.length > limit) {
      return value.substr(0, limit) + " ...";
    }
    return value;
  }
}

```



2. import pipe in the `declarations` of`app.module.ts`

```typescript

@NgModule({
  declarations: [AppComponent, ShortenPipe],
  imports: [BrowserModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
```



3. use pipe in the `app.component.html`

```html

 <strong>{{ server.name | shorten: 5 }}</strong>
 
```





**Filter Pipe**

1. `ng g p filter`
2. 

```typescript

// filter.pipe.ts

import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "filter",
  // alow page to render in the filter
  pure: false,
})
export class FilterPipe implements PipeTransform {
  transform(value: any, filterString: string, propName: string): any {
    if (value.length === 0 || !filterString) {
      return value;
    }

    const resultArray = [];
    for (const item of value) {
      if (item[propName] === filterString) {
        resultArray.push(item);
      }
    }
    return resultArray;
  }
}

```



3. 

```html

<!-- app.component.html  -->

<div class="container">
  <div class="row">
    <div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
      <input type="text" [(ngModel)]="filteredStatus" />
      <br />
      <button class="btn btn-primary" (click)="onAddServer()">
        Add Server
      </button>

      <hr />
      <ul class="list-group">
        <li
          class="list-group-item"
          *ngFor="let server of servers | filter: filteredStatus:'status'"
          [ngClass]="getStatusClasses(server)"
        >
          <span class="badge">
            {{ server.status }}
          </span>
          <strong>{{ server.name | shorten: 5 }}</strong> |
          {{ server.instanceType | uppercase }} |
          {{ server.started | date: "fullDate" | uppercase }}
        </li>
      </ul>
    </div>
  </div>
</div>


```



4. 

```typescript

// app.component.ts

export class AppComponent {
  servers = [
    {
      instanceType: "medium",
      name: "Production Server",
      status: "stable",
      started: new Date(15, 1, 2017),
    },
    {
      instanceType: "large",
      name: "User Database",
      status: "stable",
      started: new Date(15, 1, 2017),
    },
    {
      instanceType: "small",
      name: "Development Server",
      status: "offline",
      started: new Date(15, 1, 2017),
    },
    {
      instanceType: "small",
      name: "Testing Environment Server",
      status: "stable",
      started: new Date(15, 1, 2017),
    },
  ];

  filteredStatus = "";

  getStatusClasses(server: {
    instanceType: string;
    name: string;
    status: string;
    started: Date;
  }) {
    return {
      "list-group-item-success": server.status === "stable",
      "list-group-item-warning": server.status === "offline",
      "list-group-item-danger": server.status === "critical",
    };
  }

  onAddServer() {
    this.servers.push({
      instanceType: "small",
      name: "New Server",
      status: "stable",
      started: new Date(13, 1, 2020),
    });
  }
}

```





### async pipe

```html

<!-- app.component.html  -->
<h2>App Status: {{ appStatus | async }}</h2>

```



```typescript

// app.component.ts

appStatus = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("stable");
    }, 2000);
  });

```



## Making Http Requests



<img src="/Users/henrylong/Angular/Angular/images/makingHttpRequest.png" alt="makingHttpRequest" style="zoom:45%;" />



https://angular.io/guide/http



### Send requests



1. import `HttpClientModule` in the `app.module.ts`

```typescript
import { HttpClientModule } from '@angular/common/http';
...

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

```



2. send requests to firebase in `app.component.ts`

```typescript

// app.component.ts

export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];

  isFetching: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPosts();
  }

  // post requests
  onCreatePost(postData: { title: string; content: string }) {
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

  onFetchPosts() {
    this.isFetching = true;
    // Send Http request
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
  }

  // get requests
  private fetchPosts() {
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

      .subscribe((posts) => {
        this.isFetching = false;
        this.loadedPosts = posts;
      });
  }
}


```



```html

<!-- app.component.html  -->

<div class="container">
  <div class="row">
    <div class="col-xs-12 col-md-6 col-md-offset-3">
      <form #postForm="ngForm" (ngSubmit)="onCreatePost(postForm.value)">
        <div class="form-group">
          <label for="title">Title</label>
          <input
            type="text"
            class="form-control"
            id="title"
            required
            ngModel
            name="title"
          />
        </div>
        <div class="form-group">
          <label for="content">Content</label>
          <textarea
            class="form-control"
            id="content"
            required
            ngModel
            name="content"
          ></textarea>
        </div>
        <button
          class="btn btn-primary"
          type="submit"
          [disabled]="!postForm.valid"
        >
          Send Post
        </button>
      </form>
    </div>
  </div>
  <hr />
  <div class="row">
    <div class="col-xs-12 col-md-6 col-md-offset-3">
      <button class="btn btn-primary" (click)="onFetchPosts()">
        Fetch Posts
      </button>
      |
      <button
        class="btn btn-danger"
        [disabled]="loadedPosts.length < 1"
        (click)="onClearPosts()"
      >
        Clear Posts
      </button>
    </div>
  </div>
  <div class="row">
    <div class="col-xs-12 col-md-6 col-md-offset-3">
      <p *ngIf="loadedPosts.length < 1 && !isFetching">No posts available!</p>
      <ul class="list-grooup" *ngIf="loadedPosts.length >= 1 && !isFetching">
        <li class="list-group-item" *ngFor="let post of loadedPosts">
          <h3>{{ post.title }}</h3>
          <p>{{ post.content }}</p>
        </li>
      </ul>
      <p *ngIf="isFetching">loading...</p>
    </div>
  </div>
</div>

```



```typescript

// post.model.ts

export interface Post {
  title: string;
  content: string;
  // optional
  id?: string;
}

```



### Use service for http request

```html

<!-- app.component.html -->

<div class="container">
  <div class="row">
    <div class="col-xs-12 col-md-6 col-md-offset-3">
      <form #postForm="ngForm" (ngSubmit)="onCreatePost(postForm.value)">
        <div class="form-group">
          <label for="title">Title</label>
          <input
            type="text"
            class="form-control"
            id="title"
            required
            ngModel
            name="title"
          />
        </div>
        <div class="form-group">
          <label for="content">Content</label>
          <textarea
            class="form-control"
            id="content"
            required
            ngModel
            name="content"
          ></textarea>
        </div>
        <button
          class="btn btn-primary"
          type="submit"
          [disabled]="!postForm.valid"
        >
          Send Post
        </button>
      </form>
    </div>
  </div>
  <hr />
  <div class="row">
    <div class="col-xs-12 col-md-6 col-md-offset-3">
      <button class="btn btn-primary" (click)="onFetchPosts()">
        Fetch Posts
      </button>
      |
      <button
        class="btn btn-danger"
        [disabled]="loadedPosts.length < 1"
        (click)="onClearPosts()"
      >
        Clear Posts
      </button>
    </div>
  </div>
  <div class="row">
    <div class="col-xs-12 col-md-6 col-md-offset-3">
      <p *ngIf="loadedPosts.length < 1 && !isFetching">No posts available!</p>
      <ul class="list-grooup" *ngIf="loadedPosts.length >= 1 && !isFetching">
        <li class="list-group-item" *ngFor="let post of loadedPosts">
          <h3>{{ post.title }}</h3>
          <p>{{ post.content }}</p>
        </li>
      </ul>
      <p *ngIf="isFetching && !error">loading...</p>

      <div class="alert alert-danger" *ngIf="error">
        <h1>An error Occurs!</h1>
        <p>{{ error }}</p>
        <button class="btn btn-danger" (click)="onHandleError()">OK</button>
      </div>
    </div>
  </div>
</div>


```



```typescript

// app.component.ts

import { Component, OnDestroy, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Post } from "./post.model";
import { PostService } from "./post.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];

  isFetching: boolean = false;

  error = null;

  private errorSub: Subscription;

  constructor(private http: HttpClient, private postService: PostService) {}

  ngOnInit() {
    this.isFetching = true;
    this.postService.fetchPosts().subscribe(
      (posts) => {
        this.isFetching = false;
        this.loadedPosts = posts;
      },
      (error) => {
        this.isFetching = false;
        this.error = error.error.error;
        console.log(error);
      }
    );
  }

  // post requests
  onCreatePost(postData: Post) {
    this.postService.createAndStorePost(postData.title, postData.content);

    this.postService.errorMsg.subscribe((error) => {
      this.isFetching = false;
      this.error = error;

      console.log(error);
    });
  }

  onFetchPosts() {
    this.isFetching = true;
    this.postService.fetchPosts().subscribe(
      (posts) => {
        this.isFetching = false;
        this.loadedPosts = posts;
      },
      (error) => {
        this.isFetching = false;
        this.error = error.message;
      }
    );
  }

  onClearPosts() {
    // Send Http request

    this.postService.deletePosts().subscribe(() => {
      this.loadedPosts = [];
    });
  }

  ngOnDestroy() {
    this.errorSub.unsubscribe();
  }

  onHandleError() {
    this.error = null;
  }
}

```





```typescript

// post.service.ts

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

```



### Interceptors

example

```typescript

// auth-interceptor.serve.ts

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


```



```typescript

// logging-interceptor.service.ts

import {
  HttpEventType,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { tap } from "rxjs/operators";

export class LoggingInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log("Outgoing request");
    console.log(req.url);
    console.log(req.headers);

    // after "handle" to manipulate http response data
    return next.handle(req).pipe(
      tap((event) => {
        if (event.type === HttpEventType.Response) {
          console.log("Incoming response");
          console.log(event.body);
        }
      })
    );
  }
}

```





```typescript

// app.module.ts

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoggingInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})

```

