import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NetMapAPIService } from './net-map-api.service';
import { HeaderComponent } from './header/header.component';
import { NetworkMapsComponent } from './network-maps/network-maps.component';
import { NetworkMapComponent } from './network-maps/network-map/network-map.component';
import { GraphComponent } from './network-maps/network-map/graph/graph.component';
import { CloudpoolsComponent } from './network-maps/network-map/cloudpools/cloudpools.component';
import { CloudpoolComponent } from './network-maps/network-map/cloudpools/cloudpool/cloudpool.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NetworkMapsComponent,
    NetworkMapComponent,
    GraphComponent,
    CloudpoolsComponent,
    CloudpoolComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [NetMapAPIService],
  bootstrap: [AppComponent]
})
export class AppModule { }
