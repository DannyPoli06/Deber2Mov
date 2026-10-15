# Aplicación Móvil de Registro y Pago de Compras

## Características y Funcionalidades

La aplicación está estructurada en un sistema de navegación por tres pestañas (*Tabs*), cada una con iconos personalizados y propósitos específicos:

1. **Pestaña Inicio (`Tab1`):**
   - Pantalla de bienvenida interactiva con banner visual explicativo.
   - Resumen conceptual de las funcionalidades del sistema y navegación directa a la sección de registro.

2. **Pestaña Compra (`Tab2`):**
   - Formulario reactivo para la captura de datos del producto:
     - **Nombre del producto:** Campo obligatorio.
     - **Cantidad:** Validación estricta para números enteros positivos .
     - **Precio Unitario:** Validación para valores numéricos decimales positivos .
   - Navegación programática automática hacia la pestaña de pago tras validar la entrada.

3. **Pestaña Pago (`Tab3`):**
   - Recepción reactiva del subtotal calculado mediante `CompraService`.
   - Captura de parámetros de facturación:
     - **Descuento porcentual:** Rango válido entre 0 y 100.
     - **Monto recibido:** Mayor o igual a cero.
   - Cálculo dinámico del total final, mostrando el valor del **Cambio a entregar** o el **Saldo pendiente** según el dinero recibido.

---

## Stack 

* **Framework Frontend:** Ionic + Angular (Standalone Components)
* **Gestión de Estado y Servicios:** RxJS / Observables
* **Validación de Formularios:** Angular Reactive Forms
* **Runtime Nativo & Assets:** Capacitor & `@capacitor/assets` (Icono y Splash Screen personalizados)
* **Iconografía:** Ionicons

---
