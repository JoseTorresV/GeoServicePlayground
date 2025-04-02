// src/app/pages/dynamic-map.component.ts
import { Component } from '@angular/core';
import { MapComponent } from '../../components/map/map.component';
import { MapLayerConfig } from '../../models/map-config.models';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-dynamic-map',
  templateUrl: 'dynamic-map.component.html',
  styleUrl: 'dynamic-map.component.css',
  standalone: true,
  imports: [MapComponent, FormsModule, NgIf]
})
export class DynamicMapComponent {
  // Selezione del tipo di servizio: XYZ oppure WMS
  selectedService: string = 'XYZ';

  // Input per l'URL (di default usa l'OpenStreetMap standard)
  inputUrl: string = 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png';

  // Input per il nome del layer (necessario solo per WMS)
  inputLayerName: string = '';

  // // Impostiamo il centro sulla zona dell'Italia (usiamo le coordinate di Roma come riferimento)
  // center: number[] = [12.4964, 41.9028];
  // zoom: number = 6;

  // Centro della mappa impostato su Piazza Navona, Roma (lon, lat)
  center: number[] = [12.4731, 41.8989];
  zoom: number = 16;

  // Configurazione iniziale dei layer: parte con il layer XYZ impostato di default
  layersConfig: MapLayerConfig[] = [
    {
      serviceType: 'XYZ',
      url: this.inputUrl
    }
  ];

  updateMap(): void {
    if (this.selectedService === 'XYZ') {
      this.layersConfig = [
        {
          serviceType: 'XYZ',
          url: this.inputUrl
        }
      ];
    } else if (this.selectedService === 'WMS') {
      this.layersConfig = [
        {
          serviceType: 'WMS',
          url: this.inputUrl,
          layerName: this.inputLayerName,
          additionalParams: {
            'TILED': true
          }
        }
      ];
    }
  }
}