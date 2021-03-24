import { Component, OnInit } from '@angular/core';

@Component({
  // selector: '[app-servers]',
  // selector: '.app-servers',
  selector : 'app-servers',
  templateUrl: './servers.component.html' ,
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {

  allowNewServer: boolean = true;

  serverCreationStatus: string = 'No serve was created'

  serverName: string = ''

  serverCreated = false

  servers = ['Test server', 'Test server 2'];

  constructor() { 
    setTimeout(() => {
      this.allowNewServer = false
    }, 2000);
  }

  ngOnInit(): void {
  }

  onCreateServer(){
    this.serverCreated = true,
    this.servers.push(this.serverName)
    this.serverCreationStatus = 'server created and the name is ' + this.serverName
  }

  onUpdateServerName(event: Event){

    this.serverName = (<HTMLInputElement>event.target).value
  }

}
