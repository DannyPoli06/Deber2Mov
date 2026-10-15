import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonIcon,
  IonNote,
  IonText,
  ToastController,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  cardOutline,
  cashOutline,
  walletOutline,
  checkmarkCircleOutline,
  alertCircleOutline,
  arrowBackOutline,
  refreshOutline,
  receiptOutline,
  pricetagOutline,
  trendingDownOutline,
} from 'ionicons/icons';
import { CompraService } from '../services/compra.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonIcon,
    IonNote,
    IonText,
  ],
})
export class Tab3Page {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  public compraService = inject(CompraService);
  private toastController = inject(ToastController);

  public pagoForm: FormGroup;
  public calculoRealizado = false;

  constructor() {
    addIcons({
      cardOutline,
      cashOutline,
      walletOutline,
      checkmarkCircleOutline,
      alertCircleOutline,
      arrowBackOutline,
      refreshOutline,
      receiptOutline,
      pricetagOutline,
      trendingDownOutline,
    });

    this.pagoForm = this.fb.group({
      descuento: [
        0,
        [Validators.required, Validators.min(0), Validators.max(100)],
      ],
      dineroEntregado: [
        null,
        [Validators.required, Validators.min(0)],
      ],
    });
  }

  // Getters para controles
  get descuentoControl() {
    return this.pagoForm.get('descuento');
  }

  get dineroControl() {
    return this.pagoForm.get('dineroEntregado');
  }

  /**
   * Obtiene el subtotal actual almacenado en el servicio
   */
  get subtotal(): number {
    return this.compraService.subtotal();
  }

  /**
   * Calcula el monto en dinero correspondiente al porcentaje de descuento
   */
  get montoDescuento(): number {
    const desc = Number(this.descuentoControl?.value);
    if (!isNaN(desc) && desc > 0) {
      return Math.round(this.subtotal * (desc / 100) * 100) / 100;
    }
    return 0;
  }

  /**
   * Total Final = Subtotal - (Subtotal * (Descuento / 100))
   */
  get totalFinal(): number {
    const total = this.subtotal - this.montoDescuento;
    return Math.max(0, Math.round(total * 100) / 100);
  }

  /**
   * Obtiene el valor numérico del dinero entregado
   */
  get dineroEntregado(): number {
    const valor = Number(this.dineroControl?.value);
    return isNaN(valor) || valor < 0 ? 0 : valor;
  }

  /**
   * Diferencia entre dinero entregado y el total final
   */
  get diferencia(): number {
    return Math.round((this.dineroEntregado - this.totalFinal) * 100) / 100;
  }

  /**
   * Indica si el cliente cubrió el total (dinero >= totalFinal)
   */
  get esPagoCompleto(): boolean {
    return this.dineroEntregado >= this.totalFinal;
  }

  /**
   * Valor del cambio (si dinero >= totalFinal)
   */
  get cambio(): number {
    return this.esPagoCompleto ? this.diferencia : 0;
  }

  /**
   * Saldo pendiente (si dinero < totalFinal)
   */
  get saldoPendiente(): number {
    return !this.esPagoCompleto ? Math.abs(this.diferencia) : 0;
  }

  /**
   * Ejecuta o valida el cálculo del pago
   */
  async calcularPago(): Promise<void> {
    if (this.pagoForm.invalid) {
      this.pagoForm.markAllAsTouched();
      const toast = await this.toastController.create({
        message: 'Por favor ingresa valores válidos para el descuento y el dinero entregado.',
        duration: 2500,
        color: 'warning',
        position: 'top',
      });
      await toast.present();
      return;
    }

    this.calculoRealizado = true;

    const mensaje = this.esPagoCompleto
      ? `Pago exitoso. Cambio a devolver: $${this.cambio.toFixed(2)}`
      : `Saldo insuficiente. Falta por pagar: $${this.saldoPendiente.toFixed(2)}`;

    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000,
      color: this.esPagoCompleto ? 'success' : 'danger',
      position: 'top',
    });
    await toast.present();
  }

  /**
   * Reinicia la compra y vuelve a la pestaña de compra
   */
  nuevaCompra(): void {
    this.compraService.reiniciar();
    this.pagoForm.reset({
      descuento: 0,
      dineroEntregado: null,
    });
    this.calculoRealizado = false;
    this.router.navigate(['/tabs/tab2']);
  }
}
