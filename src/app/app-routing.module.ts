import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarouselComponent } from './components/carousel/carousel.component';
import { MainComponent } from './components/main/main.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { MessagesComponent } from './components/messages/messages.component';
import { CarouselLargeComponent } from './components/carousel-large/carousel-large.component';
import { CreateProfileComponent } from './components/create-profile/create-profile.component';
import { ViewProfileComponent } from './components/view-profile/view-profile.component';
import { AuthGuard } from 'src/services/auth.guard';
import { BlogComponent } from './components/blog/blog.component';

const routes: Routes = [
  {path: '', redirectTo: 'main', pathMatch:'full'},
  {path: 'main', component: MainComponent},
  {path: 'carousel-lg', component: CarouselLargeComponent, canActivate: [AuthGuard]},
  {path: 'gallery', component: GalleryComponent, canActivate: [AuthGuard]},
  {path: 'mssg', component: MessagesComponent, canActivate: [AuthGuard]},
  {path: 'profile', component: CreateProfileComponent, canActivate: [AuthGuard]},
  {path: 'view-profile', component: ViewProfileComponent, canActivate: [AuthGuard]},
  {path: 'blog', component: BlogComponent},
  {path: '**', redirectTo: 'main'}
 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
