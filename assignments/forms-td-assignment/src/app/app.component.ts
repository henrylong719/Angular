import { Component, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
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
