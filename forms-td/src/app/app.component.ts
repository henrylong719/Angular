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
