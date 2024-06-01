import { Injectable} from '@angular/core';
import { NetworkMap } from './network-map.model';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { BehaviorSubject, Observable, exhaustMap, take } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NetworkMapsService {

  networkMaps: NetworkMap[] = [];

  private networkMapUrl: string = 'http://127.0.0.1:8000/api/netmap/netmap/'

  netmapSelected = new BehaviorSubject<NetworkMap>(null);

  constructor(private http: HttpClient, private authService: AuthService) { }

  getNetworkMaps(): Observable<NetworkMap[]> {
    return this.http.get<NetworkMap[]>(this.networkMapUrl)
  }

  getNetworkMap(id: number): Observable<NetworkMap>{
    return this.http.get<NetworkMap>(this.networkMapUrl + id);
  }

  createNetworkMap(netmap: NetworkMap) {
    return this.http.post<NetworkMap>(this.networkMapUrl, netmap) 
  }
}
