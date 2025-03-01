import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  private videoSource = new Subject<string>();
  videoUrl$ = this.videoSource.asObservable();

  setVideoUrl(url: string) {
    this.videoSource.next(url);
  }
}