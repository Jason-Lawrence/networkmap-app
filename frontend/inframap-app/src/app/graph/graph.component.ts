import { Component, OnInit } from '@angular/core';
import cytoscape from 'cytoscape';
import { NetMapAPIService } from '../net-map-api.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrl: './graph.component.css'
})
export class GraphComponent implements OnInit {
  cy: any;

  constructor(private apiService: NetMapAPIService) {}

  ngOnInit() {
    this.cy = cytoscape({
      container: document.getElementById('cy'),
      elements: [],
      style: [

      ]
    });

    this.loadNetworkMap();
  }

  loadNetworkMap() {
    this.apiService.getNetworkMap().subscribe(data => {
      this.cy.add(data);
    });
  }
}
