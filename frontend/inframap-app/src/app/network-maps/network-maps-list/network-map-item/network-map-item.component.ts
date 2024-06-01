import { Component, Input, OnInit } from '@angular/core';
import { NetworkMap } from '../../network-map.model';
import { NetworkMapsService } from '../../networkmap.service';

@Component({
  selector: 'app-network-map-item',
  templateUrl: './network-map-item.component.html',
  styleUrls: ['./network-map-item.component.css']
})
export class NetworkMapItemComponent {
  @Input() networkMap: NetworkMap;
  @Input() index: number;
  
  constructor() { }

}
