import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface Position {
    left: number;
    top: number;
    width: number;
    height: number;
}


@Injectable({
  providedIn: 'root'
})
export class VideoService {

    private isRecording = false;

    private streamSource = new Subject<MediaStream | null>();
    stream$ = this.streamSource.asObservable();

    setStream(stream: MediaStream | null) {
        this.streamSource.next(stream);
		this.isRecording = !!stream;
    }

    private positionSource = new Subject<Position>();
    position$ = this.positionSource.asObservable();

    setPosition(position: Position) {
        if (!this.isRecording) {
			this.positionSource.next(position);
		}
    }

}