import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';

import {MatGridListModule} from '@angular/material/grid-list';

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

import {MatExpansionModule} from '@angular/material/expansion';
import { GameBoardComponent } from './components/game-board/game-board.component';
import { GameCardComponent } from './components/game-card/game-card.component';
import { GameRestartDialogComponent } from './components/game-restart-dialog/game-restart-dialog.component';
import { UserStatusComponent } from './components/user-status/user-status.component';
import { UploadFormComponent } from './components/upload-form/upload-form.component';
import { UploadListComponent } from './components/upload-list/upload-list.component';
import { UploadDetailsComponent } from './components/upload-details/upload-details.component';
import { UploadDialogComponent } from './components/upload-dialog/upload-dialog.component';


  


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
    ViewVideoComponent,
    GameBoardComponent,
    GameCardComponent,
    GameRestartDialogComponent,
    UserStatusComponent, 
    UploadFormComponent,
    UploadListComponent,
    UploadDetailsComponent,
    UploadDialogComponent
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
    MatExpansionModule,
    MatGridListModule,
    HttpClientModule,
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
