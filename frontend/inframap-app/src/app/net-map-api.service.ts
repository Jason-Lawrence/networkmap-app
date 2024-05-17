import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cloudpool } from './cloudpool/cloudpool.model';

@Injectable({
  providedIn: 'root'
})
export class NetMapAPIService {
  private netmapUrl = 'http://127.0.0.1:8000/api/netmap';

  constructor(private http: HttpClient) { }

  createNetworkMap(name: string, cloudpools: Cloudpool[], description: string): Observable<any> {
    /**
     * Send a Post request to create a Network Map
     * 
     * Params:
     *    name: Name of the Network Map.
     *    cloudpools: list of cloudpools for the Network Map.
     *    description: A description for the Network Map.
     */

    let body = {
      "name": name,
      "cloudpools": cloudpools,
      "description": description
    }

    return this.http.post(`${this.netmapUrl}/netmap/`, body)
  }
  
  getNetworkMap(): Observable<any> {
    return this.http.get(`${this.netmapUrl}/netmap/`);
  }

  getCloudPools(): Observable<any> {
    return this.http.get(`${this.netmapUrl}/cloudpools/`);
  }
  
  
}
