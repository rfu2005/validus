import { Component, OnInit } from '@angular/core';
import { AlbumService } from './services/album.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'music';

  constructor(private albumService: AlbumService){}
  ngOnInit(): void {
  //  this.albumService.albums$.subscribe();
  }

}
