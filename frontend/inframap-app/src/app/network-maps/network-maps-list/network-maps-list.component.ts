import { Component, OnDestroy, OnInit } from '@angular/core';
import { NetworkMap } from '../network-map.model';
import { NetworkMapsService } from '../networkmap.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-network-maps-list',
  templateUrl: './network-maps-list.component.html',
  styleUrl: './network-maps-list.component.css'
})
export class NetworkMapsListComponent implements OnInit, OnDestroy{
  network_maps: NetworkMap[];
  networkMapsSubscription: Subscription;

  constructor(private netmapService: NetworkMapsService,
              private route: ActivatedRoute,
              private router: Router
  ) { }

  ngOnInit(): void {
    this.networkMapsSubscription = this.netmapService.getNetworkMaps().subscribe(
      (netmaps: NetworkMap[]) => {
        this.network_maps = netmaps
      }
    );
  }

  ngOnDestroy(): void {
    this.networkMapsSubscription.unsubscribe();
  }
  
  createNetworkMap(){
    this.router.navigate(['new'], {relativeTo: this.route})
  }
}
