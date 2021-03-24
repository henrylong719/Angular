import { Component } from "@angular/core";
import { AccountsService } from "../accounts.service";

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
