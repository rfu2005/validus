import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Song } from 'src/app/models/song';
import { SongService } from 'src/app/services/song.service';
import { getClass } from 'src/app/shared/util';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SongComponent implements OnDestroy {
  songs$: Observable<Song[]> = this.songService.items$ as Observable<Song[]>;
  pagination$ = this.songService.pagination$;
  sort$ = this.songService.sort$;

  constructor(private songService: SongService) {}

  changePage(page: number) {
    this.songService.changePage(page);
  }

  changeSortOrder(column: string) {
    this.songService.changeSortOrder(column);
  }

  getClass = getClass;

  ngOnDestroy(): void {
    this.songService.reset();
  }
}
