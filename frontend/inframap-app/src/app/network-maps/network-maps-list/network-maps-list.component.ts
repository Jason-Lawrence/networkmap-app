import { Component, OnInit } from '@angular/core';
import { NetworkMap } from '../network-map.model';
import { NetworkMapsService } from '../networkmap.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-network-maps-list',
  templateUrl: './network-maps-list.component.html',
  styleUrl: './network-maps-list.component.css'
})
export class NetworkMapsListComponent implements OnInit{
  network_maps: NetworkMap[];

  constructor(private netmapService: NetworkMapsService,
              private route: ActivatedRoute,
              private router: Router
  ){}

  ngOnInit(): void {
    //this.network_maps = this.netmapService.getNetworkMaps();
    this.netmapService.retrieveNetworkMaps().subscribe(
      (netmaps :NetworkMap[]) => {
        console.log(netmaps)
        this.network_maps = netmaps
      }
    );
  }
  createNetworkMap(){
    this.router.navigate(['new'], {relativeTo: this.route})
  }
}
