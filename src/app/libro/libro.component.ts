import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-libro',
  standalone: true,
  templateUrl: './libro.component.html',
  styleUrls: ['./libro.component.css']
})
export class LibroComponent {
  @Input() libro: any;
}

