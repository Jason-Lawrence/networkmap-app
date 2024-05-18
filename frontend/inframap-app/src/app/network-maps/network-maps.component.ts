import { Component } from '@angular/core';
import { NetworkMap } from './network-map.model';

@Component({
  selector: 'app-network-maps',
  templateUrl: './network-maps.component.html',
  styleUrl: './network-maps.component.css'
})
export class NetworkMapsComponent {
  network_maps: NetworkMap[] = [
    {name:"Test", description:"Test Network Map", cloudpools:[]}
  ];
}
