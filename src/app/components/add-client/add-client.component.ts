import { Component, OnInit, ViewChild } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';

// Services
import { ClientService } from '../../services/client.service';

// Models
import { Client } from '../../models/Client';

import { Router } from '@angular/router';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {

  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  };

  disabledBalanceOnAdd: boolean = true;

  // дает возможность использовать локальную переменную clientForm из разметки в компоненте
  @ViewChild('clientForm') form: any;

  constructor(
    public clientService: ClientService,
    public flashMessage: FlashMessagesService,
    public router: Router
  ) { }

  ngOnInit() {

  }

  onSubmit() {

    if (!this.form.valid) {
      this.flashMessage.show('Please enter form', {
        timeout: 4000,
        cssClass: 'alert-danger'
      });
    } else {
      // Add new client
      this.clientService.newClient(this.client);
      // Show message success
      this.flashMessage.show('New client add success', {
        timeout: 4000,
        cssClass: 'alert-success'
      });
      // Redirect
      this.router.navigate(['/']);
    }

  }

}
