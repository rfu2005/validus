import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})

export class SongService  extends BaseService{
  override type = 'songs';
}
