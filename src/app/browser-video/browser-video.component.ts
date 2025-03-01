import { Component, AfterViewInit, ElementRef, ViewChild, Input } from '@angular/core';
import { VideoService } from '../video.service';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-browser-video',
  templateUrl: './browser-video.component.html',
  styleUrls: ['./browser-video.component.scss']
})
export class BrowserVideoComponent {

constructor(private videoService: VideoService) {}



    @ViewChild('videoPlayer') video!: ElementRef;
    @ViewChild('startButton') startButton!: ElementRef;
    @ViewChild('camPanel') camPanel!: ElementRef;
    @ViewChild('canvas') canvas!: ElementRef;
    @ViewChild('resizeHandle') resizeHandle!: ElementRef;

    @Input() width = 320;
    @Input() height = 240;
    @Input() left = 0;
    @Input() top = 0;

	private isDragging = false;
	private isResizing = false;
	private currentX = 0;
	private currentY = 0;
	private initialX = 0;
	private initialY = 0;
	private initialWidth = 0;
	private initialHeight = 0;
    selectedRatio = 'panel';  // Add this property to your component 


    private mediaRecorder: MediaRecorder | undefined;
    private recordedChunks: BlobPart[] = [];

    isRecording = false;
  
	ngAfterViewInit() {
		this.setupCamControls();
	}

	private isCapturing = false;

	private async captureDiv() {
		const canvas = document.createElement('canvas');
		const cam = this.camPanel.nativeElement;
		const rect = cam.getBoundingClientRect();
		
		canvas.width = rect.width;
		canvas.height = rect.height;	

		const ctx = canvas.getContext('2d');
		const stream = canvas.captureStream(30);
		this.isCapturing = true;
		
		const drawFrame = async () => {
			if (!this.isCapturing) return;
			
			ctx?.clearRect(0, 0, rect.width, rect.height);
			const screenshot = await html2canvas(document.body, {
				x: rect.left,
				y: rect.top,
				width: rect.width,
				height: rect.height,
				backgroundColor: null
			});
			ctx?.drawImage(screenshot, 0, 0, rect.width, rect.height);
			requestAnimationFrame(drawFrame);
		};
		drawFrame();
		
		return stream;
	}

	stopRecording() {
		if (this.mediaRecorder) {
			this.isCapturing = false;
			this.isRecording = false;
			this.mediaRecorder.stop();
			const tracks = this.mediaRecorder.stream.getTracks();
			tracks.forEach((track: MediaStreamTrack) => track.stop());
		}
	}

	onRatioChange() {

		const panel = this.camPanel.nativeElement;
		const currentWidth = panel.offsetWidth;
		const currentHeight = panel.offsetHeight;
		
		if (this.selectedRatio === 'panel') {
			// Keep the larger dimension and make it square
			const size = Math.max(currentWidth, currentHeight);
			panel.style.width = `${size}px`;
			panel.style.height = `${size}px`;
			return;
		}

		const [width, height] = this.selectedRatio.split(':').map(Number);
		
		// Use current width as base and calculate new height
		const newHeight = (currentWidth * height) / width;
		panel.style.height = `${newHeight}px`;
	}

	async startRecording() {

		this.isRecording = true;
		this.recordedChunks = [];

		const stream = await this.captureDiv();
		this.mediaRecorder = new MediaRecorder(stream);

		this.mediaRecorder.ondataavailable = (event) => {
			if (event.data.size > 0) {
				this.recordedChunks.push(event.data);
			}
		};

		this.mediaRecorder.onstop = () => {
			const blob = new Blob(this.recordedChunks, { type: 'video/webm' });
			this.videoService.setVideoUrl(URL.createObjectURL(blob));
			//const blob = new Blob(this.recordedChunks, { type: 'video/webm' });
			//this.video.nativeElement.src = URL.createObjectURL(blob);
		};

		this.mediaRecorder.start();
	}



	setupCamControls() {
		const cam = this.camPanel.nativeElement;
		const handle = this.resizeHandle.nativeElement;

		cam.addEventListener('mousedown', (e: MouseEvent) => {
			this.isDragging = true;
			this.initialX = e.clientX - this.currentX;
			this.initialY = e.clientY - this.currentY;
		});

		handle.addEventListener('mousedown', (e: MouseEvent) => {
			e.preventDefault();
			e.stopPropagation();
			this.isResizing = true;
			this.initialWidth = cam.offsetWidth;
			this.initialHeight = cam.offsetHeight;
			this.initialX = e.clientX;
			this.initialY = e.clientY;
		});

		window.addEventListener('mousemove', (e: MouseEvent) => {
			if (this.isDragging) {
				e.preventDefault();
				this.currentX = e.clientX - this.initialX;
				this.currentY = e.clientY - this.initialY;
				cam.style.left = `${this.currentX}px`;
				cam.style.top = `${this.currentY}px`;
			}
			if (this.isResizing) {
                this.selectedRatio = 'panel';
				const deltaX = e.clientX - this.initialX;
				const deltaY = e.clientY - this.initialY;
				cam.style.width = `${this.initialWidth + deltaX}px`;
				cam.style.height = `${this.initialHeight + deltaY}px`;
			}
		});

		window.addEventListener('mouseup', () => {
			this.isDragging = false;
			this.isResizing = false;
		});
	}

}