import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Cloudpool } from '../cloudpools/cloudpool.model';
import { CloudpoolService } from '../cloudpools/cloudpool.service';
import { NetworkMapsService } from '../networkmap.service';
import { NetworkMap } from '../network-map.model';

@Component({
  selector: 'app-network-map-edit',
  templateUrl: './network-map-edit.component.html',
  styleUrl: './network-map-edit.component.css'
})
export class NetworkMapEditComponent implements OnInit{
  id: number;
  editMode: boolean = false;
  hideEditable: boolean = true;
  networkMapForm: FormGroup;
  cloudpools: Cloudpool[];
  @ViewChild('select1') select1: ElementRef
  @ViewChild('select2') select2: ElementRef
  //@ViewChild('formData') netmapForm: NgForm;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private cloudpoolService: CloudpoolService,
              private netmapService: NetworkMapsService
  ){}

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.editMode = params['id'] != null;
        console.log(this.editMode)
        this.initForm();
      }
    );

    this.cloudpoolService.getCloudPools().subscribe(
      (pools: Cloudpool[]) => {
        this.cloudpools = pools
      }
    );
  }

  private initForm() {
    let netmap = null;
    
    let netmapName = '';

    if (this.editMode){
      this.netmapService.getNetworkMap(this.id).subscribe(
        (networkMap: NetworkMap) => {
          netmap = networkMap;    
        });
      netmapName = netmap.name
    }

    this.networkMapForm = new FormGroup({
      'name': new FormControl(netmapName, Validators.required),
      'description': new FormControl(null, Validators.required),
      'cloudpools': new FormControl([]),
      'is_public': new FormControl(false),
      'is_editable': new FormControl(false)
    });
  }

  addCloudPool(event: any){
    console.log(event)
    var opt = document.createElement('option')
    opt.value = event.target.value
    opt.innerHTML = event.target.value
    this.select2.nativeElement.appendChild(opt)
    this.select1.nativeElement.removeChild(event.target.selectedOptions[0])
  }

  removeCloudPool(event: any){
    var opt = document.createElement('option')
    opt.value = event.target.value
    opt.innerHTML = event.target.value
    this.select1.nativeElement.appendChild(opt)
    this.select2.nativeElement.removeChild(event.target.selectedOptions[0])
  }

  toggleEditable(Editable: ElementRef){
    this.hideEditable = !this.hideEditable;
  }

  // this.netmapForm.form.patchValue({key: val})
  // this.netmapForm.setValue({key: val, key: val})

  onSave(){
    this.netmapService.createNetworkMap(<NetworkMap>this.networkMapForm.value).subscribe(
      (netmap: NetworkMap) => {
        console.log(netmap)
      }
    );
    this.router.navigate(['networkmaps'])
    //console.log(this.netmapForm.value.netmapData)
    //this.netmapForm.reset()
  }


  


}
