import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

// Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { NetworkMapsComponent } from './network-maps/network-maps.component';
import { NetworkMapsListComponent } from './network-maps/network-maps-list/network-maps-list.component';
import { NetworkMapItemComponent } from './network-maps/network-maps-list/network-map-item/network-map-item.component';
import { NetworkMapDetailsComponent } from './network-maps/network-map-details/network-map-details.component';
import { NetworkMapEditComponent } from './network-maps/network-map-edit/network-map-edit.component';

import { GraphComponent } from './network-maps/graph/graph.component';

// Services
import { NetworkMapsService } from './network-maps/networkmap.service';

import { MarketShareComponent } from './market-share/market-share.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { ErrorPageComponent } from './error-page/error-page.component';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NetworkMapsComponent,
    NetworkMapsListComponent,
    NetworkMapItemComponent,
    NetworkMapDetailsComponent,
    NetworkMapEditComponent,
    GraphComponent,
    MarketShareComponent,
    HomeComponent,
    PageNotFoundComponent,
    ErrorPageComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [NetworkMapsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
