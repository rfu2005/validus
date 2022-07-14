import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Album } from 'src/app/models/album';
import { AlbumService } from 'src/app/services/album.service';
import { getClass } from '../../shared/util';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlbumComponent implements OnDestroy {
  album$: Observable<Album[]> = this.albumService.items$ as Observable<Album[]>;
  paginataion$ = this.albumService.pagination$;
  sort$ = this.albumService.sort$;

  constructor(private albumService: AlbumService) {}

  changePage(page: number) {
    this.albumService.changePage(page);
  }

  changeSortOrder(column: string) {
    this.albumService.changeSortOrder(column);
  }

  getClass = getClass;

  ngOnDestroy(): void {
    this.albumService.reset();
  }
}
