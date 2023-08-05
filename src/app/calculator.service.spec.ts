import { TestBed } from '@angular/core/testing';

import { CalculatorService } from './calculator.service';
import { LoggerService } from './logger.service';

describe('CalculatorService', () => {
  let mockLoggerService : any;
  let calculator : CalculatorService;
  let loggerServiceSpy : jasmine.SpyObj<LoggerService>;

  beforeEach(() => {
    //always create a separarte instance
    mockLoggerService  = jasmine.createSpyObj('LoggerService', ['addLog','consoleLog']);

    TestBed.configureTestingModule({
      providers:[
        CalculatorService,
        {
          provide: LoggerService,
          useValue: mockLoggerService
        }
      ]
    });

    //calculator = new CalculatorService(mockLoggerService);
    calculator = TestBed.inject(CalculatorService);
    loggerServiceSpy = TestBed.inject(LoggerService) as jasmine.SpyObj<LoggerService>;

  });

  it('should add two numbers', () => {    
    let result = calculator.add(2,3);
    expect(result).toBe(5);
    expect(loggerServiceSpy.consoleLog).toHaveBeenCalledTimes(1);
  });

  it('should subtract two numbers', () => {
    let result = calculator.subtract(10,3);
    expect(result).toBe(7);
    expect(mockLoggerService.addLog).toHaveBeenCalledTimes(1);
  });
  
});
