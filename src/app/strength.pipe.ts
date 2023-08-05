import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'strength'
})
export class StrengthPipe implements PipeTransform {

  transform(value: number): string {
    if (value < 5){
      return 'weak';
    }
    else{
      return 'strong';
    }

  }

}
