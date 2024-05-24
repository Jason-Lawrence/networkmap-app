import { Component } from '@angular/core';
import { NetworkMap } from '../network-map.model';
import { NetworkMapsService } from '../networkmap.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrl: './graph.component.css'
})
export class GraphComponent {
 netmap: NetworkMap;
 
}
