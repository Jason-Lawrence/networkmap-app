import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NetworkMap } from '../network-map.model';
import { NetworkMapsService } from '../networkmap.service';

@Component({
  selector: 'app-network-map-details',
  templateUrl: './network-map-details.component.html',
  styleUrl: './network-map-details.component.css'
})
export class NetworkMapDetailsComponent implements OnInit {
  networkMap: NetworkMap;
  id: number;
  
  constructor(private netmapService: NetworkMapsService, 
              private route: ActivatedRoute,
            private router: Router) {  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.netmapService.getNetworkMap(this.id).subscribe(
          (netmap: NetworkMap) => {
            this.networkMap = netmap
          }
        );
      }
    );
  }

  doEditNetworkMap(){
    this.router.navigate(['edit'], {relativeTo: this.route})
  }

}
