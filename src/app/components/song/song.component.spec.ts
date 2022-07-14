import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { of } from 'rxjs';
import { SongService } from 'src/app/services/song.service';

import { SongComponent } from './song.component';

describe('SongComponent', () => {
  let component: SongComponent;
  let fixture: ComponentFixture<SongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SongComponent],
      imports: [HttpClientTestingModule, PaginationModule],
      providers: [
        {
          provide: SongService,
          useClass: MockSongService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show 10 records and the pagination', () => {
    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelectorAll('.details').length).toEqual(10);
    expect(element.querySelectorAll('.page-item').length).toEqual(14);
  });
});

class MockSongService {
  pagination$ = of([1, 93]);
  // pagination$ = of([93, 1]);
  items$ = of([
    {
      album_id: 4,
      track: 2,
      id: 31,
      name: '(Drill Sargeant)',
    },
    {
      album_id: 4,
      track: 7,
      id: 36,
      name: '(JFK)',
    },
    {
      album_id: 6,
      track: 5,
      id: 56,
      name: '(Waiting for the) Night Boat',
    },
    {
      album_id: 1,
      track: 1,
      id: 1,
      name: '1984',
    },
    {
      album_id: 5,
      track: 5,
      id: 46,
      name: 'A Dustland Fairytale',
    },
    {
      album_id: 4,
      track: 10,
      id: 39,
      name: 'Aftermath',
    },
    {
      album_id: 3,
      track: 5,
      id: 23,
      name: "All These Things That I've Done",
    },
    {
      album_id: 2,
      track: 1,
      id: 10,
      name: 'And the Cradle Will Rock',
    },
    {
      album_id: 3,
      track: 6,
      id: 24,
      name: "Andy, You're a Star",
    },
    {
      album_id: 10,
      track: 7,
      id: 91,
      name: 'Any Colour You Like',
    },
  ]);

  sort$ = of(['name', 'asc']);

  reset = () => {};

  changeSortOrder = () => {};

  changePage = () => {};

  type = 'songs';
}
