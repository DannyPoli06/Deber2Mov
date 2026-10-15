import { Component } from '@angular/core';
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
  IonIcon,
  IonButton,
  IonBadge,
  IonList,
} from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import {
  personOutline,
  schoolOutline,
  codeSlashOutline,
  calendarOutline,
  arrowForwardOutline,
  cartOutline,
  storefrontOutline,
  checkmarkCircleOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [
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
    IonIcon,
    IonButton,
    IonBadge,
    IonList,
    RouterLink,
  ],
})
export class Tab1Page {
  constructor() {
    addIcons({
      personOutline,
      schoolOutline,
      codeSlashOutline,
      calendarOutline,
      arrowForwardOutline,
      cartOutline,
      storefrontOutline,
      checkmarkCircleOutline
    });
  }
}
