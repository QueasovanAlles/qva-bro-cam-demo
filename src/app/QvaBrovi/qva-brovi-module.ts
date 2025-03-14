import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserCaptureComponent } from './browser-capture/browser-capture.component';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { VideoService } from './video.service';

@NgModule({
    declarations: [
        BrowserCaptureComponent,
        VideoPlayerComponent
    ],
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [
        BrowserCaptureComponent,
        VideoPlayerComponent
    ],
    providers: [VideoService]
})
export class QvaBroviModule { }