import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  logStatusChange(status: string){
    console.log('Logging Status: ' + status);
  }

  statusUpdated = new EventEmitter<string>(); 
  // call this in component that wants to emit a change 
    //this.service.statusUpdated.emit()
  // in constructor 
    //this.service.statusUpdated.subscribe((status: string) => do something)

  constructor() { }
}
