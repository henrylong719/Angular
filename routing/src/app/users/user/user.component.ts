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
