// src/app/components/map/map.component.ts
import { Component, Input, OnInit, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import { fromLonLat } from 'ol/proj';
import { MapLayerConfig } from '../../models/map-config.models';
import { MapLayerFactory } from '../../services/map-layer.factory';
import TileLayer from 'ol/layer/Tile';
import LayerGroup from 'ol/layer/Group';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  standalone: true
})
export class MapComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() layersConfig: MapLayerConfig[] = [];
  @Input() center: number[] = [0, 0]; // in lon,lat
  @Input() zoom: number = 2;

  map!: Map;

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.initMap();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Se la mappa è già stata inizializzata, aggiorna i layer e la vista in base alle modifiche.
    if (this.map) {
      if (changes['layersConfig'] && !changes['layersConfig'].firstChange) {
        // Crea nuovi layer dalla configurazione aggiornata
        const layers = this.layersConfig.map(config => MapLayerFactory.createLayer(config));
        // Aggiorna il gruppo di layer
        const group = new LayerGroup({ layers });
        this.map.setLayerGroup(group);
      }
      if ((changes['center'] || changes['zoom']) && !changes['center']?.firstChange) {
        this.map.getView().setCenter(fromLonLat(this.center));
        this.map.getView().setZoom(this.zoom);
      }
    }
  }

  initMap(): void {
    const layers = this.layersConfig.map(config => MapLayerFactory.createLayer(config));
    this.map = new Map({
      target: 'map',
      layers: layers,
      view: new View({
        center: fromLonLat(this.center),
        zoom: this.zoom
      })
    });
  }
}
