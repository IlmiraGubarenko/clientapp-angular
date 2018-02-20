import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

// Services
import { ClientService } from '../../services/client.service';

// Models
import { Client } from '../../models/Client';
import { Settings } from '../../models/Settings';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})

export class EditClientComponent implements OnInit {

  client: Client = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  };
  currentRouteId: string;
  settings: Settings;

  constructor(
    public clientService: ClientService,
    public route: ActivatedRoute,
    public router: Router,
    public flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    this.currentRouteId = this.route.snapshot.params.id;
    this.clientService.getClient(this.currentRouteId).subscribe( client => {
      if (client) {
        this.client = client;
      }
    });
  }

  onSubmit() {
    this.clientService.updateClient(this.client);
    this.flashMessage.show('Client edit success', {
      timeout: 4000,
      cssClass: 'alert-success'
    });
    this.router.navigate(['/client/' + this.currentRouteId]);
  }

}
