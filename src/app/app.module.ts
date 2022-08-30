import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';


import { environment } from '../environments/environment';
import { AngularFireModule} from '@angular/fire/compat';
import { AngularFirestoreModule} from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { CarouselComponent } from './components/carousel/carousel.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { MainComponent } from './components/main/main.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { MessagesComponent } from './components/messages/messages.component';

import {MatDialogModule} from '@angular/material/dialog';
import {BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatListModule} from '@angular/material/list';
import { CarouselLargeComponent } from './components/carousel-large/carousel-large.component';
import { CreateProfileComponent } from './components/create-profile/create-profile.component';
import { ReactiveFormsModule } from '@angular/forms'
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import { GalleryModule } from  'ng-gallery';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { ViewProfileComponent } from './components/view-profile/view-profile.component';
import { GALLERY_CONFIG } from 'ng-gallery';
import { BlogComponent } from './components/blog/blog.component';
import { GuitarComponent } from './components/guitar/guitar.component';
import { AboutComponent } from './components/about/about.component';
import { GuitarCardComponent } from './components/guitar-card/guitar-card.component';
import { GuitarListComponent } from './components/guitar-list/guitar-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ViewFilesComponent } from './components/view-files/view-files.component';
import { ViewVideoComponent } from './components/view-video/view-video.component';





@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    CarouselComponent,
    FileUploadComponent,
    MainComponent,
    GalleryComponent,
    MessagesComponent,
    CarouselLargeComponent,
    CreateProfileComponent,
    ViewProfileComponent,
    BlogComponent,
    GuitarComponent,
    AboutComponent,
    GuitarCardComponent,
    GuitarListComponent,
    ViewFilesComponent,
    ViewVideoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatDialog,
    GalleryModule,
    ScrollingModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    MatCardModule,
    MatListModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatRadioModule

  ],
  providers: [
    {
      provide: GALLERY_CONFIG,
      useValue: {
        dots:true,
        imageSize: 'contain'
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
