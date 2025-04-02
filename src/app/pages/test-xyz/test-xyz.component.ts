// src/app/pages/test-xyz.component.ts
import { Component } from '@angular/core';
import { MapComponent } from '../../components/map/map.component';
import { MapLayerConfig } from '../../models/map-config.models';

@Component({
  selector: 'app-test-xyz',
  template: `
    <h2>Test Servizio XYZ</h2>
    <app-map [layersConfig]="layersConfig" [center]="center" [zoom]="zoom"></app-map>
  `,
  standalone: true,
  imports: [MapComponent]
})
export class TestXyzComponent {
  center = [0, 0]; // Centro per vista globale
  zoom = 2;
  layersConfig: MapLayerConfig[] = [
    {
      serviceType: 'XYZ',
      url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    }
  ];
}
