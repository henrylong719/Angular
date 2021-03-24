import { Injectable } from "@angular/core";

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
