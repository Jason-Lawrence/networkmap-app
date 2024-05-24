import { Component, Input, OnInit } from '@angular/core';
import { NetworkMap } from '../../network-map.model';

@Component({
  selector: 'app-network-map-item',
  templateUrl: './network-map-item.component.html',
  styleUrls: ['./network-map-item.component.css']
})
export class NetworkMapItemComponent implements OnInit {
  @Input() networkMap: NetworkMap;
  @Input() index: number;
  
  constructor() { }

  ngOnInit() {
  }

}
