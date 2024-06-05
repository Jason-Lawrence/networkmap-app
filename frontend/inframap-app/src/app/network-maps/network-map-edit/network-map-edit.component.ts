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
  networkMap: NetworkMap;
  editMode: boolean = false;
  hideEditable: boolean = true;
  networkMapForm: FormGroup;
  cloudpools: Cloudpool[];
  @ViewChild('select1') select1: ElementRef
  @ViewChild('select2') select2: ElementRef

  constructor(private route: ActivatedRoute,
              private router: Router,
              private cloudpoolService: CloudpoolService,
              private netmapService: NetworkMapsService
  ){}

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.editMode = params['id'] != null;
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
    
    let netmapName = '';
    let netmapDescription = '';
    let cloudpools = [];
    let isPublic = false;
    let isEditable = false;

    if (this.editMode){
      this.netmapService.netmapSelected.subscribe(
        (networkMap: NetworkMap) => {
          if(networkMap){
            this.networkMap = networkMap;
            netmapName = this.networkMap.name;
            netmapDescription = this.networkMap.description;
            cloudpools = this.networkMap.cloudpools;
            isPublic = this.networkMap.is_public
            isEditable = this.networkMap.is_editable;

            if (isPublic){
              this.toggleEditable()
            }

            this.networkMapForm = new FormGroup({
              'name': new FormControl(netmapName, Validators.required),
              'description': new FormControl(netmapDescription, Validators.required),
              'cloudpools': new FormControl(cloudpools),
              'is_public': new FormControl(isPublic),
              'is_editable': new FormControl(isEditable)
            });
          }
        });

    }else{
      this.networkMapForm = new FormGroup({
        'name': new FormControl(netmapName, Validators.required),
        'description': new FormControl(netmapDescription, Validators.required),
        'cloudpools': new FormControl(cloudpools),
        'is_public': new FormControl(isPublic),
        'is_editable': new FormControl(isEditable)
      });
    }
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

  toggleEditable(){
    this.hideEditable = !this.hideEditable;
  }

  // this.netmapForm.form.patchValue({key: val})
  // this.netmapForm.setValue({key: val, key: val})

  onSave(){
    if (this.editMode){
      this.netmapService.updateNetworkMap(this.networkMap.id, <NetworkMap>this.networkMapForm.value).subscribe(
        (netmap: NetworkMap) => {
          console.log('Updated: ' + netmap)
        }
      );
    }else{
      this.netmapService.createNetworkMap(<NetworkMap>this.networkMapForm.value).subscribe(
        (netmap: NetworkMap) => {
          console.log(netmap)
        }
      );
    }
    this.router.navigate(['networkmaps'])
    //console.log(this.netmapForm.value.netmapData)
    //this.netmapForm.reset()
  }

  onCancel(){
    this.router.navigate(['networkmaps'])
  }
}
