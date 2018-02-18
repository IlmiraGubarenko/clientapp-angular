import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

// Services
import { ClientService } from '../../services/client.service';
import { SettingsService } from '../../services/settings.service';

// Model
import { Client } from '../../models/Client';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {

  client: Client;
  id: string;
  hasBalance = false;
  showBalanceUpdateInput = false;
  disabledBalanceOnEdit: boolean;
  currentRouteId: string;


  constructor(
    public clientService: ClientService,
    public settingsService: SettingsService,
    public route: ActivatedRoute,
    public router: Router,
    public flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    this.currentRouteId = this.route.snapshot.params.id;
    this.clientService.getClient(this.currentRouteId).subscribe( client => {
      if (client) {
        if (client.balance > 0) {
          this.hasBalance = true;
        }
        this.client = client;
      }
    });
    this.disabledBalanceOnEdit = this.settingsService.getSettings().disableBalanceOnEdit;
  }

  updateBalance() {
    this.clientService.updateClient(this.client);
    this.flashMessage.show('Balance updated', {
      timeout: 4000,
      cssClass: 'alert-success'
    });
    this.showBalanceUpdateInput = false;
  }

  removeClient(client: Client) {

    if (confirm('Are you sure?')) {
      // Delete client
      this.clientService.deleteClient(client);
      // Show message success
      this.flashMessage.show('Client removed', {
        timeout: 4000,
        cssClass: 'alert-success'
      });
      // Redirect
      this.router.navigate(['/']);
    }

  }

}
