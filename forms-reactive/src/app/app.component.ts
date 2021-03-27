import { Component, OnInit } from "@angular/core";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
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

  // 2. add corresponding method
  forbiddenNames(control: FormControl): { [s: string]: boolean } {
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return { nameIsForbidden: true };
    }
    return null;
  }

  onSubmit() {
    console.log("tes");
    console.log(this.signupForm);

    this.signupForm.reset();
  }

  getControls() {
    return (<FormArray>this.signupForm.get("hobbies")).controls;
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get("hobbies")).push(control);
  }

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
}
