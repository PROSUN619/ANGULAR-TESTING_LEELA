import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor() { }

  mesg : string[] = [];

  addLog(msg : string){
    this.mesg.push(msg);
  }

  consoleLog(msg : string){
    console.log(msg);    
  }

}
