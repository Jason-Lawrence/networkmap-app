import { NgModule } from "@angular/core";
import { Router, RouterModule, Routes } from "@angular/router";

import { HomeComponent } from "./home/home.component";
import { NetworkMapsComponent } from "./network-maps/network-maps.component";
import { MarketShareComponent } from "./market-share/market-share.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { ErrorPageComponent } from "./error-page/error-page.component";
import { NetworkMapEditComponent } from "./network-maps/network-map-edit/network-map-edit.component";
import { GraphComponent } from "./network-maps/graph/graph.component";
import { NetworkMapDetailsComponent } from "./network-maps/network-map-details/network-map-details.component";
import { LoginComponent } from "./auth/login/login.component";
import { RegisterComponent } from "./auth/register/register.component";
import { AuthGuard } from "./auth/auth.guard";
import { NetworkMapResolverService, NetworkMapsResolverService } from "./network-maps/networkmaps-resolver.service";

const appRoutes: Routes = [
  { path: '', component:  HomeComponent},
  { 
    path: 'networkmaps', 
    component: NetworkMapsComponent, 
    canActivate: [AuthGuard], 
    resolve: [NetworkMapsResolverService],
    children: [
      { path: 'new', component: NetworkMapEditComponent},
      { 
        path: ':id', 
        component: NetworkMapDetailsComponent, 
        resolve:[NetworkMapResolverService]
      },
      { 
        path: ':id/edit', 
        component: NetworkMapEditComponent, 
        resolve:[NetworkMapResolverService]
      },
      { 
        path: ':id/graph', 
        component: GraphComponent,
        resolve:[NetworkMapResolverService]
      }      
    ] 
  },
  { path: 'marketshare', component: MarketShareComponent },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'not-found', component: ErrorPageComponent, data: {message: 'Page not found!'}},
  { path: '**', redirectTo: '/not-found'}
]

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}