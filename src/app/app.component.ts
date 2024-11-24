import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AutenticacionService } from './autenticacion.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'biblioteca_UI';
}