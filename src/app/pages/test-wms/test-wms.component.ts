// src/app/pages/test-wms.component.ts
import { Component } from '@angular/core';
import { MapComponent } from '../../components/map/map.component';
import { MapLayerConfig } from '../../models/map-config.models';

@Component({
  selector: 'app-test-wms',
  template: `
    <h2>Test Servizio WMS</h2>
    <app-map [layersConfig]="layersConfig" [center]="center" [zoom]="zoom"></app-map>
  `,
  standalone: true,
  imports: [MapComponent]
})
export class TestWmsComponent {
  center = [12.4964, 41.9028]; // Coordinate di Roma (lon, lat)
  zoom = 6;
  layersConfig: MapLayerConfig[] = [
    {
      serviceType: 'WMS',
      // url: 'https://tuo-servizio-wms-url', // Sostituisci con l'URL reale
      // url: 'https://sit.egov.ba.it/ows/26/qdjango/27', // Sostituisci con l'URL reale
      url: 'https://ahocevar.com/geoserver/wms', // Sostituisci con l'URL reale
      layerName: 'topp:states',
      additionalParams: {
        'TILED': true
      }
    }
  ];
}
