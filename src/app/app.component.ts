import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'qvabrovi';
	colors = [
		'#FF5733', '#33FF57', '#3357FF', '#F033FF',
		'#FF3333', '#33FFF3', '#FF33F3', '#33FF33',
		'#3333FF', '#FFFF33', '#FF3366', '#33FFFF'
	];
}
