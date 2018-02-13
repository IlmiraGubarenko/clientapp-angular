import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

// Service
import { ClientService } from '../../services/client.service';

// Model
import { Client } from '../../models/Client';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {

  client: Client;

  currentRouteId: string;

  constructor(
    public clientService: ClientService,
    public route: ActivatedRoute,
    public router: Router,
    public flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    this.currentRouteId = this.route.snapshot.params.id;
    this.clientService.getClient(this.currentRouteId).subscribe( client => {
      this.client = client;
    }, error => {
      console.log(error);
    });
  }

  removeClient(client: Client) {
    // Delete client
    this.clientService.deleteClient(client);
    // Show message success
    this.flashMessage.show('Client delete success', {
      timeout: 4000,
      cssClass: 'alert-success'
    });
    // Redirect
    this.router.navigate(['/']);
  }

}
