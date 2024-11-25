import { Component, OnInit, ElementRef } from '@angular/core';
import { ReservasService } from '../services/reservas.service';
import { Router } from '@angular/router';
import { AutenticacionService } from '../services/autenticacion.service';
import { DatePipe } from '@angular/common'; 

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css'],
  providers: [DatePipe] 
})
export class ReservasComponent implements OnInit {
  reservas: any[] = [];  // Aquí se almacenarán las reservas
  showDropdown: boolean = false; // Controla la visibilidad del menú desplegable

  constructor(
    private reservaService: ReservasService,
    private router: Router,
    private autenticacionService: AutenticacionService, 
    private datePipe: DatePipe,
    private el: ElementRef  // Para manipulación del DOM si es necesario
  ) {}

  ngOnInit(): void {
    this.verificarUsuario();  // Verifica si el usuario está autenticado
    this.obtenerReservas();    // Llama al servicio para obtener las reservas cuando el componente se carga
  }

  // Método para formatear la fecha
  formatearFecha(fecha: string): string {
    return this.datePipe.transform(fecha, 'dd/MM/yyyy HH:mm') || '';  // Formato de fecha deseado
  }

  // Método para verificar si el usuario está autenticado
  verificarUsuario() {
    if (!this.autenticacionService.isAuthenticated()) {
      this.router.navigate(['/login']);  // Redirige al login si no está autenticado
    }
  }

  // Método para obtener las reservas del usuario (GET)
  obtenerReservas() {
    this.reservaService.obtenerReservas().subscribe((reservas: any[]) => {
      this.reservas = reservas;  // Asigna las reservas obtenidas al array de reservas
      this.renderizarReservas();  // Llama al método para renderizar las reservas
    }, (error: any) => {
      console.error('Error al obtener las reservas:', error);
    });
  }

  // Método para renderizar las reservas sin usar *ngFor
  renderizarReservas() {
    const container = this.el.nativeElement.querySelector('.row');
    container.innerHTML = '';  // Limpiar el contenedor antes de agregar los elementos

    this.reservas.forEach(reserva => {
      const cardElement = document.createElement('div');
      cardElement.classList.add('col-md-4');
      cardElement.innerHTML = `
        <div class="card">
          <img src="${reserva.libro.imagen}" class="card-img-top" alt="Imagen del Libro">
          <div class="card-body">
            <h5 class="card-title">${reserva.libro.titulo}</h5>
            <p class="card-text">Fecha de Reserva: ${this.formatearFecha(reserva.fechaReserva)}</p>
            <button class="btn btn-danger" onclick="cancelarReserva('${reserva.id}')">Cancelar Reserva</button>
          </div>
        </div>
      `;
      container.appendChild(cardElement);
    });
  }

  // Método para cancelar una reserva
  cancelarReserva(id: string) {
    this.reservaService.cancelarReserva(id).subscribe((response: any) => {
      console.log('Reserva cancelada:', response);
      this.obtenerReservas(); // Actualiza la lista de reservas después de cancelar
    }, (error: any) => {
      console.error('Error al cancelar la reserva:', error);
    });
  }

  // Método para redirigir al home
  redirectToHome() {
    this.router.navigate(['/']);  // Redirige al home
  }

  // Método para alternar el menú desplegable
  toggleDropdown() {
    this.showDropdown = !this.showDropdown; // Cambia el estado del menú
  }

  // Método para navegar a la sección de reservas
  navigateToReservas() {
    this.router.navigate(['/reservas']); // Redirige a la ruta de reservas
    this.showDropdown = false; // Cierra el menú desplegable
  }
}
