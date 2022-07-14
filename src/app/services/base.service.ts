import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  switchMap,
  map,
  tap,
  debounceTime,
  catchError,
  of,
} from 'rxjs';

import { environment } from '../../environments/environment';
const BASE_PATH = environment.basePath;

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  ORIGINAL_SORT_COLUMN = 'name';
  ORIGINAL_SORT_ORDER = 'asc';
  private pageSubject: BehaviorSubject<number> = new BehaviorSubject(1);
  private sortSubject: BehaviorSubject<string> = new BehaviorSubject(
    this.ORIGINAL_SORT_COLUMN
  );
  private orderSubject: BehaviorSubject<string> = new BehaviorSubject(
    this.ORIGINAL_SORT_ORDER
  );
  private totalCountSubject: BehaviorSubject<number> = new BehaviorSubject(0);

  type: string = '';

  constructor(private http: HttpClient) {}

  items$ = combineLatest([
    this.pageSubject,
    this.sortSubject,
    this.orderSubject,
  ]).pipe(
    debounceTime(50), // to prevent unnecessary API calls. For example, when both changing the page and sorting happens, it might call API twice.
    switchMap((values) =>
      this.http.get(
        `${BASE_PATH}/${this.type}?_page=${values[0]}&_limit=10&_sort=${values[1]}&_order=${values[2]}`,
        { observe: 'response' }
      )
    ),
    tap((response) => {
      const total = response.headers?.get('x-total-count');
      this.totalCountSubject.next(total ? +total : 0);
    }),
    map((response) => response.body!),
    catchError((error) => {
      console.log(error); // This will console log the error, but won't show the message on the web page.
      return of([]);
    })
  );

  pagination$ = combineLatest([this.pageSubject, this.totalCountSubject]);

  sort$ = combineLatest([this.sortSubject, this.orderSubject]);

  changePage(newPage: number) {
    this.pageSubject.next(newPage);
  }

  changeSortOrder(column: string) {
    const currentSortedColumn = this.sortSubject.value;
    const currentOrder = this.orderSubject.value;
    const currentPage = this.pageSubject.value;
    if (currentSortedColumn === column) {
      const ord = currentOrder === 'asc' ? 'desc' : 'asc';
      this.orderSubject.next(ord);
    } else {
      this.sortSubject.next(column);
      if (currentOrder === 'desc') {
        this.orderSubject.next('asc');
      }
    }

    if (currentPage !== 1) {
      this.pageSubject.next(1);
    }
  }

  reset() {
    this.sortSubject.next(this.ORIGINAL_SORT_COLUMN);
    this.orderSubject.next(this.ORIGINAL_SORT_ORDER);
    this.pageSubject.next(1);
  }
}
