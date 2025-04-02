// src/app/models/map-config.model.ts
export interface MapLayerConfig {
    serviceType: 'WMS' | 'XYZ';
    url: string;
    layerName?: string;         // Nome del layer (utilizzato per WMS)
    additionalParams?: any;     // Parametri aggiuntivi per la richiesta (es. TILED, API key, ecc.)
  }
  