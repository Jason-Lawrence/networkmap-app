import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { NetworkMap } from './network-map.model';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NetworkMapsService {
  private networkMapUrl = 'http://127.0.0.1:8000/api/netmap/netmap/'
  private headers: HttpHeaders = new HttpHeaders()
    .set('Access-Control-Allow-Origin', "http://localhost:8000/api/")
    //.set('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT')
    //.set('Access-Control-Allow-Headers','Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers')

  network_maps: NetworkMap[] = [
    {id: 1, name:"Test", description:"Test Network Map"}
  ];

  netmapSelected = new EventEmitter<NetworkMap>();

  constructor(private http: HttpClient) { }

  getNetworkMap(id: number){
    return this.network_maps[id]
  }

  retrieveNetworkMaps(): Observable<NetworkMap[]> {
    return this.http.get<NetworkMap[]>(this.networkMapUrl)
  }

  getNetworkMaps(): NetworkMap[] {
    return this.network_maps.slice()
  }


}
