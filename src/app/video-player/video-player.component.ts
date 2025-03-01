import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { VideoService } from '../video.service';

@Component({
    selector: 'app-video-player',
    templateUrl: './video-player.component.html',
    styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent {
    @Input() width = 320;
    @Input() height = 240;
    @Input() left = 0;
    @Input() top = 0;
    @ViewChild('videoPlayer') videoPlayer!: ElementRef;

	constructor(private videoService: VideoService) {
	  this.videoService.videoUrl$.subscribe(url => {
		this.videoPlayer.nativeElement.src = url;
	  });
	}

}