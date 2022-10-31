import { Component } from '@angular/core';
import { Auth } from 'firebase/auth';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'web-hub';
constructor(public presence: AuthService){}

}
