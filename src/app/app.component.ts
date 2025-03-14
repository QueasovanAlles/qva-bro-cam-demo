import { Component, ViewChild, ElementRef, HostListener } from '@angular/core';
import { VideoService } from 'qva-bro-cam-lib';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
    @ViewChild('gridVideo') gridVideo!: ElementRef<HTMLVideoElement>;
    title = 'qvabrovi';
    colors = [
		'#FF5733', '#334457', '#3357FF', '#F033FF',
		'#FF3333', '#33FFF3', '#FF33F3', '#33FF33',
		'#3333FF', '#FFFF33', '#FF3366', '#33FFFF'
	];
	startPlay() {
		this.gridVideo.nativeElement.play();
	}

	constructor(private videoService: VideoService) {}

	@HostListener('click', ['$event'])
	onClick(event: MouseEvent) {
		const target = event.target as HTMLElement;
		
		if (!target.classList.contains('brovi-video-target')) {
			return;
		}
		
		const rect = target.getBoundingClientRect();
		console.log('Clicked element:', {
			element: target,
			position: {
				left: rect.left+1,
				top: rect.top+1,
				width: rect.width-2,
				height: rect.height-2
			}
		});

		this.videoService.setPosition({
			left: rect.left,
			top: rect.top,
			width: rect.width,
			height: rect.height
		});
		
	}
}
