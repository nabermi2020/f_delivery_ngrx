import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatPhone'
})
export class FormatPhonePipe implements PipeTransform {

  transform(value: any, args?: any): any { 
    return '(' + value.substr(0, 3) + ')' + value.substr(3, 2) + '-' + value.substr(5, 2) + '-' + value.substr(7, 4);
  }

}
