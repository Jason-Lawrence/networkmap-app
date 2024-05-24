import { Component, OnInit } from '@angular/core';
import { NetworkMap } from './network-map.model';
import { NetworkMapsService } from './networkmap.service';

@Component({
  selector: 'app-network-maps',
  templateUrl: './network-maps.component.html',
  styleUrl: './network-maps.component.css',
})
export class NetworkMapsComponent implements OnInit{
  selectedNetmap: NetworkMap;
  constructor(private netmapService: NetworkMapsService) { }

  ngOnInit(): void {
    this.netmapService.netmapSelected.
    subscribe(
      (netmap: NetworkMap) => {
        this.selectedNetmap = netmap 
      }
    );
  }
}
