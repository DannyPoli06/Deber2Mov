import { Injectable, signal, computed } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface DetalleProducto {
  nombreProducto: string;
  cantidad: number;
  precioUnitario: number;
}

@Injectable({
  providedIn: 'root'
})
export class CompraService {
  // Manejo mediante Signal (Angular moderno)
  private subtotalSignal = signal<number>(0);
  public subtotal = this.subtotalSignal.asReadonly();

  // Detalle adicional opcional del producto para enriquecer la vista
  private productoSignal = signal<DetalleProducto | null>(null);
  public producto = this.productoSignal.asReadonly();

  // Manejo mediante BehaviorSubject (RxJS clásico según el requerimiento)
  private subtotalSubject = new BehaviorSubject<number>(0);
  public subtotal$: Observable<number> = this.subtotalSubject.asObservable();

  constructor() {}

  /**
   * Actualiza el subtotal en el servicio y notifica a las pestañas
   * tanto a través de la Signal como del BehaviorSubject.
   */
  actualizarSubtotal(subtotal: number, detalle?: DetalleProducto): void {
    const valorRedondeado = Math.round(subtotal * 100) / 100;
    
    // Actualizar Signal
    this.subtotalSignal.set(valorRedondeado);
    
    // Actualizar BehaviorSubject
    this.subtotalSubject.next(valorRedondeado);

    if (detalle) {
      this.productoSignal.set({ ...detalle });
    }
  }

  /**
   * Obtiene el valor actual del subtotal de manera sincrónica
   */
  getSubtotal(): number {
    return this.subtotalSignal();
  }

  /**
   * Reinicia el estado de la compra
   */
  reiniciar(): void {
    this.subtotalSignal.set(0);
    this.subtotalSubject.next(0);
    this.productoSignal.set(null);
  }
}
