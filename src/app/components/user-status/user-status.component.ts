import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-user-status',
  templateUrl: './user-status.component.html',
  styleUrls: ['./user-status.component.scss']
})
export class UserStatusComponent implements OnInit {

  @Input() uid;

  presence$;

  constructor(private presence: AuthService) { }

  ngOnInit(){
    this.presence$ = this.presence.getPresence(this.uid);
  }

}
