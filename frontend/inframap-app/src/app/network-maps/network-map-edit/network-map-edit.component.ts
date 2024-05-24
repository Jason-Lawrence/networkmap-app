import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-network-map-edit',
  templateUrl: './network-map-edit.component.html',
  styleUrl: './network-map-edit.component.css'
})
export class NetworkMapEditComponent implements OnInit{
  id: number;
  editMode = false;

  constructor(private route: ActivatedRoute){}

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
      }
    );
  }
}
