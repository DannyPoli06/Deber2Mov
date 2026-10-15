import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
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
  cartOutline,
  pricetagOutline,
  calculatorOutline,
  arrowForwardOutline,
  alertCircleOutline,
  bagCheckOutline,
  cubeOutline,
  trashOutline,
} from 'ionicons/icons';
import { CompraService } from '../services/compra.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
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
export class Tab2Page {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private compraService = inject(CompraService);
  private toastController = inject(ToastController);

  public compraForm: FormGroup;

  constructor() {
    addIcons({
      cartOutline,
      pricetagOutline,
      calculatorOutline,
      arrowForwardOutline,
      alertCircleOutline,
      bagCheckOutline,
      cubeOutline,
      trashOutline,
    });

    this.compraForm = this.fb.group({
      nombreProducto: ['', [Validators.required, Validators.minLength(2)]],
      cantidad: [
        1,
        [
          Validators.required,
          Validators.min(1),
          Validators.pattern('^[1-9][0-9]*$'),
        ],
      ],
      precioUnitario: [
        null,
        [Validators.required, Validators.min(0.01)],
      ],
    });
  }

  // Getters para acceso rápido a controles en la plantilla
  get nombreControl() {
    return this.compraForm.get('nombreProducto');
  }

  get cantidadControl() {
    return this.compraForm.get('cantidad');
  }

  get precioControl() {
    return this.compraForm.get('precioUnitario');
  }

  /**
   * Calcula el subtotal en tiempo real según los valores del formulario
   */
  get subtotalCalculado(): number {
    const cant = Number(this.cantidadControl?.value);
    const precio = Number(this.precioControl?.value);
    if (!isNaN(cant) && !isNaN(precio) && cant > 0 && precio > 0) {
      return Math.round(cant * precio * 100) / 100;
    }
    return 0;
  }

  /**
   * Valida los campos, calcula el subtotal, lo guarda en el servicio
   * y navega programáticamente a la pestaña de pago (/tabs/tab3)
   */
  async continuarAlPago(): Promise<void> {
    if (this.compraForm.invalid) {
      this.compraForm.markAllAsTouched();
      const toast = await this.toastController.create({
        message: 'Por favor complete correctamente todos los campos obligatorios.',
        duration: 2500,
        color: 'warning',
        position: 'top',
      });
      await toast.present();
      return;
    }

    const { nombreProducto, cantidad, precioUnitario } = this.compraForm.value;
    const cantNum = parseInt(cantidad, 10);
    const precioNum = parseFloat(precioUnitario);
    const subtotal = Math.round(cantNum * precioNum * 100) / 100;

    // Guardar en el servicio compartido
    this.compraService.actualizarSubtotal(subtotal, {
      nombreProducto: nombreProducto.trim(),
      cantidad: cantNum,
      precioUnitario: precioNum,
    });

    // Navegar programáticamente a la pestaña de Pago (tab3)
    this.router.navigate(['/tabs/tab3']);
  }

  /**
   * Limpia el formulario
   */
  limpiarFormulario(): void {
    this.compraForm.reset({
      nombreProducto: '',
      cantidad: 1,
      precioUnitario: null,
    });
  }
}
