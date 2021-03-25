# Angular



```bash
$ sudo npm install -g @angular/cli

# create new angular project
ng new my-first-app

# start the server
ng serve

```



## Course Structure

<img src="/Users/henrylong/Library/Application Support/typora-user-images/Screen Shot 2021-03-17 at 10.51.26 am.png" alt="Screen Shot 2021-03-17 at 10.51.26 am" style="zoom:45%;" />



**Import bootstrap into project**

1. `$npm install --save bootstrap`

2. Add ` "node_modules/bootstrap/dist/css/bootstrap.min.css",` to `styles` in `angular.json`



generate new component

```bash
$ ng g c componentName
```



**Inline template**

```typescript
// app.component.ts

@Component({
  selector: 'app-root',
  template: 
   `
  <app-server></app-server>
  <app-server></app-server>
  `,
  
  styleUrls: ['./app.component.css']
})

```



**Inline css**

```typescript

// app.component.ts

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [`
  h3 {
    color: blue
  }
  `]
})

```



**Selector**

```typescript

// servers.component.ts

@Component({
  // selector: '[app-servers]',
  // selector: '.app-servers',
  selector : 'app-servers',
  templateUrl: './servers.component.html' ,
  styleUrls: ['./servers.component.css']
})



// app.component.html

<app-servers></app-servers>

<!-- <div app-servers></div> -->
<!-- <div class="app-servers"></div> -->

```



### Databinding



<img src="/Users/henrylong/Library/Application Support/typora-user-images/Screen Shot 2021-03-17 at 2.27.37 pm.png" alt="Screen Shot 2021-03-17 at 2.27.37 pm" style="zoom:67%;" />



#### String interpolation



```html
<!-- server.component.html  -->

<h1>this is server Component</h1>

<p>{{ "Server" }} with ID {{ serverId }} is {{ getServerStatus() }}</p>

```



```typescript

// server.component.ts

export class ServerComponent{

  serverId: number = 10
  serverStatus: string = 'offline'

  getServerStatus(){
    return this.serverStatus;
  }
}

```



#### Property Binding

```html

<!-- servers.component.html  -->
<p>this is the servers component</p>

<!-- [] indicate to  angular we are using property binding, we want to dynamic binding some property  -->

<button class="btn btn-primary" [disabled]="allowNewServer">Add Server</button>

```



```typescript

// servers.component.ts

export class ServersComponent implements OnInit {

  allowNewServer: boolean = true;

  constructor() { 
    setTimeout(() => {
      this.allowNewServer = false
    }, 2000);
  }
  
  ngOnInit(): void {
  }
}

```



#### Event Binding

```html

<!-- servers.component.html  -->

<label>
  <input
    type="text"
    class="form-control"
    (input)="onUpdateServerName($event)"
  />
</label>

<p>{{ serverName }}</p>
```





``` javascript

// servers.component.ts

export class ServersComponent implements OnInit {

  serverName: string = '';

  onUpdateServerName(event: Event){
    this.serverName = (<HTMLInputElement>event.target).value;
  }
}

```



#### Two-way-binding



Add  `import {FormsModule} from '@angular/forms'` in the `app.module.ts` and put it into imports array.



```html

<label>
  <input type="text" class="form-control" [(ngModel)]="serverName" />
</label>

<p>{{ serverName }}</p>

```



### Directives

**Directives are Instructions in the DOM**

 

**ngif**

```html

<!-- servers.component.html -->

<p *ngIf="serverCreated">Server was created, server name is {{ serverName }}</p>

```



```typescript

// servers.component.ts
export class ServersComponent implements OnInit {
  
serverCreated = false

  onCreateServer(){
    this.serverCreated = true,
    this.serverCreationStatus = 'server created and the name is ' + this.serverName
  }
```



**ngif else**

```html

<p *ngIf="serverCreated; else noServer">
  Server was created, server name is {{ serverName }}
</p>

<ng-template #noServer>
  <p>No server is running</p>
</ng-template>

```



**ngStyle**



```html

<!-- server.component.html  -->

<p [ngStyle]="{ backgroundColor: getColor() }">
  {{ "Server" }} with ID {{ serverId }} is {{ getServerStatus() }}
</p>

```



```typescript

//  server.component.ts

export class ServerComponent{
  
  serverStatus: string = 'offline'


  constructor(){
    this.serverStatus = Math.random() > 0.5 ? 'online' : 'offline' 
  }
  
  getColor(){
    return this.serverStatus === 'online' ? 'green': 'red';
  }
}
```



**ngclass**



```html

<!-- server.component.html  -->

<p
  [ngStyle]="{ backgroundColor: getColor() }"
  [ngClass]="{ online: serverStatus === 'online' }"
>
  {{ "Server" }} with ID {{ serverId }} is {{ getServerStatus() }}
</p>


```



```typescript

//  server.component.ts

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styles:[`
  .online{
    color: white
  }
  `]
  // styleUrls: ['./server.component.css']
})
```





**ngfor**

```html

<!-- server.component.html  -->

<app-server *ngFor="let server of servers"></app-server>


```



**Wrap up**



**Increment numbers**

```html

<!-- app.component.html  -->

  <button (click)="toggleSecret()">Display Details</button>
  <p *ngIf="displaySecret">Secret Password = henry</p>

  <div
    *ngFor="let item of logItems"
    [ngStyle]="{ backgroundColor: item >= 5 ? 'blue' : 'transparent' }"
    [ngClass]="{ 'white-text': item >= 5 }"
  >
    {{ item }}
  </div>

```



```typescript

//  app.component.ts

export class AppComponent {
  
  displaySecret = false;

  logItems =[]
  
  toggleSecret (){

    this.displaySecret = !this.displaySecret;

    this.logItems.push(this.logItems.length +1)
  }
}

```



**Timestamps**



```html

<!-- app.component.html  -->

<button (click)="toggleSecret()">Display Details</button>
  <p *ngIf="displaySecret">Secret Password = henry</p>

  <div
    *ngFor="let item of logItems; let i = index"
    [ngStyle]="{ backgroundColor: i >= 4 ? 'blue' : 'transparent' }"
    [ngClass]="{ 'white-text': i >= 4 }"
  >
    {{ item }}
  </div>

```



```typescript

//  app.component.ts

toggleSecret (){

    this.displaySecret = !this.displaySecret;

    // this.logItems.push(this.logItems.length +1)

    this.logItems.push(new Date());
  }

```



## Components & Databinding Deep Dive



### Component communication



#### Parent component to Child component



**Example 1**



1. in the `app.component.ts`, create dumb data

```typescript

export class AppComponent {
  serverElements = [
    { type: "server", name: "TestServer", content: "Just a test" },
  ];
}

```



2. in the `app.component.ts`, binding to custom properties

```typescript
<div class="container">
  <app-cockpit></app-cockpit>
  <hr />
  <div class="row">
    <div class="col-xs-12">
      <app-server-element
        *ngFor="let serverElement of serverElements"
 		    [srvElement]="serverElement" 
       	<!-- [element]="serverElement" -->
      ></app-server-element>
    </div>
  </div>
</div>

```



3. create element in the `server-element.component.ts`

```typescript


export class ServerElementComponent implements OnInit {
  
   //  @Input("srvElement"): expose an alias to outer component
   @Input("srvElement") element: { type: string; name: string; content: string };

  // @Input() element: { type: string; name: string; content: string };

  constructor() {}

  ngOnInit(): void {}
}

```



4. render the `element` in the `server-element.component.html`

```typescript

<div class="panel panel-default">
  <div class="panel-heading">{{ element.name }}</div>
  <div class="panel-body">
    <p>
      <strong *ngIf="element.type === 'server'" style="color: red">{{
        element.content
      }}</strong>
      <em *ngIf="element.type === 'blueprint'">{{ element.content }}</em>
    </p>
  </div>
</div>

```



**Example 2**



```typescript

// app.component.ts

export class AppComponent {
  oddNumbers: number[] = [];
  evenNumbers: number[] = [];

  onIntervalFired(fireNumber: number) {
    if (fireNumber % 2 === 0) {
      this.evenNumbers.push(fireNumber);
    } else {
      this.oddNumbers.push(fireNumber);
    }
  }
}

```



```html
<!-- app.component.html  -->

  <div class="row">
    <div class="col-xs-12">
      <app-odd *ngFor="let oddNumber of oddNumbers" [number]="oddNumber">
      </app-odd>
    </div>
  </div>

```



```typescript

// even.component.ts

export class EvenComponent implements OnInit {
  @Input() number: number;

  constructor() {}

  ngOnInit(): void {}
}

```



```html

<!--  even.component.ts  -->

<p>{{ number }}</p>

```



#### Child component to Parent component



**Example 1**



1. `cockpit.component.html`

```typescript
<div class="row">
  <div class="col-xs-12">
    <p>Add new Servers or blueprints!</p>
    <label>Server Name</label>
    <input type="text" class="form-control" [(ngModel)]="newServerName" />
    <label>Server Content</label>
    <input type="text" class="form-control" [(ngModel)]="newServerContent" />
    <br />
    <button class="btn btn-primary" (click)="onAddServer()">Add Server</button>
    <button class="btn btn-primary" (click)="onAddBlueprint()">
      Add Server Blueprint
    </button>
  </div>
</div>


```





2. modify `cockpit.component.ts`

```typescript


export class CockpitComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  @Output() serverCreated = new EventEmitter<{
    serverName: string;
    serverContent: string;
  }>();

  @Output("bpCreated") blueprintCreated = new EventEmitter<{
    serverName: string;
    serverContent: string;
  }>();

  newServerName = "";
  newServerContent = "";

  onAddServer() {
    this.serverCreated.emit({
      serverName: this.newServerName,
      serverContent: this.newServerContent,
    });
  }

  onAddBlueprint() {
    this.blueprintCreated.emit({
      serverName: this.newServerName,
      serverContent: this.newServerContent,
    });
  }
}

```



3. bring  `onServerAdded` and `onBlueprintAdded` to `app.component.html`



```typescript
<div class="container">
  <app-cockpit
    (serverCreated)="onServerAdded($event)"
    ,
    (bpCreated)="onBlueprintAdded($event)"
  ></app-cockpit>
  <hr />
  <div class="row">
    <div class="col-xs-12">
      <app-server-element
        *ngFor="let serverElement of serverElements"
        [srvElement]="serverElement"
      ></app-server-element>
    </div>
  </div>
</div>

```





4. create `onServerAdded` and `onBlueprintAdded` in the `app.component.ts`

```typescript
export class AppComponent {
  serverElements = [
    { type: "server", name: "TestServer", content: "Just a test" },
  ];

  onServerAdded(serverData: { serverName: string; serverContent: string }) {
    this.serverElements.push({
      type: "server",
      name: serverData.serverName,
      content: serverData.serverContent,
    });
  }

  onBlueprintAdded(blueprintData: {
    serverName: string;
    serverContent: string;
  }) {
    this.serverElements.push({
      type: "blueprint",
      name: blueprintData.serverName,
      content: blueprintData.serverContent,
    });
  }
}
```



**Example 2**



```html

<!--  game-control.component.html  -->

<button class="btn btn-success" (click)="onStartGame()">Start Game</button>
<button class="btn btn-danger" (click)="onStopGame()">Stop Game</button>

```



```typescript

// game-control.component.ts

export class GameControlComponent implements OnInit {
  @Output() intervalFired = new EventEmitter<number>();
  
  interval;
  lastNumber = 0;

  constructor() {}

  ngOnInit(): void {}

  onStartGame() {
    this.interval = setInterval(() => {
      this.intervalFired.emit(this.lastNumber + 1);
      this.lastNumber++;
    }, 1000);
  }

  onStopGame() {
    clearInterval(this.interval);
  }
}
```



```html

<!--  app.component.html  -->

  <div class="row">
    <div class="col-xs-12">
      <app-game-control (intervalFired)="onIntervalFired($event)">
      </app-game-control>
    </div>
  </div>

```



```typescript

// app.component.ts

export class AppComponent {
  oddNumbers: number[] = [];
  evenNumbers: number[] = [];

  onIntervalFired(fireNumber: number) {
    if (fireNumber % 2 === 0) {
      this.evenNumbers.push(fireNumber);
    } else {
      this.oddNumbers.push(fireNumber);
    }
  }
}

```





#### local references and view child 

`cockpit.component.html`  and `cockpit.component.ts`



```html

<div class="row">
  <div class="col-xs-12">
    <p>Add new Servers or blueprints!</p>
    <label>Server Name</label>
    <!-- <input type="text" class="form-control" [(ngModel)]="newServerName" /> -->
    <input type="text" class="form-control" #serverNameInput />
    <label>Server Content</label>
    <!-- <input type="text" class="form-control" [(ngModel)]="newServerContent" /> -->
    <input type="text" class="form-control" #serverContentInput />
    <br />
    <button
      class="btn btn-primary"
      (click)="onAddServer(serverNameInput, serverContentInput)"
    >
      Add Server
    </button>
    <button class="btn btn-primary" (click)="onAddBlueprint()">
      Add Server Blueprint
    </button>
  </div>
</div>

```



```typescript


export class CockpitComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  @Output() serverCreated = new EventEmitter<{
    serverName: string;
    serverContent: string;
  }>();

  @Output("bpCreated") blueprintCreated = new EventEmitter<{
    serverName: string;
    serverContent: string;
  }>();

  // use view child
  @ViewChild("serverNameInput", { static: true }) serverNameInput: ElementRef;
  @ViewChild("serverContentInput", { static: true }) serverContentInput: ElementRef;

  onAddServer(
    // use local references
    nameInput: HTMLInputElement,
    serverContentInput: HTMLInputElement
  ) {
    this.serverCreated.emit({
      serverName: nameInput.value,
      serverContent: serverContentInput.value,
    });
  }

  onAddBlueprint() {
    this.blueprintCreated.emit({
      serverName: this.serverNameInput.nativeElement.value,
      serverContent: this.serverContentInput.nativeElement.value,
    });
  }
}

```



#### ng-content

```html

<!-- app.component.html  -->

 <div class="row">
    <div class="col-xs-12">
      <app-server-element
        *ngFor="let serverElement of serverElements"
        [srvElement]="serverElement"
      >
       ------ 
        <p>
          <strong *ngIf="serverElement.type === 'server'" style="color: red">{{
            serverElement.content
          }}</strong>
          <em *ngIf="serverElement.type === 'blueprint'">{{
            serverElement.content
          }}</em>
        </p>
       ------
      </app-server-element>
    </div>
  </div>

```



```html

<!-- server-element.component.html  -->
<div class="panel panel-default">
  <div class="panel-heading">{{ element.name }}</div>
  <div class="panel-body">
    -------
    <ng-content></ng-content>
    -------
  </div>
</div>

```





#### Lifecycle in Angular



<img src="/Users/henrylong/Library/Application Support/typora-user-images/Screen Shot 2021-03-18 at 2.47.31 pm.png" alt="Screen Shot 2021-03-18 at 2.47.31 pm" style="zoom:50%;" />



#### ContentChild

 Document:  `cmp-databinding-start`



## Directives Deep Dive



<img src="/Users/henrylong/Library/Application Support/typora-user-images/Screen Shot 2021-03-19 at 11.57.59 am.png" alt="Screen Shot 2021-03-19 at 11.57.59 am" style="zoom:50%;" />

### ngFor and ngIf Recap



```html

<!-- app.component.html  -->

<div class="container">
  <div class="row">
    <div class="col-xs-12">
      <button class="btn btn-primary" (click)="onlyOdd = !onlyOdd">
        Only show odd numbers
      </button>
      <br /><br />
      <ul class="list-group">
        <div *ngIf="onlyOdd">
          <li class="list-group-item" *ngFor="let oddNumber of oddNumbers">
            {{ oddNumber }}
          </li>
        </div>

        <div *ngIf="!onlyOdd">
          <li class="list-group-item" *ngFor="let evenNumber of evenNumbers">
            {{ evenNumber }}
          </li>
        </div>
      </ul>
    </div>
  </div>
</div>

```



```typescript

// app.component.ts

export class AppComponent {
  numbers = [1, 2, 3, 4, 5];

  oddNumbers = [1, 3, 5];
  evenNumbers = [2, 4];

  onlyOdd = false;
}

```



### ngClass and ngStyle Recap

```html

<ul class="list-group">
        <div *ngIf="onlyOdd">
          <li
            class="list-group-item"
            *ngFor="let oddNumber of oddNumbers"
            [ngClass]="{ odd: oddNumber % 2 !== 0 }"
            [ngStyle]="{
              backgroundColor: odd % 2 !== 0 ? 'yellow' : 'transparent'
            }"
          >
            {{ oddNumber }}
          </li>
        </div>

        <div *ngIf="!onlyOdd">
          <li
            class="list-group-item"
            *ngFor="let evenNumber of evenNumbers"
            [ngClass]="{ odd: evenNumber % 2 !== 0 }"
            [ngStyle]="{
              backgroundColor: evenNumber % 2 !== 0 ? 'yellow' : 'transparent'
            }"
          >
            {{ evenNumber }}
          </li>
        </div>
      </ul>

```



###  Attribute Directive

**Basic Attribute Directive**



1. Create `basic-highlight.directive.ts` under `/app/basic-highlight`



```typescript

import { Directive, ElementRef, OnInit } from "@angular/core";

@Directive({
  selector: "[appBasicHighlight]",
})
export class BasicHightDirective implements OnInit {
  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.elementRef.nativeElement.style.backgroundColor = "green";
  }
}

```



2. bring `BasicHightDirective` to `app.module.ts`

```typescript

@NgModule({
  declarations: [AppComponent, BasicHightDirective],
  imports: [BrowserModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})

```



3. Use `appBasicHighlight` in the `app.component.html`

   

```html

 <p appBasicHighlight>style me with basic directive</p>

```



**Better Attribute Directive**



1. `ng g d better-highlight/better-highlight`

   

2. in the `better-highlight.directive.ts`

```typescript

import { Directive, ElementRef, OnInit, Renderer2 } from "@angular/core";

@Directive({
  selector: "[appBetterHighlight]",
})
export class BetterHighlightDirective implements OnInit {
  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.renderer.setStyle(
      this.elRef.nativeElement,
      "background-color",
      "blue"
    );
  }
}

```



3. Use `appBetterHighlight` in the `app.component.html`

```html

<p appBetterHighlight>style me with bette directive</p>

```



**hover version **

```typescript

export class BetterHighlightDirective {
  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  // ngOnInit() {
  //   this.renderer.setStyle(
  //     this.elRef.nativeElement,
  //     "background-color",
  //     "blue"
  //   );
  // }

  @HostListener("mouseenter") mouseover(eventData: Event) {
    this.renderer.setStyle(
      this.elRef.nativeElement,
      "background-color",
      "blue"
    );
  }

  @HostListener("mouseleave") mouseleave(eventData: Event) {
    this.renderer.setStyle(
      this.elRef.nativeElement,
      "background-color",
      "transparent"
    );
  }
}


```



**Use HostBinding to Bind to Host Properties**

```typescript

export class BetterHighlightDirective {
  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  @HostBinding("style.backgroundColor") backgroundColor: string = "transparent";

  @HostListener("mouseenter") mouseover(eventData: Event) {
    // this.renderer.setStyle(
    //   this.elRef.nativeElement,
    //   "background-color",
    //   "blue"
    // );
    this.backgroundColor = "blue";
  }

  @HostListener("mouseleave") mouseleave(eventData: Event) {
    // this.renderer.setStyle(
    //   this.elRef.nativeElement,
    //   "background-color",
    //   "transparent"
    // );

    this.backgroundColor = "transparent";
  }
}

```



#### Binding to Directive Properties (customize)



```typescript

//better-highlight.directive.ts

export class BetterHighlightDirective implements OnInit {
  @Input() defaultColor: string = "transparent";

  @Input() highlightColor: string = "blue";

  /**********  or  ***********/
  // @Input("appBetterHighlight") highlightColor: string = "blue";

  @HostBinding("style.backgroundColor") backgroundColor: string;

  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.backgroundColor = this.defaultColor;
  }

  @HostListener("mouseenter") mouseover(eventData: Event) {
    this.backgroundColor = this.highlightColor;
  }

  @HostListener("mouseleave") mouseleave(eventData: Event) {
    this.backgroundColor = this.defaultColor;
  }
}

```



```html


 <!--  app.component.html  -->

 <p appBetterHighlight [defaultColor]="'yellow'" [highlightColor]="'red'">
    style me with bette directive
 </p>

 <!-- or -->

 <!-- <p [appBetterHighlight]="'red'" defaultColor="yellow">
      style me with bette directive
 </p> -->


```



### Structure Directives 

`* indicates this is a structure directive`



```html

        <div *ngIf="!onlyOdd">
          <li
            class="list-group-item"
            *ngFor="let evenNumber of evenNumbers"
            [ngClass]="{ odd: evenNumber % 2 !== 0 }"
            [ngStyle]="{
              backgroundColor: evenNumber % 2 !== 0 ? 'yellow' : 'transparent'
            }"
          >
            {{ evenNumber }}
          </li>
        </div>

 			<!-- real code behind the scene -->

        <ng-template [ngIf]="!onlyOdd">
          <div>
            <li
              class="list-group-item"
              *ngFor="let evenNumber of evenNumbers"
              [ngClass]="{ odd: evenNumber % 2 !== 0 }"
              [ngStyle]="{
                backgroundColor: evenNumber % 2 !== 0 ? 'yellow' : 'transparent'
              }"
            >
              {{ evenNumber }}
            </li>
          </div>
        </ng-template>
```



**create an oppossite of `ngIf` directives**



1. `ng g d unless`

2. in the `unless.directive.ts`

```typescript

export class UnlessDirective {
  @Input() set appUnless(condition: boolean) {
    if (!condition) {
      this.vcRef.createEmbeddedView(this.templateRef);
    } else {
      this.vcRef.clear();
    }
  }

  // templateRef: what should be rendered
  // vcRef: view container, where should it be rendered
  constructor(
    private templateRef: TemplateRef<any>,
    private vcRef: ViewContainerRef
  ) {}
}
```



3. in the `app.component.html`

```html


        <div *appUnless="onlyOdd">
          <li
            class="list-group-item"
            *ngFor="let evenNumber of evenNumbers"
            [ngClass]="{ odd: evenNumber % 2 !== 0 }"
            [ngStyle]="{
              backgroundColor: evenNumber % 2 !== 0 ? 'yellow' : 'transparent'
            }"
          >
            {{ evenNumber }}
          </li>
        </div>

```



### ngSwitch



```html

   <div [ngSwitch]="value">
      <p *ngSwitchCase="5">Value is 5</p>
      <p *ngSwitchCase="10">Value is 10</p>
      <p *ngSwitchCase="100">Value is 100</p>
      <p *ngSwitchDefault>Value is Default</p>
  </div>

```





## Module



### Services

<img src="/Users/henrylong/Library/Application Support/typora-user-images/Screen Shot 2021-03-24 at 2.48.52 pm.png" alt="Screen Shot 2021-03-24 at 2.48.52 pm" style="zoom:50%;" />



**Steps to create services**

1. Create service file

```typescript

// logging.service.ts

export class LoggingService {
  logStatusChange(status: string) {
    console.log("A server status changed, new status: " + status);
  }
}


```



2. Use service in the corresponding file

```typescript

// new-account.component.ts

import { Component, EventEmitter, Output } from "@angular/core";

// use service step 1
import { LoggingService } from "../logging.service";

@Component({
  selector: "app-new-account",
  templateUrl: "./new-account.component.html",
  styleUrls: ["./new-account.component.css"],

  // use service step 2
  providers: [LoggingService],
})
export class NewAccountComponent {
  @Output() accountAdded = new EventEmitter<{ name: string; status: string }>();

  // use service step 3
  constructor(private loggingService: LoggingService) {}

  onCreateAccount(accountName: string, accountStatus: string) {
    this.accountAdded.emit({
      name: accountName,
      status: accountStatus,
    });

    // use service step 4
    this.loggingService.logStatusChange(accountStatus);
  }
}

```



**Create a Data Service**



1. create `accounts.service.ts`

```typescript

// accounts.service.ts

export class AccountsService {
  accounts = [
    {
      name: "Master Account",
      status: "active",
    },
    {
      name: "Testaccount",
      status: "inactive",
    },
    {
      name: "Hidden Account",
      status: "unknown",
    },
  ];

  addAccount(name: string, status: string) {
    this.accounts.push({ name: name, status: status });
  }

  updateStatus(id: number, status: string) {
    this.accounts[id].status = status;
  }
}

```



2. import `accounts.service.ts` to `app.component.ts`

   

```typescript

// app.component.ts

import { Component, OnInit } from "@angular/core";
import { AccountsService } from "./account/accounts.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  providers: [AccountsService],
})
export class AppComponent implements OnInit {
  accounts: { name: string; status: string }[] = [];

  constructor(private accountService: AccountsService) {}

  ngOnInit() {
    this.accounts = this.accountService.accounts;
  }
}

```



3. Import `accounts.service.ts`  to  `new-account.component.ts`



```typescript

// new-account.component.ts

import { Component } from "@angular/core";
import { AccountsService } from "../account/accounts.service";

// use service step 1
import { LoggingService } from "../logging.service";

@Component({
  selector: "app-new-account",
  templateUrl: "./new-account.component.html",
  styleUrls: ["./new-account.component.css"],

  // use service step 2
  providers: [LoggingService],
})
export class NewAccountComponent {
  // use service step 3
  constructor(
    private loggingService: LoggingService,
    private accountsService: AccountsService
  ) {}

  onCreateAccount(accountName: string, accountStatus: string) {
    this.accountsService.addAccount(accountName, accountStatus);
    // use service step 4
    this.loggingService.logStatusChange(accountStatus);
  }
}

```



4. Import `accounts.service.ts`  to  `account.component.ts`

```typescript

import { Component, EventEmitter, Input } from "@angular/core";
import { LoggingService } from "../logging.service";
import { AccountsService } from "./accounts.service";

@Component({
  selector: "app-account",
  templateUrl: "./account.component.html",
  styleUrls: ["./account.component.css"],
  providers: [LoggingService],
})
export class AccountComponent {
  @Input() account: { name: string; status: string };
  @Input() id: number;

  constructor(
    private loggingService: LoggingService,
    private accountsService: AccountsService
  ) {}

  onSetTo(status: string) {
    this.accountsService.updateStatus(this.id, status);
    this.loggingService.logStatusChange(status);
  }
}

```



<img src="/Users/henrylong/Library/Application Support/typora-user-images/Screen Shot 2021-03-24 at 4.11.55 pm.png" alt="Screen Shot 2021-03-24 at 4.11.55 pm" style="zoom:50%;" />

**Injecting Services into Services**

1. bring `AccountService` and `LoggingService` to the `app.module.ts`

```typescript

// app.module.ts

@NgModule({
  declarations: [AppComponent, AccountComponent, NewAccountComponent],
  imports: [BrowserModule, FormsModule],
  providers: [AccountsService, LoggingService],
  bootstrap: [AppComponent],
})
export class AppModule {}

```



2. bring the required servers to the target services



```typescript

// account.service.ts 

import { Injectable } from "@angular/core";
import { LoggingService } from "./logging.service";

@Injectable()
export class AccountsService {
  accounts = [
    {
      name: "Master Account",
      status: "active",
    },
    {
      name: "Testaccount",
      status: "inactive",
    },
    {
      name: "Hidden Account",
      status: "unknown",
    },
  ];

  constructor(private loggingService: LoggingService) {}

  addAccount(name: string, status: string) {
    this.accounts.push({ name: name, status: status });
    this.loggingService.logStatusChange(status);
  }

  updateStatus(id: number, status: string) {
    this.accounts[id].status = status;
  }
}

```



**Using Services for Cross-Component Communication**



1. create eventEmitter in the `account.service.ts`

```typescript

// account.service.ts

@Injectable()
export class AccountsService {
  accounts = [
    {
      name: "Master Account",
      status: "active",
    },
    {
      name: "Testaccount",
      status: "inactive",
    },
    {
      name: "Hidden Account",
      status: "unknown",
    },
  ];

  // 1. create eventEmitter 
  statusUpdated = new EventEmitter<string>();

  constructor(private loggingService: LoggingService) {}

  addAccount(name: string, status: string) {
    this.accounts.push({ name: name, status: status });
    this.loggingService.logStatusChange(status);
  }

  updateStatus(id: number, status: string) {
    this.accounts[id].status = status;
  }
}

```



2. emit event in the `account.component.ts`



```typescript

// account.component.ts

@Component({
  selector: "app-account",
  templateUrl: "./account.component.html",
  styleUrls: ["./account.component.css"],
  // providers: [LoggingService],
})
export class AccountComponent {
  @Input() account: { name: string; status: string };
  @Input() id: number;

  constructor(private accountsService: AccountsService) {}

  onSetTo(status: string) {
    this.accountsService.updateStatus(this.id, status);
    // this.loggingService.logStatusChange(status);
    this.accountsService.statusUpdated.emit(status);
  }
}

```



3. subscribe it in the `new-account.component.ts`



```typescript

// new-account.component.ts

@Component({
  selector: "app-new-account",
  templateUrl: "./new-account.component.html",
  styleUrls: ["./new-account.component.css"],

  // use service step 2
  providers: [LoggingService],
})
export class NewAccountComponent {
  // use service step 3
  constructor(
    private loggingService: LoggingService,
    private accountsService: AccountsService
  ) {
    this.accountsService.statusUpdated.subscribe((status: string) =>
      alert("New status: " + status)
    );
  }

  onCreateAccount(accountName: string, accountStatus: string) {
    this.accountsService.addAccount(accountName, accountStatus);
    // use service step 4
    this.loggingService.logStatusChange(accountStatus);
  }
}

```



**Second way to provide the services**

<img src="/Users/henrylong/Library/Application Support/typora-user-images/Screen Shot 2021-03-24 at 5.07.02 pm.png" alt="Screen Shot 2021-03-24 at 5.07.02 pm" style="zoom:80%;" />



**Example 2**

Assignment 



1. Create `users.service.ts`

```typescript


import { Injectable } from "@angular/core";
import { CounterService } from "./counter.service";

@Injectable()

//add this, then no need to bring it to the provides in the app.component.ts
// @Injectable({ providedIn: "root" }) 

export class UsersService {
  activeUsers = ["Max", "Anna"];
  inactiveUsers = ["Chris", "Manu"];

  constructor(private counterService: CounterService) {}

  addToActive(id: number) {
    this.activeUsers.push(this.inactiveUsers[id]);
    this.inactiveUsers.splice(id, 1);
    this.counterService.addToActiveCounter();
  }

  addToInActive(id: number) {
    this.inactiveUsers.push(this.activeUsers[id]);
    this.activeUsers.splice(id, 1);
    this.counterService.addToInactiveCounter();
  }
}

```



2. in the `app.component.ts`, add `providers`



```typescript

import { Component } from "@angular/core";
import { UsersService } from "./users.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  providers: [UsersService],
})
export class AppComponent {}

```



3. in the `active-users.component.ts`, import `UsersService`

```typescript

import { Component, OnInit } from "@angular/core";
import { UsersService } from "../users.service";

@Component({
  selector: "app-active-users",
  templateUrl: "./active-users.component.html",
  styleUrls: ["./active-users.component.css"],
})
export class ActiveUsersComponent implements OnInit {
  users: string[];

  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.users = this.usersService.activeUsers;
  }

  onSetToInactive(id: number) {
    this.usersService.addToInActive(id);
  }
}

```



4. in the `inactive-users.component.ts`, import `UsersServe`

```typescript

import { Component, OnInit } from "@angular/core";
import { UsersService } from "../users.service";

@Component({
  selector: "app-inactive-users",
  templateUrl: "./inactive-users.component.html",
  styleUrls: ["./inactive-users.component.css"],
})
export class InactiveUsersComponent implements OnInit {
  users: string[];

  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.users = this.usersService.inactiveUsers;
  }

  onSetToActive(id: number) {
    this.usersService.addToActive(id);
  }
}

```



**Injectable**

1. create `counter.service.ts`

```typescript

// add this, then no need to bring it to the app.module.ts

@Injectable({ providedIn: "root" })
export class CounterService {
  activeCounter: number = 0;
  inactiveCounter: number = 0;

  addToActiveCounter() {
    this.activeCounter++;
    console.log("inactive to Active", this.activeCounter);
  }

  addToInactiveCounter() {
    this.inactiveCounter++;
    console.log("Active to inactive", this.inactiveCounter);
  }
}

```

2. bring it to `users.service.ts`, see the first code snipper.



## Routing



### set up routes

1. In the `app.module.ts`

```typescript

const appRoutes: Routes = [
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
      this.user.id = params.id;
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



























