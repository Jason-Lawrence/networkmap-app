import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { NetworkMap } from "./network-map.model";
import { NetworkMapsService } from "./networkmap.service";

@Injectable({providedIn: 'root'})
export class NetworkMapResolverService implements Resolve<NetworkMap> {
    
    constructor(private networkMapService: NetworkMapsService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
       return this.networkMapService.getNetworkMap(route.params['id'])
    }
}

@Injectable({providedIn: 'root'})
export class NetworkMapsResolverService implements Resolve<NetworkMap[]> {

    constructor(private networkMapService: NetworkMapsService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.networkMapService.getNetworkMaps()
    }
}