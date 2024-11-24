import { Component } from '@angular/core';
import { LibroComponent } from '../libro/libro.component';  // Asegúrate de importar LibroComponent

@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [LibroComponent],  // Asegúrate de añadir LibroComponent en el imports
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent {
  title = 'biblioteca_UI';
  libros = []; // Aquí deberías llenar con los libros de tu API
}
