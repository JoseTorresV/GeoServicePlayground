// src/app/services/map-layer.factory.ts
import TileLayer from 'ol/layer/Tile';
import TileWMS from 'ol/source/TileWMS';
import XYZ from 'ol/source/XYZ';
import { MapLayerConfig } from '../models/map-config.models';

export class MapLayerFactory {
  static createLayer(config: MapLayerConfig): TileLayer<any> {
    switch (config.serviceType) {
      case 'WMS':
        return new TileLayer({
          source: new TileWMS({
            url: config.url,
            params: {
              'LAYERS': config.layerName,
            //   'CRS': 'EPSG:3857',
              ...config.additionalParams
            },
            transition: 0
          })
        });
      case 'XYZ':
        return new TileLayer({
          source: new XYZ({
            url: config.url,
            ...config.additionalParams
          })
        });
      default:
        throw new Error('Tipo di servizio non supportato');
    }
  }
}
