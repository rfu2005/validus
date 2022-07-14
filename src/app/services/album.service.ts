import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})

export class AlbumService  extends BaseService{
  override type = 'albums';
}
