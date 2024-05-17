import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrl: './node.component.css'
})
export class NodeComponent {
  @Input() node: any

  constructor() {}
}
