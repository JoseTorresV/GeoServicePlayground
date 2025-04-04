// src/app/app.config.ts
import { Routes } from '@angular/router';
import { DynamicMapComponent } from './pages/dynamic-map/dynamic-map.component';
import { TestWmsComponent } from './pages/test-wms/test-wms.component';
import { TestXyzComponent } from './pages/test-xyz/test-xyz.component';


export const routes: Routes = [
  { path: 'dynamic-map', component: DynamicMapComponent },
  { path: 'test-wms', component: TestWmsComponent },
  { path: 'test-xyz', component: TestXyzComponent },
  { path: '', redirectTo: 'dynamic-map', pathMatch: 'full' }
];
