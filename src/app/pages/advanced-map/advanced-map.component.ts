import { Component, OnInit } from '@angular/core';
import { MapComponent } from '../../components/map/map.component';
import { FormsModule } from '@angular/forms';
import { MapLayerConfig } from '../../models/map-config.models';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-advanced-map',
  imports: [FormsModule, MapComponent, NgIf],
  templateUrl: './advanced-map.component.html',
  styleUrl: './advanced-map.component.css'
})
export class AdvancedMapComponent implements OnInit {
  // Variabile per l'input della posizione
  locationInput: string = '';
  
  // Centro della mappa; di default usiamo le coordinate di Piazza Navona, Roma
  center: number[] = [12.4731, 41.8989];
  zoom: number = 16;
  
  // Layer di base (utilizziamo un layer XYZ, ad es. OSM)
  baseLayer: MapLayerConfig = {
    serviceType: 'XYZ',
    url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
  };
  
  // Array per eventuali overlay
  overlayLayers: MapLayerConfig[] = [];
  
  // Input per la gestione degli overlay
  overlayServiceType: string = 'WMS';
  overlayUrl: string = '';
  overlayLayerName: string = '';
  
  // Il risultato combinato dei layer: base + overlay(s)
  get combinedLayers(): MapLayerConfig[] {
    return [this.baseLayer, ...this.overlayLayers];
  }
  
  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {}
  
  ngOnInit(): void {
    // Legge i parametri della query string (se presenti) per aggiornare il centro della mappa
    this.route.queryParams.subscribe(params => {
      const lon = parseFloat(params['lon']);
      const lat = parseFloat(params['lat']);
      if (!isNaN(lon) && !isNaN(lat)) {
        this.center = [lon, lat];
      }
    });
  }
  
  // Metodo chiamato al submit della ricerca di posizione
  onLocationSearch(): void {
    const input = this.locationInput.trim();
    if (input.includes(',')) {
      // Se contiene la virgola, presumiamo siano coordinate "lon,lat"
      const parts = input.split(',');
      const lon = parseFloat(parts[0]);
      const lat = parseFloat(parts[1]);
      if (!isNaN(lon) && !isNaN(lat)) {
        this.center = [lon, lat];
        // Aggiornare anche l'URL (facoltativo)
        this.router.navigate([], { queryParams: { lon, lat } });
      }
    } else {
      // Altrimenti consideriamo l'input come nome di città e utilizziamo il servizio di geocoding (Nominatim)
      this.geocodeCity(input);
    }
  }
  
  // Metodo per fare geocoding a partire dal nome della città
  geocodeCity(city: string): void {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(city)}`;
    this.http.get<any[]>(url).subscribe(res => {
      if (res && res.length > 0) {
        const lon = parseFloat(res[0].lon);
        const lat = parseFloat(res[0].lat);
        this.center = [lon, lat];
        // Aggiorna anche i parametri della query string
        this.router.navigate([], { queryParams: { lon, lat } });
      } else {
        alert('Nessuna posizione trovata per: ' + city);
      }
    }, err => {
      console.error('Errore nel geocoding', err);
      alert('Errore nel recuperare la posizione.');
    });
  }
  
  // Metodo per aggiungere un layer overlay
  addOverlayLayer(): void {
    let newOverlay: MapLayerConfig;
    if (this.overlayServiceType === 'XYZ') {
      newOverlay = {
        serviceType: 'XYZ',
        url: this.overlayUrl
      };
    } else {
      newOverlay = {
        serviceType: 'WMS',
        url: this.overlayUrl,
        layerName: this.overlayLayerName,
        additionalParams: {
          'TILED': true,
          'FORMAT': 'image/png'
        }
      };
    }
    this.overlayLayers.push(newOverlay);
    // Ripulisci i campi del form per overlay
    this.overlayUrl = '';
    this.overlayLayerName = '';
  }
}