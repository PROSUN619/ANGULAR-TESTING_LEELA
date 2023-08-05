import { Injectable } from '@angular/core';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  constructor(private loggerService : LoggerService ) { }

  add(a: number, b: number) {
    this.loggerService.addLog('add method called');
    this.loggerService.consoleLog('add method called');
    return a + b;
  }

  subtract(a: number, b: number) {
    this.loggerService.addLog('add method called');
    return a - b;
  }

}
