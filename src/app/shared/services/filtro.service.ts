import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class FiltroService {
    private filtroFuente = new BehaviorSubject<string>('');
    private filtroFuenteInput = new BehaviorSubject<string>('');
    private ubicacionFuente = new BehaviorSubject<string>('');
    private nTrabajadoresFuente = new BehaviorSubject<string>('');
    
    filtroActual = this.filtroFuente.asObservable();
    filtroInput = this.filtroFuenteInput.asObservable();
    filtroUbicacion = this.ubicacionFuente.asObservable();
    filtroTrabajadores = this.nTrabajadoresFuente.asObservable();

    seleccionarTrabajadores(numero: string) {
        this.nTrabajadoresFuente.next(numero);
    }
    
    seleccionarUbicacion(ubicacion: string) {
        this.ubicacionFuente.next(ubicacion);
    }
    
    cambiarFiltro(filtro: string) {
        this.filtroFuente.next(filtro);
    }
    
    inputFiltro(filtro: string) {
        this.filtroFuenteInput.next(filtro);
    }
}