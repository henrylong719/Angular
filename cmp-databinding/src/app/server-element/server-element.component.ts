import {
  Component,
  OnInit,
  Input,
  ViewEncapsulation,
  SimpleChanges,
  OnChanges,
  DoCheck,
  AfterContentInit,
  OnDestroy,
  AfterViewChecked,
  AfterViewInit,
  ViewChild,
  ElementRef,
  ContentChild,
} from "@angular/core";

@Component({
  selector: "app-server-element",
  templateUrl: "./server-element.component.html",
  styleUrls: ["./server-element.component.css"],
  // encapsulation: ViewEncapsulation.None,
  encapsulation: ViewEncapsulation.Emulated,
})
export class ServerElementComponent
  implements
    OnInit,
    OnChanges,
    DoCheck,
    AfterContentInit,
    AfterViewChecked,
    AfterViewInit,
    OnDestroy {
  //  @Input("srvElement"): expose an alias to outer component
  @Input("srvElement") element: { type: string; name: string; content: string };
  @Input() name: string;

  @ViewChild("heading", { static: true }) header: ElementRef;

  @ContentChild("contentParagraph", { static: true }) paragraph: ElementRef;

  constructor() {
    console.log("constructor called");
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("ngOnChanges called !");

    console.log(changes);
  }

  ngOnInit() {
    console.log("ngOnInit called");
    console.log("header" + this.header.nativeElement.textContent);
    console.log("content paragraph" + this.paragraph.nativeElement.textContent);
  }

  ngDoCheck() {
    console.log("ngDoCheck called");
  }

  ngAfterContentInit() {
    console.log("ngAfterContentInit called");
    console.log(
      "content paragraph    " + this.paragraph.nativeElement.textContent
    );
  }

  ngAfterContentChecked() {
    console.log("ngAfterContentInit called");
  }

  ngAfterViewInit() {
    console.log("ngAfterViewInit called");
    console.log("header   " + this.header.nativeElement.textContent);
  }

  ngAfterViewChecked() {
    console.log("ngAfterViewInit called");
  }

  ngOnDestroy() {
    console.log("ngOnDestroy called");
  }
}
