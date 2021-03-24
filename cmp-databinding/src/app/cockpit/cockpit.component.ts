import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  ViewChild,
  ElementRef,
} from "@angular/core";

@Component({
  selector: "app-cockpit",
  templateUrl: "./cockpit.component.html",
  styleUrls: ["./cockpit.component.css"],
})
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
  @ViewChild("serverContentInput", { static: true })
  serverContentInput: ElementRef;

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
