import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { GraphComponent } from './graph/graph.component';
import { NodeComponent } from './node/node.component';
import { NetMapAPIService } from './net-map-api.service';
import { CloudpoolComponent } from './cloudpool/cloudpool.component';

@NgModule({
  declarations: [
    AppComponent,
    GraphComponent,
    NodeComponent,
    CloudpoolComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [NetMapAPIService],
  bootstrap: [AppComponent]
})
export class AppModule { }
