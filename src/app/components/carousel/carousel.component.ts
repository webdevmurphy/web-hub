import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Photo } from '../../../models/photo.model';
import { AuthService } from '../../../services/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../../../models/user';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  public images: Photo[];
  private isLoggedIn: boolean = false;

  user: User;

  constructor(private auth: AuthService, private afs: AngularFirestore) { }

  ngOnInit() {
    this.auth.user$.subscribe(user => this.user = user);
    this.auth.user$.subscribe(user => {
      if (user) {
        this.isLoggedIn = true;

        this.afs.collection('photos')
        .valueChanges().pipe(
          map(res => res.map( imgResult => new Photo(imgResult) ))
        ).subscribe(res => this.images = res);
      } else {
        this.isLoggedIn = false;

        this.afs.collection('photos')
        .valueChanges().pipe(
          map(res => res.map( imgResult => new Photo(imgResult) ))
        ).subscribe(res => this.images = res);
      }
    });

  


  }



}
