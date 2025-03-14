import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { VideoService } from '../video.service';

@Component({
    selector: 'app-video-player',
    templateUrl: './video-player.component.html',
    styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent {
    @Input() scaleToParent = false;
    @Input() width = 320;
    @Input() height = 240;
    @Input() left = 0;
    @Input() top = 0;
    @ViewChild('videoPlayer') videoPlayer!: ElementRef;

	constructor(private videoService: VideoService, private elementRef: ElementRef) {
		this.videoService.stream$.subscribe(stream => {
			this.videoPlayer.nativeElement.srcObject = stream;
		});        
	}

	ngAfterViewInit() {
		setTimeout(()=>{
        if (this.scaleToParent) {
            const parent = this.elementRef.nativeElement.parentElement;
            const rect = parent.getBoundingClientRect();
            this.width = rect.width-12;
            this.height = rect.height-12;
            this.left = rect.left+1;
            this.top = rect.top+1;
        }},10);
	}

}