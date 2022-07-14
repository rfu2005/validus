import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Artist } from 'src/app/models/artist';
import { ArtistService } from 'src/app/services/artist.service';
import { getClass } from '../../shared/util';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArtistComponent implements OnDestroy {
  artists$: Observable<Artist[]> = this.artistService.items$ as Observable<
    Artist[]
  >;
  paginataion$ = this.artistService.pagination$;
  sort$ = this.artistService.sort$;

  constructor(private artistService: ArtistService) {}

  changePage(page: number) {
    this.artistService.changePage(page);
  }

  changeSortOrder(column: string) {
    this.artistService.changeSortOrder(column);
  }

  getClass = getClass;

  ngOnDestroy(): void {
    this.artistService.reset();
  }
}
