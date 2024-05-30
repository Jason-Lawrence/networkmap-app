import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, exhaustMap, take } from 'rxjs';
import { Cloudpool } from './cloudpool.model';
import { AuthService } from '../../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CloudpoolService {
  private cloudpoolUrl = 'http://127.0.0.1:8000/api/netmap/cloudpools/'
  
  constructor(private http: HttpClient, private authService: AuthService) { }

  getCloudPools(): Observable<Cloudpool[]> {
    return this.http.get<Cloudpool[]>(this.cloudpoolUrl)
  }

  getCloudPool(id: number): Observable<Cloudpool> {
    return this.http.get<Cloudpool>(this.cloudpoolUrl + id);
  }

}
