import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "shorten"
})
export class ShortenPipe implements PipeTransform {
  transform(value: any, limit?: any): any {
    return limit ? value.substr(0, limit) + "." : value;
  }
}
