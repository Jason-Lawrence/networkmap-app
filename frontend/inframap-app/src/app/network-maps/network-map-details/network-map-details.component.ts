import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NetworkMap } from '../network-map.model';
import { NetworkMapsService } from '../networkmap.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-network-map-details',
  templateUrl: './network-map-details.component.html',
  styleUrl: './network-map-details.component.css'
})
export class NetworkMapDetailsComponent implements OnInit{
  networkMap: NetworkMap;
  netmapSubscription: Subscription;
  
  constructor(private netmapService: NetworkMapsService, 
              private route: ActivatedRoute,
            private router: Router) {  }

  ngOnInit(): void {
    this.route.data.subscribe(
      (networkMap: NetworkMap) => {
        this.networkMap = networkMap[0]
        this.netmapService.netmapSelected.next(this.networkMap)
      } 
    )
  }

  doEditNetworkMap(){
    this.router.navigate(['edit'], {relativeTo: this.route})
  }

}
