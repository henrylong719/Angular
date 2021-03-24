import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  displaySecret = false;

  logItems =[]


  toggleSecret (){

    this.displaySecret = !this.displaySecret;

    // this.logItems.push(this.logItems.length +1)

    this.logItems.push(new Date());
  }
}
