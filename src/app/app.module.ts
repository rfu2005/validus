import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from "@angular/router";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArtistComponent } from './components/artist/artist.component';
import { AlbumComponent } from './components/album/album.component';
import { SongComponent } from './components/song/song.component';

import { InterceptorService } from "./services/interceptor.service";
import { PaginationModule } from "ngx-bootstrap/pagination";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  { path: 'artists', component: ArtistComponent },
  { path: 'songs', component: SongComponent },
  { path: 'albums', component: AlbumComponent },
  { path: '**', redirectTo: 'songs', pathMatch: 'full' },
]

@NgModule({
  declarations: [
    AppComponent,
    ArtistComponent,
    AlbumComponent,
    SongComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    PaginationModule.forRoot(),
    NgbModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
