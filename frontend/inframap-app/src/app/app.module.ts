import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
import { CloudpoolsComponent } from './network-maps/cloudpools/cloudpools.component';
import { AuthComponent } from './auth/auth.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';




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
    CloudpoolsComponent,
    AuthComponent,
    RegisterComponent,
    LoginComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    NetworkMapsService, 
    {
      provide: HTTP_INTERCEPTORS, 
      useClass: AuthInterceptorService, 
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
