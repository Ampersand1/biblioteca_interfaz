import { ReservasService } from '../services/reservas.service'; // Asegúrate de tener el servicio correcto
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css']
})
export class ReservasComponent implements OnInit {

  reservas: any[] = [];

  constructor(private reservasService: ReservasService) { }

  ngOnInit(): void {
    this.loadReservas();
  }

  loadReservas(): void {
    this.reservasService.getReservas().subscribe(
      (data) => {
        this.reservas = data;
      },
      (error) => {
        if (error.status === 401) {
          alert('No tiene permisos para acceder a esta ruta.');
        } else if (error.status === 403) {
          alert('Acceso denegado. Solo administradores pueden acceder.');
        } else {
          alert('Error al obtener las reservas.');
        }
      }
    );
  }
}
