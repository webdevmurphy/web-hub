import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Photo } from '../../../models/photo.model';
import { AuthService } from '../../../services/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../../../models/user';
import { GalleryItem, ImageItem } from 'ng-gallery';
import { getDownloadURL } from 'firebase/storage';




@Component({
  selector: 'app-carousel-large',
  templateUrl: './carousel-large.component.html',
  styleUrls: ['./carousel-large.component.scss']
})
export class CarouselLargeComponent implements OnInit {

  public images: Photo[];
 
  public pictures: GalleryItem[];
  private isLoggedIn: boolean = false;

  user: User;
  customOptions;
  constructor(private auth: AuthService, private afs: AngularFirestore) { }

  ngOnInit() {
    this.auth.user$.subscribe(user => this.user = user);
    this.auth.user$.subscribe(user => {
      if (user) {
        this.isLoggedIn = true;

        this.afs.collection('photos', ref => ref.where('user.uid', '==', user.uid))
        .valueChanges().pipe(
          map(res => res.map( imgResult => new Photo(imgResult) ))
        ).subscribe(res => this.images = res)
        
        this.afs.collection('photos', ref => ref.where('user.uid', '==', user.uid))
        .valueChanges().pipe(
          map(res => res.map( imgResult => new ImageItem(imgResult))) 
        ).subscribe(res => this.pictures = res)
  

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
